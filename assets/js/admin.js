/* =========================
   ADMIN.JS
   HAM Software Solutions
========================= */

const API_BASE = "http://localhost:5000/api";
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

    if (!email || !password) {
      alert("Email aur Password required hai");
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem("adminToken", data.token);
        window.location.href = "dashboard.html";
      } else {
        alert(data.msg || "Login failed");
      }

    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  });
}

/* =========================
   2. AUTH CHECK
========================= */
function checkAuth() {
  if (!token) {
    window.location.href = "login.html";
  }
}

/* =========================
   3. FETCH CONTACT MESSAGES
========================= */
async function loadMessages() {
  checkAuth();

  try {
    const res = await fetch(`${API_BASE}/admin/messages`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    const data = await res.json();

    if (!data.success) {
      alert("Unauthorized");
      logout();
      return;
    }

    const tbody = document.getElementById("messagesTable");
    tbody.innerHTML = "";

    data.messages.forEach((msg, i) => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${i + 1}</td>
        <td>${msg.name}</td>
        <td>${msg.email}</td>
        <td>${msg.subject || "-"}</td>
        <td>${msg.message}</td>
        <td>${new Date(msg.createdAt).toLocaleString()}</td>
      `;

      tbody.appendChild(row);
    });

  } catch (err) {
    console.error(err);
    alert("Failed to load messages");
  }
}

/* =========================
   4. LOGOUT
========================= */
function logout() {
  localStorage.removeItem("adminToken");
  window.location.href = "login.html";
}

/* =========================
   5. AUTO LOAD MESSAGES
========================= */
if (window.location.pathname.includes("dashboard.html")) {
  loadMessages();
}
