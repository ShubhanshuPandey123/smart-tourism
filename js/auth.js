
// REGISTER
document.getElementById("registerForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    password: document.getElementById("password").value
  };

  try {
    const res = await fetch(`${API_BASE_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const result = await res.json();
    alert(result.message || "Registered");

    if (res.ok) window.location.href = "login.html";

  } catch (err) {
    console.error(err);
    alert("Server not connected. Check console.");
  }
});

// LOGIN
document.getElementById("loginForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    email: document.getElementById("email").value,
    password: document.getElementById("password").value
  };

  try {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const result = await res.json();

    if (res.ok) {
      localStorage.setItem(USER_TOKEN_KEY, result.token);
      window.location.href = "dashboard.html";
    } else {
      alert(result.message);
    }

  } catch (err) {
    console.error(err);
    alert("Server not connected. Check console.");
  }
});
