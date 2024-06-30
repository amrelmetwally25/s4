let signInForm = document.getElementById("signInForm");
let signinEmail = document.getElementById("signinEmail");
let signinPassword = document.getElementById("signinPassword");
let unavailableAlert = document.getElementById("unavailable");
let allData = [];

if (localStorage.getItem("data") !== null) {
  allData = JSON.parse(localStorage.getItem("data"));
}

signInForm.addEventListener("submit", function (e) {
  e.preventDefault();
  dataUser();
});

function dataUser() {
  let user = {
    email: signinEmail.value.toLowerCase(),
    password: signinPassword.value,
  };

  // Check if userEmail and userPassword is valid
  for (let i = 0; i < allData.length; i++) {
    if (
      user.email === allData[i].email &&
      user.password === allData[i].password
    ) {
      localStorage.setItem("lookedinUser", allData[i].name);
      window.location.replace("../home/index.html");
      unavailableAlert.classList.replace("d-block", "d-none");
      return true;
    }
  }

  // If no match found
  unavailableAlert.classList.replace("d-none", "d-block");
  return false;
}

function checkLuckedInUser() {
  debugger;
  if (localStorage.getItem("lookedinUser") !== null) {
    window.location.replace("../home/index.html");
  }
}
