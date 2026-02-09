const form = document.getElementById("loginForm");
const errorEl = document.getElementById("error");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  errorEl.textContent = "";

  try {
    const res = await fetch("/auth/sign-in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      errorEl.textContent = data.message || "Login failed";
      return;
    }

    // save token
    localStorage.setItem("token", data.data.token);

    // redirect
    window.location.href = "/";
  } catch (error) {
    errorEl.textContent = "Sorry, email or password is wrong";
  }

});
