import { legacy_createStore as createStore } from "redux";

const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");

// declare TYPE
const ADD_TODO_TYPE = "ADD_TODO";
const DELETE_TODO_TYPE = "DELETE_TODO";

// declare ACTION_TYPE (Object)
const addTodo = (text) => {
  return {
    type: ADD_TODO_TYPE,
    text,
  };
};

const deleteTodo = (id) => {
  return {
    type: DELETE_TODO_TYPE,
    id
  }
}

// Reducer
const reducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO_TYPE:
      return [...state, { text: action.text, id: Date.now() }];
    case DELETE_TODO_TYPE:
      return state.filter(toDo => toDo.id !== action.id);
    default:
      return state;
  }
};

// Store
const store = createStore(reducer);

// Dispatch
const dispatchAddToDo = (text) => {
  store.dispatch(addTodo(text));
};

const dispatchDeleteToDo = (e) => {
  const id = parseInt(e.target.parentNode.id);
  store.dispatch(deleteTodo(id));
};

const paintTodos = () => {
  const toDos = store.getState();
  ul.innerHTML = "";
  toDos.forEach((toDo) => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.addEventListener("click", dispatchDeleteToDo);
    btn.innerText = "삭제";
    li.id = toDo.id;
    li.innerHTML = toDo.text;
    li.appendChild(btn);
    ul.appendChild(li);
  });
};

// Subscribe
// store.subscribe(() => console.log(store.getState()));
store.subscribe(paintTodos);

const onSubmit = (e) => {
  e.preventDefault();
  const toDo = input.value;
  input.value = "";
  dispatchAddToDo(toDo);
};

form.addEventListener("submit", onSubmit);
