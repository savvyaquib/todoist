document.addEventListener("click", async (e) => {
  if (!e.target.classList.contains("edit-btn")) return;

  const todoId = e.target.dataset.id;
  const card = e.target.closest(".todo-card");

  const currentTask = card.querySelector(".task").innerText;
  console.log(currentTask)
  const newTask = prompt("Edit task", currentTask);

  if (!newTask || newTask.trim() === "") return;

  try {
    const res = await fetch(`/edit-todo/${todoId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // 🔥 cookie auth
      body: JSON.stringify({
        task: newTask,
      }),
    });

    if (!res.ok) {
      alert("Failed to update");
      return;
    }

    // Update UI
    card.querySelector(".task").innerText = newTask;
  } catch (err) {
    console.error(err);
  }
});
