let signUpNameInput = document.getElementById("signUpName");
let signUpEmailInput = document.getElementById("signUpEmail");
let signUpPasswordInput = document.getElementById("signUpPassword");
let signUpForm = document.getElementById("login");
let nameAlert = document.getElementById("nameAlert");
let emailAlert = document.getElementById("emailAlert");
let passwordAlert = document.getElementById("passwordAlert");
let done = document.getElementById("done");
let emailAlreadyExists = document.getElementById("emailExists");

let allData;

// Load  data from localStorage
if (localStorage.getItem("data") !== null) {
  allData = JSON.parse(localStorage.getItem("data"));
} else {
  allData = [];
}

signUpForm.addEventListener("submit", function (e) {
  e.preventDefault();

  // Validate name
  let isNameValid = validateForm( /^[a-zA-Z ,.'-]+$/ , signUpNameInput , nameAlert);

  // Validate email
  let isEmailValid = validateForm(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, signUpEmailInput, emailAlert);

  // Validate password (assuming it should contain at least one digit)
  let isPasswordValid = validateForm(/(?=.*[0-9])/,signUpPasswordInput,passwordAlert);

  // If all fields are valid, proceed with form submission
  if (isNameValid && isEmailValid && isPasswordValid) {
    handleFormSubmission();
  }
});

// Function to validate input based on regex and update alert display
function validateForm(regex, element, alert) {
  let pattern = regex;
  if (pattern.test(element.value)) {
    alert.classList.replace("d-block", "d-none");
    return true;
  } else {
    alert.classList.replace("d-none", "d-block");
    return false;
  }
}

// Function to handle form submission
function handleFormSubmission() {
  let newUser = {
    name: signUpNameInput.value,
    email: signUpEmailInput.value.toLowerCase(),
    password: signUpPasswordInput.value,
  };

  // Check if email already exists
  if (isEmailAlreadyExists(newUser.email)) {
    emailAlreadyExists.classList.replace("d-none", "d-block");
    done.classList.replace("d-block", "d-none");
  } else {
    allData.push(newUser);
    localStorage.setItem("data", JSON.stringify(allData));
    emailAlreadyExists.classList.replace("d-block", "d-none");
    done.classList.replace("d-none", "d-block");
    clearForm();
  }

  // Clear form inputs

  function clearForm() {
    signUpNameInput.value = null;
    signUpEmailInput.value = null;
    signUpPasswordInput.value = null;
  }
}

function isEmailAlreadyExists(email) {
  for (let i = 0; i < allData.length; i++) {
    if (allData[i].email === email) {
      return true;
    }
  }
  return false;
}
