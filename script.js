// ================================
// MOBILE NAVIGATION
// ================================

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");

    const isOpen = navLinks.classList.contains("active");

    menuToggle.setAttribute("aria-expanded", isOpen);

    menuToggle.innerHTML = isOpen
        ? '<i class="fas fa-times"></i>'
        : '<i class="fas fa-bars"></i>';
});


// Close the mobile menu when a navigation link is clicked

const navItems = document.querySelectorAll(".nav-links a");

navItems.forEach((item) => {
    item.addEventListener("click", () => {
        navLinks.classList.remove("active");

        menuToggle.setAttribute("aria-expanded", "false");

        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Smooth navigation with sticky navbar offset

const nav = document.querySelector("nav");
const navLinks = document.querySelectorAll(".nav-links a");

navLinks.forEach(link => {
    link.addEventListener("click", function (event) {
        event.preventDefault();

        const targetId = this.getAttribute("href");
        const targetSection = document.querySelector(targetId);

        if (!targetSection) {
            return;
        }

        const navHeight = nav.offsetHeight;
        const extraSpace = 20;

        const targetPosition =
            targetSection.getBoundingClientRect().top +
            window.scrollY -
            navHeight -
            extraSpace;

        window.scrollTo({
            top: targetPosition,
            behavior: "smooth"
        });

        // Close mobile menu after clicking a link
        const menuToggle = document.querySelector(".menu-toggle");
        const navLinksContainer = document.querySelector(".nav-links");

        if (window.innerWidth <= 768) {
            navLinksContainer.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
        }
    });
});


// ================================
// CONTACT FORM VALIDATION
// ================================

const contactForm = document.querySelector("#contact form");

contactForm.addEventListener("submit", (event) => {
    const name = document.querySelector("#name");
    const email = document.querySelector("#email");
    const message = document.querySelector("#message");

    let isValid = true;

    // Remove previous error messages
    document.querySelectorAll(".form-error").forEach((error) => {
        error.remove();
    });

    // Validate name
    if (name.value.trim() === "") {
        showError(name, "Please enter your name.");
        isValid = false;
    }

    // Validate email
    if (email.value.trim() === "") {
        showError(email, "Please enter your email address.");
        isValid = false;
    } else if (!isValidEmail(email.value.trim())) {
        showError(email, "Please enter a valid email address.");
        isValid = false;
    }

    // Validate message
    if (message.value.trim() === "") {
        showError(message, "Please enter a message.");
        isValid = false;
    }

    // Stop the form from submitting if validation fails
    if (!isValid) {
        event.preventDefault();
    }
});


// ================================
// FORM VALIDATION FUNCTIONS
// ================================

function showError(input, message) {
    const error = document.createElement("p");

    error.className = "form-error";
    error.textContent = message;

    input.insertAdjacentElement("afterend", error);
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}