// ================= SCROLL REVEAL =================
function reveal() {
  const reveals = document.querySelectorAll(".reveal");
  const windowHeight = window.innerHeight;
  const elementVisible = 120;

  reveals.forEach(el => {
    const elementTop = el.getBoundingClientRect().top;

    if (elementTop < windowHeight - elementVisible && elementTop > -el.offsetHeight) {
      el.classList.add("active");
    } else {
      el.classList.remove("active");
    }
  });
}

window.addEventListener("scroll", reveal);
window.addEventListener("load", reveal);


// ================= CONTACT FORM =================
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  if (!form) {
    console.warn("Contact form not found");
    return;
  }

  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");
  const sendButton = form.querySelector("button");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    // ---------- VALIDATION ----------
    if (!name || !email || !message) {
      alert("Please fill all fields ❗");
      return;
    }

    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,}$/i;
    if (!emailPattern.test(email)) {
      alert("Enter a valid email ❗");
      return;
    }

    // ---------- BUTTON LOADING ----------
    sendButton.innerText = "Sending...";
    sendButton.disabled = true;

    try {
      // ✅ CHANGE THIS URL TO YOUR RENDER BACKEND
      const res = await fetch("https://portfolio-nam0.onrender.com/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, message })
      });

      const data = await res.json();
      console.log("Backend Response:", data);

      if (res.ok && data.success) {
        alert("Message sent successfully ✅");
        form.reset();
      } else {
        alert(data.error || "Failed to send message ❌");
      }

    } catch (err) {
      console.error("Fetch error:", err);
      alert("Server not responding ❌");
    }

    // Reset button
    sendButton.innerText = "Send Message";
    sendButton.disabled = false;
  });
});