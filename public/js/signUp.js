document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("signupForm");
  const errorEl = document.getElementById("error");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    errorEl.textContent = "";

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!name || !email || !password) {
      errorEl.textContent = "All fields are required.";
      return;
    }

    try {
      const res = await fetch("/auth/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        errorEl.textContent = data.error || "Signup failed";
        return;
      }

      // ✅ STORE TOKEN (learning approach)
      localStorage.setItem("token", data.data.token);

      console.log(data.data.token)

      // ✅ Redirect after signup
      window.location.href = "/";

    } catch (err) {
      // console.error(err);
      errorEl.textContent = "Something went wrong. Try again.";
    }
  });
});
