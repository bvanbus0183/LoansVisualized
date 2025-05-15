document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // This is a simple example. In a real application, you would:
  // 1. Send these credentials to a server
  // 2. Verify them against a database
  // 3. Create a secure session
  if (username && password) {
    // Store login state (this is just for demonstration)
    sessionStorage.setItem("isLoggedIn", "true");
    sessionStorage.setItem("username", username);

    // Redirect to the main page
    window.location.href = "index.html";
  } else {
    alert("Please enter both username and password");
  }
});
