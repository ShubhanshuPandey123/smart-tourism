

document.addEventListener("DOMContentLoaded", async () => {
  // AUTH GUARD: check if user is logged in
  const token = localStorage.getItem(USER_TOKEN_KEY);
  if (!token) {
    window.location.href = "login.html";
    return;
  }

  // Get selected city from localStorage
  const city = localStorage.getItem("city");
  if (!city) {
    alert("No city selected. Go back to dashboard.");
    window.location.href = "dashboard.html";
    return;
  }

  const container = document.getElementById("placesContainer");
  container.innerHTML = "";

  try {
    // Fetch places from backend (city as query param, lowercase)
    const res = await fetch(`${API_BASE_URL}/places?city=${city.toLowerCase()}`, {
      headers: { "Authorization": `Bearer ${token}` }
    });

    if (!res.ok) throw new Error("Failed to fetch places");

    const places = await res.json();

    if (places.length === 0) {
      container.innerHTML = "<p>No places found for this city.</p>";
      return;
    }

    // Render each place
    places.forEach(p => {
  const div = document.createElement("div");
  div.classList.add("place-card");

  div.innerHTML = `
    <h3>${p.name}</h3>
    <p>${p.description}</p>
  `;

  const img = document.createElement("img");
  img.src = `${API_BASE_URL}/uploads/${p.image}`;  
  img.alt = p.name;
  img.width = 250;

  div.insertBefore(img, div.children[1]);
  container.appendChild(div);
});


  } catch (err) {
    console.error(err);
    alert("Backend not connected or an error occurred. Check console.");
  }
});
