const setState = (key:string, value:any):void => {
if(typeof value == "string") {
    localStorage.setItem(key, value)
}
else{
    localStorage.setItem(key, JSON.stringify(value))
}
}
const getState = (key:string):any =>{
    const data = localStorage.getItem(key)
    if(data) {
        if(JSON.parse(data)) {
            return JSON.parse(data)
        }
        else {
         return data 
        }
        
    }
}

interface TodoType {
    id: number,
    value: string
}

let elform: Element | null = document.querySelector(".todo-form")
let elInp: Element | null = document.querySelector(".todo-inp")
let elList: Element | null = document.querySelector(".todo-list")
let Id:number = 0
let todos:TodoType[] = getState("todos") || []


elform?.addEventListener("submit", function(e:Event) {
    e.preventDefault() 
    const data:TodoType = {
        id:todos.length ? todos[todos.length-1].id+1 : 1,
        value: (elInp as HTMLInputElement).value
    } 
    todos.push(data)
    rendTodo(todos,elList);
    (e.target as HTMLFormElement).reset()
    setState("todos", todos)
} )


function rendTodo(arr:TodoType[], list:Element | null) {
    (list as HTMLUListElement).innerHTML=``
    arr.forEach((item:TodoType, index:number ) => {
        let elItem:Element | null = document.createElement('li')
        elItem.className="flex items-center justify-between p-2bg-slate-200 rounded-md "
        elItem.innerHTML = `
        <div class="flex">
        <span>${index+1}.</span>
        <strong>${item.value}</strong>
        </div>
        <div>
        <button  class="delete-btn bg-red-500 rounded-md text-white mb-2">Delete </button>
        </div>
        `;
        (list as HTMLUListElement ).append(elItem)

        elItem.addEventListener("click", function(e:Event){
            if((e.target as HTMLLIElement).matches(".delete-btn")){
                const data = todos.filter((item:TodoType) => item.id != Number((e.target as HTMLButtonElement).id));
                todos = data;
                rendTodo(todos, elList);
                setState("todos", todos)
            }
        })


    } )
} 
rendTodo(todos,elList)