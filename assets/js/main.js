// /* =========================
//    MAIN.JS
//    HAM Software Solutions
// ========================= */

// document.addEventListener("DOMContentLoaded", () => {

//   /* =========================
//      1. NAVBAR ACTIVE LINK
//   ========================= */
//   const currentPage = window.location.pathname.split("/").pop() || "index.html";

//   document.querySelectorAll(".nav-link").forEach(link => {
//     const linkPage = link.getAttribute("href");
//     if (linkPage === currentPage) {
//       link.classList.add("active");
//     }
//   });


//   /* =========================
//      2. AUTO CLOSE MOBILE NAVBAR
//   ========================= */
//   const navbarCollapse = document.querySelector(".navbar-collapse");

//   if (navbarCollapse && typeof bootstrap !== "undefined") {
//     document.querySelectorAll(".navbar-nav .nav-link").forEach(link => {
//       link.addEventListener("click", () => {
//         if (navbarCollapse.classList.contains("show")) {
//           new bootstrap.Collapse(navbarCollapse).hide();
//         }
//       });
//     });
//   }


//   /* =========================
//      3. SMOOTH SCROLL
//   ========================= */
//   document.querySelectorAll('a[href^="#"]').forEach(anchor => {
//     anchor.addEventListener("click", function (e) {
//       const target = document.querySelector(this.getAttribute("href"));
//       if (target) {
//         e.preventDefault();
//         target.scrollIntoView({ behavior: "smooth" });
//       }
//     });
//   });


//   /* =========================
//      4. SCROLL ANIMATIONS
//   ========================= */
//   const animatedElements = document.querySelectorAll(
//     ".service-card, .card, .why-us li, .cta, footer"
//   );

//   if ("IntersectionObserver" in window) {
//     const observer = new IntersectionObserver(entries => {
//       entries.forEach(entry => {
//         if (entry.isIntersecting) {
//           entry.target.classList.add("show");
//         }
//       });
//     }, { threshold: 0.2 });

//     animatedElements.forEach(el => observer.observe(el));
//   } else {
//     animatedElements.forEach(el => el.classList.add("show"));
//   }


//   /* =========================
//      5. CONTACT FORM (BACKEND + WHATSAPP)
//   ========================= */
//   const contactForm = document.querySelector("#contactForm");

//   if (contactForm) {
//     contactForm.addEventListener("submit", async (e) => {
//       e.preventDefault();

//       const name = document.getElementById("name")?.value.trim();
//       const email = document.getElementById("email")?.value.trim();
//       const subject = document.getElementById("subject")?.value.trim();
//       const message = document.getElementById("message")?.value.trim();

//       if (!name || !email || !message) {
//         alert("Please fill all required fields.");
//         return;
//       }

//       try {
//         // ================= SEND TO BACKEND =================
//         const response = await fetch("http://localhost:5000/api/contact", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json"
//           },
//           body: JSON.stringify({ name, email, subject, message })
//         });

//         const result = await response.json();

//         if (result.success) {
//           alert("Message sent successfully!");

//           // ================= OPTIONAL WHATSAPP =================
//           const phone = "923172428287";
//           const text = encodeURIComponent(
//             `Hello HAM Software Solutions,
// Name: ${name}
// Email: ${email}
// Subject: ${subject}
// Message: ${message}`
//           );

//           window.open(`https://wa.me/${phone}?text=${text}`, "_blank");

//           contactForm.reset();
//         } else {
//           alert(result.msg || "Something went wrong.");
//         }

//       } catch (error) {
//         console.error(error);
//         alert("Server error. Please try again later.");
//       }
//     });
//   }

// });


