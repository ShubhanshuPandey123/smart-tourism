

document.getElementById("adminLoginForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    email: document.getElementById("email").value,
    password: document.getElementById("password").value
  };

  try {
    const res = await fetch(`${API_BASE_URL}/api/admin/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const result = await res.json();

    if (res.ok) {
      localStorage.setItem(ADMIN_TOKEN_KEY, result.token);
      window.location.href = "admin-dashboard.html";
    } else {
      alert(result.message);
    }

  } catch (err) {
    console.error(err);
    alert("Backend not connected. Check console.");
  }
});
