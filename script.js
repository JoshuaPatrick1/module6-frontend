// Redirect if not logged in
if (!localStorage.getItem("token")) {
  window.location.href = "login.html";
}

// Hide teacher-only button
if (localStorage.getItem("role") !== "teacher") {
  const btn = document.getElementById("addItemBtn");
  if (btn) btn.style.display = "none";
}

// Load items
document.getElementById("load").addEventListener("click", loadItems);

async function loadItems() {
  const res = await fetch("YOUR_BACKEND_URL/api/items", {
    headers: {
      "Authorization": "Bearer " + localStorage.getItem("token")
    }
  });

  const data = await res.json();
  document.getElementById("output").textContent = JSON.stringify(data, null, 2);
}

// Add item (teacher only)
document.getElementById("addItemBtn").addEventListener("click", addItem);

async function addItem() {
  const name = prompt("Item name:");
  if (!name) return;

  await fetch("YOUR_BACKEND_URL/api/items", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem("token")
    },
    body: JSON.stringify({ name })
  });

  loadItems();
}

// Logout
function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  window.location.href = "login.html";
}