/* =========================
   MAIN.JS - HAM Software Solutions
   Backend: https://hamsoftwaresolution-backend.onrender.com
========================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     BACKEND API URL
  ========================= */
  const API_URL = 'https://hamsoftwaresolution-backend.onrender.com/api';
  const WHATSAPP_PHONE = '923172428287';

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

  if (navbarCollapse && typeof bootstrap !== "") {
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
     5. WHATSAPP LEAD FORM (NEW - Backend + WhatsApp)
  ========================= */
  function initWhatsAppForms() {
    // WhatsApp Lead Forms
    const whatsappForms = document.querySelectorAll('#whatsappForm, #leadForm, [data-whatsapp-form]');
    
    whatsappForms.forEach(form => {
      form.addEventListener("submit", async (e) => {
        e.preventDefault();
        
        const phone = document.getElementById("phone")?.value || 
                      form.querySelector('input[name="phone"]')?.value ||
                      form.querySelector('input[type="tel"]')?.value;
        
        const message = document.getElementById("message")?.value || 
                       form.querySelector('textarea[name="message"]')?.value ||
                       'WhatsApp Marketing Lead';
        
        const statusEl = form.querySelector('.status, #status');
        
        if (!phone) {
          alert("Phone number required!");
          return;
        }
        
        if (statusEl) statusEl.textContent = 'Sending to Backend...';
        
        try {
          // 🚀 STEP 1: Backend API Call
          const backendResponse = await fetch(`${API_URL}/send-whatsapp`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ phone, message })
          });
          
          const backendData = await backendResponse.json();
          
          if (backendData.success) {
            if (statusEl) {
              statusEl.innerHTML = '✅ Backend Saved! Opening WhatsApp...';
              statusEl.style.color = 'green';
            }
            
            // 🚀 STEP 2: WhatsApp Direct
            const whatsappText = encodeURIComponent(
              `New Lead from Website!\n\n` +
              `Phone: ${phone}\n` +
              `Message: ${message}`
            );
            
            window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${whatsappText}`, "_blank");
            
            // Reset form
            form.reset();
            setTimeout(() => {
              if (statusEl) statusEl.textContent = '';
            }, 3000);
            
          } else {
            throw new Error(backendData.error || 'Backend error');
          }
          
        } catch (error) {
          console.error('Connection Error:', error);
          if (statusEl) {
            statusEl.innerHTML = '❌ Backend Error. Direct WhatsApp?';
            statusEl.style.color = 'red';
          }
          
          // Fallback: Direct WhatsApp
          const fallbackText = encodeURIComponent(`Phone: ${phone}\nMessage: ${message}`);
          window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${fallbackText}`, "_blank");
        }
      });
    });
  }

  /* =========================
     6. CONTACT FORM (Existing - Backend Production URL)
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
        // Backend Production URL (localhost nahi!)
        const response = await fetch(`${API_URL}/contact`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, subject, message })
        });

        const result = await response.json();

        if (result.success) {
          alert("✅ Message sent to Backend + WhatsApp!");
          
          // WhatsApp notification
          const whatsappText = encodeURIComponent(
            `New Contact Form!\n\n` +
            `Name: ${name}\n` +
            `Email: ${email}\n` +
            `Subject: ${subject}\n` +
            `Message: ${message}`
          );
          window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${whatsappText}`, "_blank");
          
          contactForm.reset();
        } else {
          alert(result.msg || "Backend error.");
        }
      } catch (error) {
        console.error(error);
        alert("Backend error. WhatsApp direct?");
        // Fallback WhatsApp
        window.open(`https://wa.me/${WHATSAPP_PHONE}`, "_blank");
      }
    });
  }

  /* =========================
     7. BACKEND CONNECTION TEST
  ========================= */
  async function testBackend() {
    try {
      const response = await fetch(`${API_URL}/health`);
      const data = await response.json();
      console.log('✅ Backend Live:', data);
      
      // Status badge
      const badge = document.createElement('div');
      badge.style.cssText = `
        position:fixed; top:10px; right:10px; 
        background:#10b981; color:white; padding:8px 12px; 
        border-radius:20px; font-size:12px; font-weight:600;
        z-index:9999; box-shadow:0 4px 12px rgba(0,0,0,0.2);
      `;
      badge.innerHTML = `Backend: ${data.status}`;
      document.body.appendChild(badge);
    } catch (error) {
      console.error('Backend Offline');
    }
  }

  // Initialize everything
  initWhatsAppForms();
  testBackend();

});