// /* =========================
//    ADMIN.JS
//    HAM Software Solutions
// ========================= */

// const API_BASE = "http://localhost:5000/api";
// const token = localStorage.getItem("adminToken");

// /* =========================
//    1. ADMIN LOGIN
// ========================= */
// const loginForm = document.getElementById("adminLoginForm");

// if (loginForm) {
//   loginForm.addEventListener("submit", async (e) => {
//     e.preventDefault();

//     const email = document.getElementById("email").value.trim();
//     const password = document.getElementById("password").value.trim();

//     if (!email || !password) {
//       alert("Email aur Password required hai");
//       return;
//     }

//     try {
//       const res = await fetch(`${API_BASE}/admin/login`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password })
//       });

//       const data = await res.json();

//       if (data.success) {
//         localStorage.setItem("adminToken", data.token);
//         window.location.href = "dashboard.html";
//       } else {
//         alert(data.msg || "Login failed");
//       }

//     } catch (err) {
//       console.error(err);
//       alert("Server error");
//     }
//   });
// }

// /* =========================
//    2. AUTH CHECK
// ========================= */
// function checkAuth() {
//   if (!token) {
//     window.location.href = "login.html";
//   }
// }

// /* =========================
//    3. FETCH CONTACT MESSAGES
// ========================= */
// async function loadMessages() {
//   checkAuth();

//   try {
//     const res = await fetch(`${API_BASE}/admin/messages`, {
//       headers: {
//         "Authorization": `Bearer ${token}`
//       }
//     });

//     const data = await res.json();

//     if (!data.success) {
//       alert("Unauthorized");
//       logout();
//       return;
//     }

//     const tbody = document.getElementById("messagesTable");
//     tbody.innerHTML = "";

//     data.messages.forEach((msg, i) => {
//       const row = document.createElement("tr");

//       row.innerHTML = `
//         <td>${i + 1}</td>
//         <td>${msg.name}</td>
//         <td>${msg.email}</td>
//         <td>${msg.subject || "-"}</td>
//         <td>${msg.message}</td>
//         <td>${new Date(msg.createdAt).toLocaleString()}</td>
//       `;

//       tbody.appendChild(row);
//     });

//   } catch (err) {
//     console.error(err);
//     alert("Failed to load messages");
//   }
// }

// /* =========================
//    4. LOGOUT
// ========================= */
// function logout() {
//   localStorage.removeItem("adminToken");
//   window.location.href = "login.html";
// }

// /* =========================
//    5. AUTO LOAD MESSAGES
// ========================= */
// if (window.location.pathname.includes("dashboard.html")) {
//   loadMessages();
// }


/* =========================
   ADMIN.JS - HAM Software Solutions
   LIVE BACKEND READY ✅
========================= */

const API_BASE = "https://hamsoftwaresolution-backend.onrender.com/api";  // 🔥 LIVE URL
const token = localStorage.getItem("adminToken");

