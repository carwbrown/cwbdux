function todos(state = [], action) {
  switch (action.type) {
    case "ADD_TODO":
      return state.concat([action.todo]);
    case "REMOVE_TODO":
      return state.filter((todo) => todo.id !== action.id);
    case "TOGGLE_TODO":
      return state.map((todo) =>
        todo.id !== action.id
          ? todo
          : Object.assign({}, todo, { complete: !todo.complete }),
      );
    default:
      return state;
  }
}

function goals(state = [], action) {
  switch (action.type) {
    case "ADD_GOAL":
      return state.concat([action.goal]);
    case "REMOVE_GOAL":
      return state.filter((goal) => goal.id !== action.id);
    default:
      return state;
  }
}

function appReducer(state = {}, action) {
  return {
    todos: todos(state.todos, action),
    goals: goals(state.goals, action),
  };
}

// reducer function that uses action to update state
function createStore(reducer) {
  // store has 4 parts:
  // 1. internal state (private)
  // 2. way to get state
  // 3. listen to state changes
  // 4. update the state

  let state;
  let listeners = [];

  const getState = () => state;

  // pass a listener function to subscribe,
  // when returned function of subscribe called
  // it will unsubscribe that listener
  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  };

  // action is an object that will change the state of the store
  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach((listener) => listener());
  };

  return {
    getState,
    subscribe,
    dispatch,
  };
}

const store = createStore(appReducer);
store.dispatch({
  type: "ADD_TODO",
  todo: {
    id: 0,
    name: "Walk the dog",
    complete: false,
  },
});
console.log("get store", store.getState());

/*
store.subscribe(() => {
  console.log("The new state is: ", store.getState());
});

store.dispatch({
  type: "ADD_TODO",
  todo: {
    id: 0,
    name: "Walk the dog",
    complete: false,
  },
});

store.dispatch({
  type: "ADD_TODO",
  todo: {
    id: 1,
    name: "Wash the car",
    complete: false,
  },
});

store.dispatch({
  type: "ADD_TODO",
  todo: {
    id: 2,
    name: "Go to the gym",
    complete: true,
  },
});

store.dispatch({
  type: "REMOVE_TODO",
  id: 1,
});

store.dispatch({
  type: "TOGGLE_TODO",
  id: 0,
});

store.dispatch({
  type: "ADD_GOAL",
  goal: {
    id: 0,
    name: "Learn Redux",
  },
});

store.dispatch({
  type: "ADD_GOAL",
  goal: {
    id: 1,
    name: "Lose 20 pounds",
  },
});

store.dispatch({
  type: "REMOVE_GOAL",
  id: 0,
});
*/
