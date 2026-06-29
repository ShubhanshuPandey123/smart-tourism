
document.addEventListener("DOMContentLoaded", () => {
 const API_BASE_URL = "https://my-file-1-rjz1.onrender.com/api";
  const ADMIN_TOKEN_KEY = "adminToken"; // your token key in localStorage

  // ----------------------------
  // AUTH GUARD
  // ----------------------------
  if (!localStorage.getItem(ADMIN_TOKEN_KEY)) {
    window.location.href = "admin-login.html";
  }

  const form = document.getElementById("addPlaceForm");
  const selectCity = document.getElementById("selectCity");
  const adminPlacesContainer = document.getElementById("adminPlacesContainer");
  const logoutBtn = document.getElementById("adminLogoutBtn");

  // ----------------------------
  // Add Place
  // ----------------------------
  form?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", document.getElementById("name").value);
    formData.append("city", document.getElementById("city").value);
    formData.append("description", document.getElementById("description").value);
    formData.append("image", document.getElementById("image").files[0]);

    try {
      const res = await fetch(`${API_BASE_URL}/places/admin/places`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem(ADMIN_TOKEN_KEY)}`
        },
        body: formData
      });

      const data = await res.json();
      alert(data.message || "Place added successfully");

      await loadCities(); // refresh city dropdown
      form.reset();

    } catch (err) {
      console.error(err);
      alert("Backend not connected or server error");
    }
  });

  // ----------------------------
  // Fetch cities for dropdown
  // ----------------------------
  async function loadCities() {
    if (!selectCity) return;
    try {
      const res = await fetch(`${API_BASE_URL}/places/admin/cities`, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem(ADMIN_TOKEN_KEY)}`
        }
      });
      const cities = await res.json();

      selectCity.innerHTML = '<option value="">-- Select City --</option>';
      cities.forEach(city => {
        const opt = document.createElement("option");
        opt.value = city;
        opt.textContent = city;
        selectCity.appendChild(opt);
      });
    } catch (err) {
      console.error(err);
    }
  }

  loadCities();

  // ----------------------------
  // Load places by selected city
  // ----------------------------
  selectCity?.addEventListener("change", async () => {
    const city = selectCity.value;
    if (!adminPlacesContainer) return;
    adminPlacesContainer.innerHTML = "";
    if (!city) return;

    try {
      const res = await fetch(`${API_BASE_URL}/places/${city}`, {
        headers: { "Authorization": `Bearer ${localStorage.getItem(ADMIN_TOKEN_KEY)}` }
      });
      const places = await res.json();

      places.forEach(place => {
        const div = document.createElement("div");
        div.className = "admin-place-card";
        div.innerHTML = `
       <img src="https://my-file-1-rjz1.onrender.com/uploads/${place.image}" alt="${place.name}" style="width:200px;height:120px;object-fit:cover;">
          <h3>${place.name}</h3>
          <p>${place.description}</p>
          <button data-id="${place._id}" class="deleteBtn">Delete</button>
        `;
        adminPlacesContainer.appendChild(div);
      });

      // Attach delete handlers
      adminPlacesContainer.querySelectorAll(".deleteBtn").forEach(btn => {
        btn.addEventListener("click", async () => {
          const id = btn.dataset.id;
          if (!confirm("Are you sure you want to delete this place?")) return;

          try {
            const res = await fetch(`${API_BASE_URL}/places/admin/places/${id}`, {
              method: "DELETE",
              headers: { "Authorization": `Bearer ${localStorage.getItem(ADMIN_TOKEN_KEY)}` }
            });
            const data = await res.json();
            alert(data.message || "Deleted");
            selectCity.dispatchEvent(new Event("change"));
          } catch (err) {
            console.error(err);
            alert("Error deleting place");
          }
        });
      });

    } catch (err) {
      console.error(err);
    }
  });

  // ----------------------------
  // Admin Logout
  // ----------------------------
  logoutBtn?.addEventListener("click", () => {
    localStorage.removeItem(ADMIN_TOKEN_KEY);
    window.location.href = "admin-login.html";
  });

});
