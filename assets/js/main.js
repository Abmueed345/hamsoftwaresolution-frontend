/* =========================
   MAIN.JS
   HAM Software Solutions
========================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     1. NAVBAR ACTIVE LINK
  ========================= */
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  document.querySelectorAll(".nav-link").forEach(link => {
    const linkPage = link.getAttribute("href");
    if (linkPage === currentPage) {
      link.classList.add("active");
    }
  });


  /* =========================
     2. AUTO CLOSE MOBILE NAVBAR
  ========================= */
  const navbarCollapse = document.querySelector(".navbar-collapse");

  if (navbarCollapse && typeof bootstrap !== "undefined") {
    document.querySelectorAll(".navbar-nav .nav-link").forEach(link => {
      link.addEventListener("click", () => {
        if (navbarCollapse.classList.contains("show")) {
          new bootstrap.Collapse(navbarCollapse).hide();
        }
      });
    });
  }


  /* =========================
     3. SMOOTH SCROLL
  ========================= */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });


  /* =========================
     4. SCROLL ANIMATIONS
  ========================= */
  const animatedElements = document.querySelectorAll(
    ".service-card, .card, .why-us li, .cta, footer"
  );

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    }, { threshold: 0.2 });

    animatedElements.forEach(el => observer.observe(el));
  } else {
    animatedElements.forEach(el => el.classList.add("show"));
  }


  /* =========================
     5. CONTACT FORM (BACKEND + WHATSAPP)
  ========================= */
  const contactForm = document.querySelector("#contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const name = document.getElementById("name")?.value.trim();
      const email = document.getElementById("email")?.value.trim();
      const subject = document.getElementById("subject")?.value.trim();
      const message = document.getElementById("message")?.value.trim();

      if (!name || !email || !message) {
        alert("Please fill all required fields.");
        return;
      }

      try {
        // ================= SEND TO BACKEND =================
        const response = await fetch("http://localhost:5000/api/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ name, email, subject, message })
        });

        const result = await response.json();

        if (result.success) {
          alert("Message sent successfully!");

          // ================= OPTIONAL WHATSAPP =================
          const phone = "923172428287";
          const text = encodeURIComponent(
            `Hello HAM Software Solutions,
Name: ${name}
Email: ${email}
Subject: ${subject}
Message: ${message}`
          );

          window.open(`https://wa.me/${phone}?text=${text}`, "_blank");

          contactForm.reset();
        } else {
          alert(result.msg || "Something went wrong.");
        }

      } catch (error) {
        console.error(error);
        alert("Server error. Please try again later.");
      }
    });
  }

});
