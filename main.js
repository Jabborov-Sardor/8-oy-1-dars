"use strict";
const setState = (key, value) => {
    if (typeof value == "string") {
        localStorage.setItem(key, value);
    }
    else {
        localStorage.setItem(key, JSON.stringify(value));
    }
};
const getState = (key) => {
    const data = localStorage.getItem(key);
    if (data) {
        if (JSON.parse(data)) {
            return JSON.parse(data);
        }
        else {
            return data;
        }
    }
};
let elform = document.querySelector(".todo-form");
let elInp = document.querySelector(".todo-inp");
let elList = document.querySelector(".todo-list");
let Id = 0;
let todos = getState("todos") || [];
elform === null || elform === void 0 ? void 0 : elform.addEventListener("submit", function (e) {
    e.preventDefault();
    const data = {
        id: todos.length ? todos[todos.length - 1].id + 1 : 1,
        value: elInp.value
    };
    todos.push(data);
    rendTodo(todos, elList);
    e.target.reset();
    setState("todos", todos);
});
function rendTodo(arr, list) {
    list.innerHTML = ``;
    arr.forEach((item, index) => {
        let elItem = document.createElement('li');
        elItem.className = "flex items-center justify-between p-2bg-slate-200 rounded-md ";
        elItem.innerHTML = `
        <div class="flex">
        <span>${index + 1}.</span>
        <strong>${item.value}</strong>
        </div>
        <div>
        <button  class="delete-btn bg-red-500 rounded-md text-white mb-2">Delete </button>
        </div>
        `;
        list.append(elItem);
        elItem.addEventListener("click", function (e) {
            if (e.target.matches(".delete-btn")) {
                const data = todos.filter((item) => item.id != Number(e.target.id));
                todos = data;
                rendTodo(todos, elList);
                setState("todos", todos);
            }
        });
    });
}
rendTodo(todos, elList);
