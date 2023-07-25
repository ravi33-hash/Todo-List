let todoItemsContainer = document.getElementById("todoItemsContainer");
let addTodoButton= document.getElementById("addTodoButton");
let saveButton= document.getElementById("saveTodoButton");

function getLocalStorage()
{
    let StringField= localStorage.getItem("todoList");
    let parsedTodoList= JSON.parse(StringField);
    if(parsedTodoList===null)
    {
        return [];
    }
    else
    {
        return parsedTodoList;
    }
}

let TodoList= getLocalStorage();
let todoCount= TodoList.length;

saveButton.onclick= function()
{
    localStorage.setItem("todoList",JSON.stringify(TodoList));
}

addTodoButton.onclick= function()
{
    addTodo();
}

function onTodoStatusChange(inputId,labelId)
{
    let checkedBox= document.getElementById(inputId);
    let labelBox= document.getElementById(labelId);
    
    if(checkedBox.checked=== true)
    {
        labelBox.classList.add("checked");
    }
    else
    {
        labelBox.classList.remove("checked");    
    }
}

function onDelete(deleteId)
{
    let todoElement= document.getElementById(deleteId);
    todoItemsContainer.removeChild(todoElement);

    let deleteIndex= TodoList.findIndex(function(eachTodo)
    {
        let deleteTodo= 'todo'+eachTodo.un;
        if(deleteTodo === deleteId)
        {
            return true;
        }
        else
        {
            return false;
        }
    });

    TodoList.splice(deleteIndex,1);

}

function createAndAppendTodo(todo) 
{
  let todoElement = document.createElement("li");
  todoElement.classList.add("todo-item-container", "d-flex", "flex-row");
  todoItemsContainer.appendChild(todoElement);

  let labelId= "label"+todo.un;
  
  let inputId= "checkboxInput"+ todo.un;
  let deleteId= "todo"+todo.un;
  todoElement.id= deleteId;
  let inputElement = document.createElement("input");
  inputElement.type = "checkbox";
  inputElement.id = inputId;
  inputElement.classList.add("checkbox-input");
  inputElement.onclick= function()
  {
    onTodoStatusChange(inputId,labelId);
  }
  todoElement.appendChild(inputElement);

  let labelContainer = document.createElement("div");
  labelContainer.classList.add("label-container", "d-flex", "flex-row");
  todoElement.appendChild(labelContainer);

  let labelElement = document.createElement("label");
  labelElement.setAttribute("for", inputId);
  labelElement.classList.add("checkbox-label");
  labelElement.id= labelId;
  labelElement.textContent = todo.text;
  labelContainer.appendChild(labelElement);

  let deleteIconContainer = document.createElement("div");
  deleteIconContainer.classList.add("delete-icon-container");
  labelContainer.appendChild(deleteIconContainer);

  let deleteIcon = document.createElement("i");
  deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");
  deleteIcon.id= deleteId;
  deleteIcon.onclick= function()
  {
    onDelete(deleteId);
  }
  deleteIconContainer.appendChild(deleteIcon);
}

for (let todo of TodoList)
{
    createAndAppendTodo(todo);
}

function addTodo()
{
    
    todoCount= todoCount+1;
    let userInputElement= document.getElementById("todoUserInput");
    let userInputValue= userInputElement.value;

    if(userInputValue==="")
    {
        alert("Enter the Text!!!");
        return;
    }

    let newTodo=
    {
        text: userInputValue,
        un: todoCount
    };
    
    
    TodoList.push(newTodo);
    createAndAppendTodo(newTodo);
    userInputElement.value= "";
}

