/* ========================================
   PROJECT NEXUS - MAIN JAVASCRIPT
======================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* ========================================
       SIDEBAR NAVIGATION
    ======================================== */

    const navLinks = document.querySelectorAll(
        ".sidebar-nav .nav-link"
    );

    navLinks.forEach(function (link) {
        link.addEventListener("click", function (event) {

            if (
                !this.getAttribute("href") ||
                this.getAttribute("href") === "#"
            ) {
                event.preventDefault();
            }

            navLinks.forEach(function (item) {
                item.classList.remove("active");
                item.removeAttribute("aria-current");
            });

            this.classList.add("active");
            this.setAttribute("aria-current", "page");
        });
    });


    /* ========================================
       LIGHT / DARK THEME SWITCHER
    ======================================== */

    const themeToggle = document.getElementById("theme-toggle");
    const html = document.documentElement;

    function setTheme(theme) {
        html.setAttribute("data-theme", theme);

        const isDark = theme === "dark";

        if (themeToggle) {
            themeToggle.setAttribute("aria-pressed", String(isDark));
            themeToggle.setAttribute(
                "aria-label",
                isDark ? "Switch to light theme" : "Switch to dark theme"
            );

            const icon = themeToggle.querySelector("span");

            if (icon) {
                icon.textContent = isDark ? "☀" : "☾";
            }
        }

        try {
            localStorage.setItem("nexus-theme", theme);
        } catch (error) {
            console.warn("Could not save the theme preference.");
        }
    }

    // Load the saved theme
    let savedTheme = "light";

    try {
        const storedTheme = localStorage.getItem("nexus-theme");

        if (storedTheme === "dark" || storedTheme === "light") {
            savedTheme = storedTheme;
        }
    } catch (error) {
        console.warn("Using the default light theme.");
    }

    setTheme(savedTheme);

    // Toggle between dark and light
    if (themeToggle) {
        themeToggle.addEventListener("click", function (event) {
            event.preventDefault();

            const currentTheme = html.getAttribute("data-theme");
            setTheme(currentTheme === "dark" ? "light" : "dark");
        });
    } else {
        console.error("Cannot find a button with id='theme-toggle'.");
    }

});