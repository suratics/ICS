const usernameInput = document.querySelector("#username");
const passwordInput = document.querySelector("#password");
const AdminBtn = document.querySelector(".admin__entry__btn");
const adminPannelPasswordSection = document.querySelector(
  ".adminPannelConfirmation__section"
);
const AdminPannelInputSection = document.querySelector(
  ".admin__pannel__Input__section "
);
adminPannelPasswordSection.style.display = "none";
AdminPannelInputSection.style.display = "block";

// Authenticating the admin and showing the admin pannel to real admin
AdminBtn.addEventListener("click", () => {
  let username = usernameInput.value;
  let password = passwordInput.value;
  if (
    username === "ics" ||
    username === "ICS" ||
    (username === "Ics" && password === "open its me") ||
    password === "OPEN ITS ME" ||
    password === "Open Its Me"
  ) {
    adminPannelPasswordSection.style.display = "none";
    AdminPannelInputSection.style.display = "block";
  } else {
    usernameInput.value = "";
    passwordInput.value = "";
    alert("ENTER CORRECT PASSWORD");
  }
});
