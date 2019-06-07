const sidenavSlide = () => {
  const burger = document.querySelector(".burger");
  const sidenav = document.querySelector(".sidenav");
  const sidenavLinks = document.querySelectorAll(".sidenav li");

  burger.addEventListener("click", () => {
    //Toogle nav
    sidenav.classList.toggle("sidenavActive");

    //Animate Links
    sidenavLinks.forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = "";
      } else {
        link.style.animation = `sidenavLinkFade 0.5s ease forwards ${index / 7 +
          0.5}s`;
      }
    });
    //Burger Animation
    burger.classList.toggle("toogle");
  });
};

sidenavSlide();

//Change background
var color = [
  "radial-gradient( circle farthest-corner at 10% 20%,  rgba(90,92,106,1) 0%, rgba(32,45,58,1) 81.3% )",
  "linear-gradient(to right, #9796f0, #fbc7d4)",
  "radial-gradient( circle farthest-corner at 1.3% 2.8%,  rgba(239,249,249,1) 0%, rgba(182,199,226,1) 100.2% )",
  "radial-gradient( circle 592px at 48.2% 50%,  rgba(255,255,249,0.6) 0%, rgba(160,199,254,1) 74.6% )"
];
var i = 0;
document.querySelector(".background").addEventListener("click", function() {
  i = i < color.length ? ++i : 0;
  document.querySelector("body").style.background = color[i];
});

//Adding dark mode
var darkMode = ["#303030", "#F1F1F1"];
var y = 0;
document.querySelector(".darkMode").addEventListener("click", function() {
  y = y < darkMode.length ? ++y : 0;
  document.querySelector("body").style.background = darkMode[y];
});

const reset = document.querySelector(".reset");

reset.addEventListener("click", function() {
  localStorage.clear();
  window.location.href = "../index.html";
});

const newDate = document.querySelector(".newDate");

newDate.addEventListener("click", function() {
  window.location.href = "../Kalender/calendar.html";
});
