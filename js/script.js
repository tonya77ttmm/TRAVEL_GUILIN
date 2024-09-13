"user strict";
// function display

const cardBudget = document.querySelectorAll(".card-budget");
const cardFood = document.querySelectorAll(".card-food");
const cardRoute = document.querySelectorAll(".card-route");

const hideFood = function () {
  for (let i = 0; i < cardFood.length; i++) {
    if (cardFood[i].classList.contains("hidden")) {
      break;
    } else {
      cardFood[i].classList.add("hidden");
    }
  }
};
const hideBudget = function () {
  for (let i = 0; i < cardBudget.length; i++) {
    if (cardBudget[i].classList.contains("hidden")) {
      break;
    } else {
      cardBudget[i].classList.add("hidden");
    }
  }
};
const hideRoute = function () {
  for (let i = 0; i < cardRoute.length; i++) {
    if (cardRoute[i].classList.contains("hidden")) {
      break;
    } else {
      cardRoute[i].classList.add("hidden");
    }
  }
};
const btnFood = document.querySelector(".btn-food");
const btnBudget = document.querySelector(".btn-budget");
const btnRoute = document.querySelector(".btn-route");
btnFood.addEventListener("click", function () {
  for (let i = 0; i < cardFood.length; i++) {
    if (cardFood[i].classList.contains("hidden")) {
      cardFood[i].classList.remove("hidden");
      hideBudget();
      hideRoute();
    }
  }
});

btnBudget.addEventListener("click", function () {
  for (let i = 0; i < cardBudget.length; i++) {
    if (cardBudget[i].classList.contains("hidden")) {
      cardBudget[i].classList.remove("hidden");
      hideFood();
      hideRoute();
    }
  }
});
btnRoute.addEventListener("click", function () {
  for (let i = 0; i < cardRoute.length; i++) {
    if (cardRoute[i].classList.contains("hidden")) {
      cardRoute[i].classList.remove("hidden");
      hideBudget();
      hideFood();
    }
  }
});
