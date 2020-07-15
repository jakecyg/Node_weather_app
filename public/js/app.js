const weatherForm = document.querySelector("form");
const messageOne = document.querySelector("#messageOne");
const messageTwo = document.querySelector("#messageTwo");

messageOne.textContent = "";
messageTwo.textContent = "";

weatherForm.addEventListener("submit", (e, response) => {
  e.preventDefault();
  const searchValue = document.querySelector("input");
  const location = searchValue.value;
  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";

  fetch("/weather?location=" + location).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        messageOne.textContent = data.location;
        messageTwo.textContent = data.currentWeather;
      }
    });
  });
});
