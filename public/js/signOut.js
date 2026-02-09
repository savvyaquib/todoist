document.getElementById("logout").addEventListener("click", async (e) => {
  e.preventDefault(); // stop normal navigation

  await fetch("/auth/sign-out", {
    method: "POST",
    credentials: "include",
  });

  window.location.href = "/auth/sign-in";
});
