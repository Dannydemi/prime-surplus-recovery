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
            name: form.querySelectorAll('input')[0].value,
            email: form.querySelectorAll('input')[1].value,
            phone: form.querySelectorAll('input')[2].value,
            message: form.querySelector('textarea').value
        };

        try {
            await fetch("https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec", {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            alert("✅ Submitted successfully! We'll contact you within 24 hours.");
            form.reset();

        } catch (error) {
            alert("❌ Something went wrong. Please try again.");
            console.error(error);
        }
    });
}
