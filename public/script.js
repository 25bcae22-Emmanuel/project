document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const button = form.querySelector("button");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
      alert("Please fill all fields ❗");
      return;
    }

    button.innerText = "Sending...";
    button.disabled = true;

    try {
      const res = await fetch("https://portfolio-nam0.onrender.com/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, message })
      });

      let data;
      try {
        data = await res.json();
      } catch {
        throw new Error("Invalid JSON response");
      }

      if (res.ok && data.success) {
        alert("Message sent successfully ✅");
        form.reset();
      } else {
        alert(data.error || "Something went wrong ❌");
      }

    } catch (err) {
      console.error(err);
      alert("Server not responding ❌");
    }

    button.innerText = "Send Message";
    button.disabled = false;
  });
});