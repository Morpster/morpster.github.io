// Variables for the different div containers
const toDoItems = document.getElementById("toDo");
const doing = document.getElementById("doing");
const doneItems = document.getElementById("done");

// Variable for the user input & all the containers
const input = document.getElementById("input");
const containers = document.querySelectorAll(".container");

// Variables for the different lists
const toDoList = document.getElementById("toDoList");
const doingList = document.getElementById("doingList");
const doneList = document.getElementById("doneList");

for (const container of containers) {
    container.addEventListener("dragstart", dragStart);
    container.addEventListener("dragover", dragOver);
    container.addEventListener("dragenter", dragEnter);
    container.addEventListener("dragleave", dragLeave);
    container.addEventListener("drop", dragDrop);
    container.addEventListener("dragend", dragEnd);
}

// Variables
let LIST, id;

// get item from localstorage
let data = localStorage.getItem("TODO");
let usernameData = JSON.parse(localStorage.getItem("username"));

if (!usernameData) {
    alert("You're not signed in.");
    LIST = [];
    id = 0;

    LIST.push({
        username: "Guest",
        id: 0
    });
    localStorage.setItem("username", JSON.stringify(LIST));
}
usernameData = JSON.parse(localStorage.getItem("username"));

let loginUsername = usernameData[usernameData.length - 1].username;

// Check if data is not empty
if (data) {
    LIST = JSON.parse(data);
    id = LIST.length; // Set the id to the last one in the list
    loadList(LIST); // Load the list to the user interface
} else {
    // If data is empty
    LIST = [];
    id = 0;
}

// Load items to the user's interface
function loadList(array) {
    array.forEach(function (item) {
        addToDo(item.name, item.id, item.trash, item.currentPosition, item.author, ((item.members).join(', ')));
    });
}

// Adding to-do function
function addToDo(toDo, id, trash, currentPosition, username, members) {

    if (trash) {
        return;
    };

    const item = '<div class="item" draggable="true" id="' + id + '"><i id=' + id + ' class="fa fa-info-circle" job="info"></i> <p class="text">' + toDo + '<p class="authorText">Added by: ' + username + '</p></p> <p id= ' + id + 'm class="assignedTo">Assigned to: ' + members + '</p><i class="fa fa-trash-o de" job="delete" id="' + id + '"></i></div>';

    const position = "beforeEnd";


    if (currentPosition == 1) {
        toDoList.insertAdjacentHTML(position, item);
    }
    if (currentPosition == 2) {
        doingList.insertAdjacentHTML(position, item);
    }
    if (currentPosition == 3) {
        doneList.insertAdjacentHTML(position, item);
    }
};

input.addEventListener("keyup", event => {
    if (event.keyCode == 13) {
        const toDo = input.value;
        // Check if input is empty
        if (toDo) {
            addToDo(toDo, id, false, 1, loginUsername, "");

            LIST.push({
                name: toDo,
                id: id,
                trash: false,
                currentPosition: 1,
                author: loginUsername,
                description: "",
                members: [],
                date: ""
            });

            // Add item to localstorage ( this code mustbe addedd where the LIST array is updated)
            localStorage.setItem("TODO", JSON.stringify(LIST));

            id++;
        }
        input.value = "";
    }
});

// Remove to do
function removeToDo(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id].trash = true;
}

// Target the items created dynamically

toDoItems.addEventListener("click", function (event) {
    const element = event.target; // Return the clicked element inside list
    const elementJob = element.attributes.job.value; // Delete

    if (elementJob == "delete") {
        removeToDo(element);
    } else if (elementJob == "info") {
        toggleForm("none");
        toggleForm("block", LIST[element.id]);
    }

    // Add item to localstorage ( this code mustbe addedd where the LIST array is updated)
    localStorage.setItem("TODO", JSON.stringify(LIST));
});

doing.addEventListener("click", function (event) {
    const element = event.target; // Return the clicked element inside list
    const elementJob = element.attributes.job.value; // Delete

    if (elementJob == "delete") {
        removeToDo(element);
    } else if (elementJob == "info") {
        toggleForm("none");
        toggleForm("block", LIST[element.id]);
    }

    // Add item to localstorage ( this code mustbe addedd where the LIST array is updated)
    localStorage.setItem("TODO", JSON.stringify(LIST));
});

doneItems.addEventListener("click", function (event) {
    const element = event.target; // Return the clicked element inside list
    const elementJob = element.attributes.job.value; // Delete

    if (elementJob == "delete") {
        removeToDo(element);
    } else if (elementJob == "info") {
        toggleForm("none");
        toggleForm("block", LIST[element.id]);
    }

    // Add item to localstorage ( this code mustbe addedd where the LIST array is updated)
    localStorage.setItem("TODO", JSON.stringify(LIST));
});

// Drag & Drop
let currentItem;

function dragStart() {
    const item = event.target;
    setTimeout(() => (item.className = "invisible"), 0);
    return (currentItem = item);
}

function dragEnd() {
    currentItem.className = "item";
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
    return (currentContainer = this.id);
}

function dragLeave() {}

let currentContainer;

function dragDrop() {
    if (currentItem) {
        currentItem.className = "item";

        if (currentContainer == "toDo") {
            toDoList.append(currentItem);
            LIST[currentItem.id].currentPosition = 1;
            localStorage.setItem("TODO", JSON.stringify(LIST));
        }
        if (currentContainer == "doing") {
            doingList.append(currentItem);
            LIST[currentItem.id].currentPosition = 2;
            localStorage.setItem("TODO", JSON.stringify(LIST));
        }
        if (currentContainer == "done") {
            doneList.append(currentItem);
            LIST[currentItem.id].currentPosition = 3;
            localStorage.setItem("TODO", JSON.stringify(LIST));
        }
    }
}

function toggleForm(state, info) {
    if (state == "none") {
        return (document.getElementById("myForm").style.display = state);
    };

    document.getElementById("myForm").style.display = state;
    var task = document.getElementById("taskTitle");
    var id = document.getElementById("taskId");
    var members = document.getElementById("taskMembers");
    var desc = document.getElementById("subject");
    var saveBtn = document.getElementById("saveBtn");
    var memberBtn = document.getElementById("memberButton");
    var memberInput = document.getElementById("memberInput");
    var members = document.getElementById("members");

    var _date = function () {
        saveBtn.removeEventListener("click", _date);
        LIST[info.id].description = desc.value;
        LIST[info.id].date = dateInput.value;
        document.getElementById("myForm").style.display = 'none';
        localStorage.setItem("TODO", JSON.stringify(LIST));
    }
    saveBtn.addEventListener("click", _date);

    var _member = function() {
        memberBtn.removeEventListener("click", _member);

        var inputVal = memberInput.value;
        if (inputVal != "") {
            (LIST[info.id].members).push(inputVal);
            localStorage.setItem("TODO", JSON.stringify(LIST));
            memberInput.value = '';
            document.getElementById((LIST[info.id].id)+'m').innerHTML = "Assigned to: " + (LIST[info.id].members).join(', ');
        }
    };

    memberBtn.addEventListener("click", _member);
        
    members.innerHTML = "Assigned: " + (LIST[info.id].members).join(', ');

    task.innerHTML = "Task:" + "<br />" + "" + info.name;
    if (desc.value = "") {
        desc.placeholder = "Add a description..."
    } else {
        desc.value = info.description;
    };
    console.log(info.date);
    dateInput.innerHTML = info.date;
    if (dateInput.value = "") {
        dateInput.placeholder = "Due..."
    } else {
        dateInput.value = info.date;
    };
}