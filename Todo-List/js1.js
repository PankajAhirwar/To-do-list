const addBtn = document.getElementById("btn");
const newTastInput = document.querySelector("#wrap input");
const taskContainer=document.getElementById("Task");
const error=document.getElementById("error");
const countvalue=document.querySelector(".count-value");

let taskCount =0;

const displayCount = (taskCount)=>{
    countvalue.innerText=taskCount;
};

const addTask=()=>{
        const taskName=newTastInput.value.trim();
        error.style.display="none";

        if(!taskName){
            setTimeout(()=>{
                error.style.display="block";
            },200);
            return ;
        }

        const task= `<div class="task">
        <input type="checkbox" class="task-check">
        <span class="taskname">${taskName}</span>
        <button class="edit">
        <i class="fa-solid fa-pen-to-square"></i>
        </button>

        <button class="delete">
        <i class="fa-solid fa-trash-can"></i>
        </button>
        
        </div>`

        taskContainer.insertAdjacentHTML("beforeend",task);

        const deleteButton = document.querySelectorAll(".delete");
        deleteButton.forEach((button)=>{
            button.onclick = () =>{
                button.parentNode.remove();
                taskCount -= 1;
                displayCount(taskCount);
            };
        });
   

        const editButton=document.querySelectorAll(".edit");

        editButton.forEach((editbtn)=>{
            editbtn.onclick = (e)=>{
          let targetElemnet = e.target;
          if(!(e.target.classname=="edit")){
            targetElemnet = e.target.parentElement;
          }
          newTastInput.value = targetElemnet.previousElementSibling?.innerText;
          targetElemnet.parentNode.remove();
          taskCount -=1;
          displayCount(taskCount);

            };
        });

        const taskCheck = document.querySelectorAll(".task-check");

        taskCheck.forEach((checkBox)=>{
        checkBox.onchange = () =>{
        
            checkBox.nextElementSibling.classList.toggle("completed");

            if(checkBox.checked){
                taskCount -=1;
            }
            else{
                taskCount +=1;
            }
            displayCount(taskCount);
        };
        });

        taskCount += 1;
        displayCount(taskCount);
        newTastInput.value="";
        
        
};

addBtn.addEventListener("click",addTask);


window.onload = () =>{
    taskCount = 0;
    displayCount(taskCount);
    newTastInput.value = "";
}
