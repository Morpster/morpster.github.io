//Adds calendar functionality
document.addEventListener('DOMContentLoaded', function () {
  var calendarEl = document.getElementById('calendar');

  calendar = new FullCalendar.Calendar(calendarEl, {
    plugins: ['dayGrid', 'interaction'],
    editable: true,
    defaultView: 'dayGridMonth',
    displayEventTime: false,
    header: {
      left: 'prev, next today',
      center: 'title',
      right: 'addEvent'
    },
    customButtons: {
      addEvent: {
        text: '+',
        click: function () {
          toggleForm("block");
        }
      }
    }
  });

  calendar.render();
});


window.onload = function () {
  var createBtn = document.getElementById("createBtn");
  createBtn.addEventListener("click", assignEvent);

  let data = localStorage.getItem("events");

  if (data) {
    LIST = JSON.parse(data);
    id = LIST.length; // Set the id to the last one in the list
    loadEvents(LIST);
  } else {
    // If data is empty
    LIST = [];
    id = 0;
  };
}

function loadEvents(array) {
  array.forEach(function (item) {
    calendar.addEvent({
      title: item.title + "\n" + "Room: " + item.room,
      start: item.date
    });
  });
};

function toggleForm(state) {
  document.getElementById("myForm").style.display = state;
}

function getInput(type) {
  return document.getElementById("user" + type).value;
}

function assignEvent() {
  inputTitle = getInput("Title");
  inputDate = new Date((getInput("Date")) + 'T00:00:00');
  inputRoom = getInput("Room");

  if (!isNaN(inputDate.valueOf())) {
    calendar.addEvent({
      title: inputTitle + "\n" + "Room: " + inputRoom,
      start: inputDate
    });

    LIST.push({
      title: inputTitle,
      date: inputDate,
      room: inputRoom,
      id: LIST.length
    });
    localStorage.setItem("events", JSON.stringify(LIST));

  } else {
    alert("Invalid date. Format is YYYY-MM-DD.");
  }
};
