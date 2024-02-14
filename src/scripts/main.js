import Toastify from 'toastify-js';
import { format } from "date-fns";

let totalTasks = document.getElementById('total-tasks');
let remaningTasks = document.getElementById('remaning-tasks');
let doneTasks = document.getElementById('done-tasks');
const bttnAddTask = document.getElementById('add-task-button');
const taskList = document.getElementById('task-list');

let date = document.getElementById('date');
date.innerText = format(new Date(), "dd/MM/yyyy");

bttnAddTask.addEventListener('click', createTask);

document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') { 
        createTask();
    }
});

function createTask() {
    const inputTask = document.getElementById('input-task');
    if (inputTask.value === '') {
        return Toastify({
            text: "Não é possível adicionar tarefas vazias",
            className: "error",
            style: {
              background: "#E14D45",
              'font-size': "1.5rem",
            },
            gravity: "bottom",
        }).showToast();
    }

    let li = document.createElement('li');
    li.innerHTML = inputTask.value;
    li.classList.add('task-list__item');
    taskList.appendChild(li);

    let span = document.createElement('span');
    span.classList.add('remove-icon');
    li.appendChild(span);

    Toastify({
        text: "Tarefa adicionada!",
        className: "succes",
        style: {
          background: "#2ECC71",
          'font-size': "1.5rem",
        },
        gravity: "bottom",
    }).showToast();

    updateTotalTasks();
    updateRemaningTasks();
    updateDoneTasks();
    saveToLocalStorage();
    inputTask.value = '';
}

function updateTotalTasks() {
    const newTotalTasks = document.getElementsByClassName('task-list__item').length;

    totalTasks.innerText = newTotalTasks;
}

function updateRemaningTasks() {
    const totalTasks = document.getElementsByClassName('task-list__item').length;
   const totalDoneTasks = document.getElementsByClassName('task-list__item--checked').length;

    remaningTasks.innerText = Number(totalTasks - totalDoneTasks);
}

function updateDoneTasks() {
    const newDoneTasks = document.getElementsByClassName('task-list__item--checked').length;

    doneTasks.innerText = newDoneTasks;
}

function changeTaskIcon() {
    console.log('clicou');
}

taskList.addEventListener('click', function(e) {
    if(e.target.tagName === 'LI') {
        e.target.classList.toggle('task-list__item--checked');
        updateDoneTasks();
        updateRemaningTasks();
        saveToLocalStorage();
    } else if (e.target.tagName == 'SPAN') {
        e.target.parentElement.remove();
        updateTotalTasks();
        updateRemaningTasks();
        updateDoneTasks();
        saveToLocalStorage();

        Toastify({
            text: "Tarefa removida com sucesso!",
            className: "succes",
            style: {
              background: "#2ECC71",
              'font-size': "1.5rem",
            },
            gravity: "bottom",
        }).showToast();
    }
}, false);

function saveToLocalStorage() {
    const data = {
        taskList: taskList.innerHTML,
        totalTasks: totalTasks.innerText,
        remaningTasks: remaningTasks.innerText,
        doneTasks: doneTasks.innerText
    };
    localStorage.setItem('data', JSON.stringify(data));
}

function getLocalStorage() {
    const data = JSON.parse(localStorage.getItem('data'));
    if (data) {
        taskList.innerHTML = data.taskList;
        totalTasks.innerText = data.totalTasks;
        remaningTasks.innerText = data.remaningTasks;
        doneTasks.innerText = data.doneTasks;
    }
}

getLocalStorage();