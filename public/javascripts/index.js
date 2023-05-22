// them id V 
//filter V
// edit V
// ghi vao file

window.addEventListener('load', updateData)
async function updateData(){
  const type =  document.querySelector('.select').value
  const res = await  fetch(`http://localhost:3001/api?type=${type}`)
  const  todos = await res.json()
  renderData(todos)
}
async function addTodo(data) {
   await fetch("http://localhost:3001/api/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}
async function editTodo(id , data) {
  
  await fetch(`http://localhost:3001/api/edit/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

async function deleteTodo(id) {
await fetch(`http://localhost:3001/api/delete/${id}`, {
    method: "DELETE",
  });
}


function renderData(data) {
  const template = data.map((item ,index)=>{
    return `<ul class="list-group list-group-horizontal rounded-0 bg-transparent">
    <li
      class="list-group-item d-flex align-items-center ps-0 pe-3 py-1 rounded-0 border-0 bg-transparent">
      <div class="form-check">
        <input class="form-check-input me-0 cusor" type="checkbox" value="" id="flexCheckChecked1"
          aria-label="..." ${item.complete ? 'checked' : '' } 
          onchange="updateCompaleTodo(${item.id})"
          />
      </div>
    </li>
    <li
      class="list-group-item px-3 py-1 d-flex align-items-center flex-grow-1 border-0 bg-transparent">
      <p class="lead fw-normal mb-0 ${item.complete ? 'done-text' : '' }">${item.title}</p>
    </li>
    <li class="list-group-item ps-3 pe-0 py-1 rounded-0 border-0 bg-transparent">
      <div class="d-flex flex-row justify-content-end mb-1">
       <span  class="text-info btn-edit cusor mr-2" data-mdb-toggle="tooltip" title="Edit todo"
       onclick="editTitleTodo( ${item.id}, ${index})"
       ><i
       class="fas fa-pencil-alt me-3"
       ></i></span>
        <span  class="text-danger btn-delete cusor" data-mdb-toggle="tooltip" title="Delete todo"
        onclick="removeTodo(${item.id})"
        >
        <i class="fas fa-trash-alt"></i></span>
      </div>
     
    </li>
  </ul>`


  })
  const node = document.querySelector(".list-todo");
  node.innerHTML = template.join("");
}

const btnAdd = document.querySelector(".btn-add");
btnAdd.addEventListener("click", newTodo);
let input = document.querySelector(".myInput");
input.addEventListener('keyup' , function(e){
if(e.keyCode === 13){
  newTodo()
}
})
async function newTodo() {
  let inputValue = input.value.trim();
  if (inputValue === "") {
    alert("Bạn hãy viết gì đó");
  } else {
    const data = {
      title: inputValue,
      complete: false,
    };
   
     await addTodo(data);
     await updateData()
  }
  input.value = "";

}

async function updateCompaleTodo(id) {
  const res = await  fetch(`http://localhost:3001/api/todo/${id}`)
  const  todo = await res.json()
  todo.complete = !todo.complete
  await editTodo(id , todo)
  await updateData()

}

async function removeTodo(id) {
  await deleteTodo(id)
  await updateData()
}



async function editTitleTodo(id,index){
const listText = document.querySelectorAll('.lead')
const listLi = document.querySelectorAll('.list-group-item')
listText[index].style.display = 'none'
const input = document.createElement('input')
listLi[index].appendChild(input)
const res = await  fetch(`http://localhost:3001/api/todo/${id}`)
const  todo = await res.json()
input.value = todo.title
input.focus()
input.onblur = async function(){
  let inputValue = input.value.trim();
  if(inputValue){
    todo.title = inputValue
    await editTodo(id,todo);
    input.style.display = 'none'
  }else{
    alert('khong dc de trong')
  }
  await updateData()
}
}