import { randomUUID } from "node:crypto";


export const toDos = [];


export function getTodos() {
  return toDos;

};

export function getTodo(id) {
  return toDos.find((m) => m.id === id);
};

export function createTodo(t) {
  const todo = { id: randomUUID(), title: t.title, completed: false };
  toDos.push(todo);
  return todo;

};

export function updatetodo(id, Todo) {
  const newToDo = Todo.find((m) => m.id === id);

  if (newToDo === undefined) {
    return
  }

  if (typeof toDos.title === 'string') {
    newToDo = Todo.title;
  }

  if (typeof toDos.completed === 'boolean') {
    newToDo = Todo.completed;
  }

  return newToDo;
};



export function deletetodo(title) {
  const index = toDos.findIndex(todo => todo.id === title)

  if (index === -1) {
    return 'no existe';
  }

  toDos.splice(index, 1)
  return 'ok';

}