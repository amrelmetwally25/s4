let logOut = document.getElementById("logout");
userwelcom = document.getElementById("userwelcom");

function welcome() {
  userwelcom.innerHTML = "Welcome " + localStorage.getItem("lookedinUser");
}
welcome();

logOut.addEventListener("click", function (e) {
  e.preventDefault();
  window.location.replace("../sign in/index.html");
  localStorage.removeItem("lookedinUser");
});
