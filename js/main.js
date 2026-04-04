const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll(".fade-in, .step-card").forEach(el => {
    observer.observe(el);
});

document.querySelectorAll(".faq-question").forEach(btn => {
    btn.addEventListener("click", () => {
        const item = btn.parentElement;

        item.classList.toggle("active");
    });
});

// ================= FORM SUBMISSION =================
const form = document.getElementById("contactForm");

if (form) {
    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        const data = {
            name: form.querySelector('[name="name"]').value,
            email: form.querySelector('[name="email"]').value,
            phone: form.querySelector('[name="phone"]').value,
            message: form.querySelector('[name="message"]').value,

            // ✅ NEW FIELDS
            claimAmount: form.querySelector('[name="claimAmount"]').value,
            state: form.querySelector('[name="state"]').value
        };

        try {
            await fetch("https://script.google.com/macros/s/AKfycbxEBZ8N1PHs13v3EQnhJ2A_Atzqr2zngfttsLRzIo6aNduM9OMRe1Q2DUfJQwqXNyTJ0w/exec", {
                method: "POST",
                mode: "no-cors", // ✅ KEEP THIS
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            // ✅ ALWAYS SUCCESS (because no-cors)
            alert("✅ Submitted successfully! We'll contact you within 24 hours.");
            form.reset();

        } catch (error) {
            alert("❌ Something went wrong. Please try again.");
            console.error(error);
        }
    });
}
