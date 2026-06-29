// AUTH GUARD
if (!localStorage.getItem(USER_TOKEN_KEY)) {
  window.location.href = "login.html";
}

// Initialize map (Uttar Pradesh centered)
const map = L.map("map").setView([26.8467, 80.9462], 6);

// OpenStreetMap tiles
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap"
}).addTo(map);

let selectedCity = null;

// Uttar Pradesh cities ONLY
const cities = [
  { name: "Lucknow", lat: 26.8467, lng: 80.9462 },
  { name: "Varanasi", lat: 25.3176, lng: 82.9739 },
  { name: "Agra", lat: 27.1767, lng: 78.0081 },
  { name: "Prayagraj", lat: 25.4358, lng: 81.8463 },
  { name: "Kanpur", lat: 26.4499, lng: 80.3319 },
  { name: "Noida", lat: 28.5355, lng: 77.3910 },
  { name: "Mathura", lat: 27.4924, lng: 77.6737 },
  { name: "Ayodhya", lat: 26.7922, lng: 82.1998 },
  { name: "Chitrakoot", lat: 25.2000, lng: 80.8500 }
];

// Add markers
cities.forEach(city => {
  const marker = L.marker([city.lat, city.lng]).addTo(map);

  marker.bindPopup(`<b>${city.name}</b><br>Click to explore`);

  marker.on("click", () => {
    selectedCity = city.name;

    document.getElementById("selectedCity").innerText =
      "Selected City: " + selectedCity;

    document.getElementById("exploreBtn").disabled = false;
  });
});

// Explore button
document.getElementById("exploreBtn").addEventListener("click", () => {
  if (!selectedCity) return;

  localStorage.setItem("city", selectedCity);
  window.location.href = "places.html";
});
document.getElementById("logoutBtn")?.addEventListener("click", () => {
  localStorage.removeItem(USER_TOKEN_KEY);
  localStorage.removeItem("city"); // optional cleanup
  window.location.href = "login.html";
});

