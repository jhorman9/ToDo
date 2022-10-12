const addButton = document.querySelector(".btn-primary");
const taskTitle = document.querySelector("[name='name']");
const taskDescription = document.querySelector("[name='description']")
const taskArea = document.querySelector(".tasks-container");

//primero leo el local storage para guardar los valores en el arreglo y luego
//seguir agregando tareas

//getItem obtiene una propiedad del local Storage y si es un [] u {} tenemos
//que parsearlo con JSON.parse(valor);

let taskArray = JSON.parse(localStorage.getItem("tasks")) ?? []; // devuelve el primer v o el ultimo f
// Se almacena de un push que esta en el evento de la linea 12
//ubicado exactamente en la linea 17
createTask()
let idCounter = 0;

//Event Delegation
// ASIGNAR UN IDENTIFICADOR UNICO A CADA TAREA

taskArea.addEventListener("click", (e) =>{
    if(e.target.classList.contains("btn-delete")){
        const taskId = e.target.getAttribute("id");//asi se obtiene un atributo.
        // splice -- primero necesito encontrar la posicion del elemento y luego aplicar splice
        // con un 
        const newTasks = taskArray.filter((task) => task.id != taskId); // que me devuelva todo menos ese que seleccioné
        taskArray = [...newTasks]; // se lo asigno al taskArray
        createTask()
        localStorage.setItem("tasks", JSON.stringify(taskArray)); // le envio el arreglo actualizado al localStorage
    }
    if(e.target.classList.contains("btn-complete")){
        const taskId = e.target.getAttribute("id");
        console.log(taskId);
        //encontrar el elemento que contenga el id que acabo de obtener
        const index = taskArray.findIndex((task) => task.id === Number(taskId));
        console.log(index);
        taskArray[index].complete = true;
        createTask();
        localStorage.setItem("tasks", JSON.stringify(tasksArray));
    }
})

addButton.addEventListener("click", (e) =>{
    //console.log(e.target.parentElement.previousElementSibling.firstElementChild.lastElementChild.value)
    const title = taskTitle.value;
    const description = taskDescription.value;
    taskArray.push({title, description, complete: false, id: idCounter}); //para agregarlo luego a la funcion
    localStorage.setItem("tasks", JSON.stringify(taskArray));
    clearInputs(); //al escribir y darle al boton se elimina el texto
    createTask();
    idCounter++;
})

function createTask() {
    const elements = taskArray.map((task) =>{ //la i es el iterador o indice
        //{title: tarea1, description: hacer limpieza} //eso es lo que tiene
        //cada elemento del arreglo
        return `
      <div class="task-item">
        <div class="task-description">
          <h3 class="${task.complete ? "complete" : ""}">${task.title}</h3>
          <p>${task.description}</p>
        </div>
        <div class="task-buttons">
          <button class="btn btn-complete ${task.complete ? "hide" : ""}" id=${
      task.id
    }>Competar</button>
          <button class="btn btn-delete" id=${task.id}>Delete</button>
        </div>
      </div>`;
  });
  localStorage.setItem("tasks", JSON.stringify(taskArray));
  taskArea.innerHTML = elements.join("");
}

function clearInputs () { // para limpiar los inputs
    taskTitle.value = "";
    taskDescription.value = "";
}

localStorage.setItem("Prueba", JSON.stringify({propiedad: 'asdasdasd'}));
//tenemos que usar JSON para poder guardar objetos en el local storage
// valores primitivos
// para enviar {} o [] usamos JSON.stringify(valor);