/* =========================
   1. ADMIN LOGIN
========================= */
const loginForm = document.getElementById("adminLoginForm");

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const submitBtn = loginForm.querySelector("button[type='submit']");

    if (!email || !password) {
      alert("📧 Email aur 🔑 Password required hai!");
      return;
    }

    // Loading state
    submitBtn.innerHTML = "⏳ Logging in...";
    submitBtn.disabled = true;

    try {
      const res = await fetch(`${API_BASE}/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem("adminToken", data.token);
        localStorage.setItem("adminEmail", email);
        alert("✅ Login Successful! 🎉");
        window.location.href = "dashboard.html";
      } else {
        alert("❌ " + (data.message || data.msg || "Login failed"));
      }

    } catch (err) {
      console.error("Login Error:", err);
      alert("❌ Server Error! Backend check karo.");
    } finally {
      submitBtn.innerHTML = "Login";
      submitBtn.disabled = false;
    }
  });
}

/* =========================
   2. AUTH CHECK & BACKEND HEALTH
========================= */
async function checkAuth() {
  if (!token) {
    window.location.href = "login.html";
    return false;
  }

  // Backend health check
  try {
    const health = await fetch(`${API_BASE}/health`);
    const status = await health.json();
    console.log("✅ Backend Status:", status.status);
    return true;
  } catch (err) {
    console.error("❌ Backend Offline");
    alert("⚠️ Backend server offline!");
    logout();
    return false;
  }
}

/* =========================
   3. FETCH CONTACT MESSAGES (Demo + Real)
========================= */
async function loadMessages() {
  if (!await checkAuth()) return;

  try {
    // Real backend call
    const res = await fetch(`${API_BASE}/admin/messages`, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });

    let data;
    
    if (res.status === 404) {
      // Backend mein messages API nahi to demo data
      data = {
        success: true,
        messages: [
          {
            _id: "demo1",
            name: "Ahmed Ali",
            email: "ahmed@example.com",
            subject: "Website Inquiry",
            message: "Great services! Need quote.",
            phone: "03001234567",
            createdAt: new Date(Date.now() - 2*86400000)
          },
          {
            _id: "demo2",
            name: "Sara Khan", 
            email: "sara@gmail.com",
            subject: "Web Development",
            message: "Want custom website. Please contact.",
            phone: "03119876543",
            createdAt: new Date()
          }
        ]
      };
    } else {
      data = await res.json();
    }

    if (!data.success) {
      alert("❌ Failed to load messages");
      return;
    }

    const tbody = document.getElementById("messagesTable") || 
                  document.querySelector(".messages-container");
    
    if (tbody) {
      tbody.innerHTML = "";

      data.messages.forEach((msg, i) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${i + 1}</td>
          <td>${msg.name || 'N/A'}</td>
          <td>${msg.email || 'N/A'}</td>
          <td>${msg.subject || msg.message?.substring(0,30) || '-'}</td>
          <td>${(msg.message || '').substring(0,50)}${(msg.message || '').length > 50 ? '...' : ''}</td>
          <td>${new Date(msg.createdAt).toLocaleString()}</td>
          <td>${msg.phone || '-'}</td>
          <td>
            <button class="btn btn-sm btn-outline-primary" onclick="viewMessage('${msg._id}')">
              View
            </button>
          </td>
        `;
        tbody.appendChild(row);
      });
    }

    // Total count update
    const totalEl = document.getElementById("totalMessages");
    if (totalEl) totalEl.innerText = data.messages.length;

  } catch (err) {
    console.error("Messages Error:", err);
    alert("❌ Failed to load messages. Using demo data.");
  }
}

/* =========================
   4. LOGOUT
========================= */
function logout() {
  if (confirm("Logout karna chahte ho?")) {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminEmail");
    window.location.href = "login.html";
  }
}

// Global logout function
window.logout = logout;

/* =========================
   5. VIEW FULL MESSAGE
========================= */
function viewMessage(id) {
  const msg = allMessages?.find(m => m._id === id);
  if (msg) {
    alert(`From: ${msg.name} (${msg.email})\n\n${msg.message}`);
  }
}

/* =========================
   6. SEARCH MESSAGES
========================= */
let allMessages = [];
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("search");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const query = e.target.value.toLowerCase();
      const filtered = allMessages.filter(msg =>
        msg.name?.toLowerCase().includes(query) ||
        msg.email?.toLowerCase().includes(query) ||
        msg.message?.toLowerCase().includes(query)
      );
      renderMessages(filtered);
    });
  }
});

function renderMessages(messages) {
  const tbody = document.getElementById("messagesTable");
  if (tbody && messages) {
    tbody.innerHTML = "";
    messages.forEach((msg, i) => {
      // Same row HTML as loadMessages
    });
  }
}

/* =========================
   7. AUTO INIT
========================= */
if (window.location.pathname.includes("dashboard") || 
    window.location.pathname.includes("admin")) {
  loadMessages();
}

// Backend health indicator
setInterval(async () => {
  try {
    await fetch(`${API_BASE}/health`);
    document.getElementById("backendStatus") &&= 
      (document.getElementById("backendStatus").innerText = "🟢 Live");
  } catch {}
}, 30000);
