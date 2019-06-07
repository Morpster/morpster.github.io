var btn = document.getElementById("button");
var username = document.getElementById("user");
let data = localStorage.getItem("username");

if (data) {
    LIST = JSON.parse(data);
    id = LIST.length; // Set the id to the last one in the list
} else {
    // If data is empty
    LIST = [];
    id = 0;
};

btn.addEventListener('click', function () {
    LIST.push({
        username: username.value,
        id: LIST.length
    });
    localStorage.setItem("username", JSON.stringify(LIST));

    document.getElementById("loader").style.cssText = "opacity: 1; z-index: 1;";
    document.getElementById("login-container").style.cssText = "filter: blur(1.5px); -webkit-filter: blur(1.5px);";
    window.setTimeout(function () {
        window.location.href = "../Forside/Forside.html";
    }, 3000);
});