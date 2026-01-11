document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".todo-checkbox").forEach(checkbox => {
    checkbox.addEventListener("change", async function () {
      const todoId = this.dataset.id;

      await fetch(`/todos/${todoId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          completed: this.checked
        })
      });
    });
  });
});