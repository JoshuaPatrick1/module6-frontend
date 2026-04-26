document.getElementById("load").addEventListener("click", async () => {
  const res = await fetch("YOUR_BACKEND_URL/api/items");
  const data = await res.json();
  document.getElementById("output").textContent = JSON.stringify(data, null, 2);
});
