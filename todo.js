const inputTask = document.getElementById("input-task");
const addTask = document.getElementById("add-task");
const taskContainer = document.getElementById("task-container");

let tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];

for(savedTask of tasks){
    console.log(savedTask);
    let task = savedTask.task;
    let striked = savedTask.striked;
    let taskBox = document.createElement("div");
    taskBox.classList.add('task-box');

    let li = document.createElement('li');
    li.innerText = task;
    if(striked){
        li.innerHTML = li.innerText.strike();
    }
    taskBox.appendChild(li);

    let checkButton = document.createElement("button");
    checkButton.innerHTML = '&#10003';
    checkButton.classList.add('check-button');
    taskBox.appendChild(checkButton);

    let deleteButton = document.createElement("button");
    deleteButton.innerHTML = '&#10005';
    deleteButton.classList.add('delete-button');
    taskBox.appendChild(deleteButton);

    taskContainer.appendChild(taskBox);

    checkButton.addEventListener('click', function(){
        li.innerHTML = li.innerText.strike();
        for(savedTask of tasks){
            if(savedTask.task === task){
                savedTask.striked = true;
                localStorage.setItem('tasks', JSON.stringify(tasks));
            }
        }
    });

    deleteButton.addEventListener('click', function(){
        tasks = tasks.filter(e => e.task != task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        taskContainer.removeChild(taskBox);
    });
}


addTask.addEventListener('click', function(){
    let taskBox = document.createElement("div");
    taskBox.classList.add('task-box');

    tasks.push({
        task:inputTask.value,
        striked:false
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));

    let task = inputTask.value;
    let li = document.createElement('li');
    li.innerText = task;
    taskBox.appendChild(li);

    let checkButton = document.createElement("button");
    checkButton.innerHTML = '&#10003';
    checkButton.classList.add('check-button');
    taskBox.appendChild(checkButton);

    let deleteButton = document.createElement("button");
    deleteButton.innerHTML = '&#10005';
    deleteButton.classList.add('delete-button');
    taskBox.appendChild(deleteButton);

    if(inputTask.value == ""){
        alert('Please enter a task');
    }
    else{
        console.log("append");
        taskContainer.appendChild(taskBox);
    }

    
    checkButton.addEventListener('click', function(){
        li.innerHTML = li.innerText.strike();
        for(savedTask of tasks){
            if(savedTask.task === task){
                savedTask.striked = true;
                localStorage.setItem('tasks', JSON.stringify(tasks));
            }
        }
    });
    inputTask.value = "";

    deleteButton.addEventListener('click', function(){
        taskContainer.removeChild(taskBox);
    });
});