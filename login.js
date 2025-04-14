const menuBtn = document.querySelector('.menubtn');
const navlinks = document.querySelector('.navlinks');

menuBtn.addEventListener('click', () => {
  navlinks.classList.toggle('mobile-menu');
});

const loginBtn = document.querySelector(".log-btn");
const formPopup = document.querySelector(".form-popup");
const closePopupBtn = document.querySelector(".form-popup .close-btn");
const loginSignupLinks = document.querySelectorAll(".form-box .bottom-link a");

// Show/hide login popup
loginBtn.addEventListener("click", () => {
  if (localStorage.getItem("isLoggedIn") === "true") {
    // If already logged in, log out
    localStorage.setItem("isLoggedIn", "false");
    loginBtn.textContent = "Login";
    alert("Logged out successfully!");
  } else {
    // Show login form
    document.body.classList.toggle("show-popup");
  }
});

// Close login popup
closePopupBtn.addEventListener("click", () => {
  document.body.classList.remove("show-popup");
});

// Toggle between login and signup forms
loginSignupLinks.forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    formPopup.classList[link.id === "signup-link" ? 'add' : 'remove']("show-signup");
  });
});

// Handle signup form
document.querySelector(".signup form").addEventListener("submit", function (event) {
  event.preventDefault();

  const newUsername = document.querySelector(".signup input[type='text']").value;
  const newPassword = document.querySelector(".signup input[type='password']").value;
  const policyChecked = document.getElementById("policy").checked;

  if (newUsername && newPassword && policyChecked) {
    // Save to localStorage
    localStorage.setItem("username", newUsername);
    localStorage.setItem("password", newPassword);
    alert("Account created successfully!");
    formPopup.classList.remove("show-signup"); // Go back to login form
  } else {
    alert("Please complete all fields and accept the Terms & Conditions.");
  }
});

// Handle login form
document.querySelector(".login form").addEventListener("submit", function (event) {
  event.preventDefault();

  const username = document.querySelector(".login input[type='text']").value;
  const password = document.querySelector(".login input[type='password']").value;
  const storedUsername = localStorage.getItem("username");
  const storedPassword = localStorage.getItem("password");

  if (username === storedUsername && password === storedPassword) {
    alert(`Welcome, ${username}!`);
    localStorage.setItem("isLoggedIn", "true");
    loginBtn.textContent = "Logout";
    document.body.classList.remove("show-popup");
  } else {
    alert("Invalid username or password.");
  }
});

// Restore login state on page load
window.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("isLoggedIn") === "true") {
    loginBtn.textContent = "Logout";
  } else {
    loginBtn.textContent = "Login";
  }
});
