document.addEventListener("click", async (e) => {
  if (!e.target.classList.contains("delete-btn")) return;

  const todoId = e.target.dataset.id;

  if (!confirm("Delete this task?")) return;

  try {
    const res = await fetch(`/todos/${todoId}`, {
      method: "DELETE",
      credentials: "include", // 🔥 sends cookie
    });

    if (!res.ok) {
      alert("Failed to delete");
      return;
    }

    // Remove card from UI
    e.target.closest(".todos-card").remove();
  } catch (err) {
    console.error(err);
  }
});
