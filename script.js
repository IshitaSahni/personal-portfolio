
/* ==========================================
   ISHITA KAUR SAHNI — PERSONAL PORTFOLIO
   ========================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* ======================================
       1. MOBILE NAVIGATION
       ====================================== */

    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (menuToggle && navLinks) {

        menuToggle.setAttribute("aria-expanded", "false");

        menuToggle.addEventListener("click", function () {
            const isOpen = navLinks.classList.toggle("open");

            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );
        });

        // Close mobile menu after selecting a section.
        navLinks.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                navLinks.classList.remove("open");
                menuToggle.setAttribute("aria-expanded", "false");
            });
        });

        // Close menu when clicking outside the navigation.
        document.addEventListener("click", function (event) {
            if (
                !menuToggle.contains(event.target) &&
                !navLinks.contains(event.target)
            ) {
                navLinks.classList.remove("open");
                menuToggle.setAttribute("aria-expanded", "false");
            }
        });

        // Close menu using the Escape key.
        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape") {
                navLinks.classList.remove("open");
                menuToggle.setAttribute("aria-expanded", "false");
            }
        });
    }


    /* ======================================
       2. THE ISHITA ROUTE — VESPA JOURNEY
       ====================================== */

    const route = document.getElementById("ishitaRoute");
    const path = document.getElementById("routePath");
    const progressPath = document.getElementById("routeProgress");
    const scooter = document.getElementById("routeScooter");
    const label = document.getElementById("routeLabel");

    if (route && path && progressPath && scooter && label) {

        const track = route.querySelector(".route-track");

        const stops = [
            { id: "home", name: "HOME" },
            { id: "about", name: "ABOUT" },
            { id: "projects", name: "PROJECTS" },
            { id: "experience", name: "EXPERIENCE" },
            { id: "skills", name: "SKILLS" },
            { id: "beyond", name: "BEYOND" },
            { id: "contact", name: "CONTACT" }
        ];

        const pathLength = path.getTotalLength();

        progressPath.style.strokeDasharray = pathLength;
        progressPath.style.strokeDashoffset = pathLength;

        let frameRequested = false;

        function updateRoute() {

            /* Calculate overall scrolling progress */

            const maxScroll = Math.max(
                1,
                document.documentElement.scrollHeight -
                window.innerHeight
            );

            const progress = Math.min(
                1,
                Math.max(0, window.scrollY / maxScroll)
            );

            /* Find the Vespa's position on the road */

            const distance = pathLength * progress;
            const point = path.getPointAtLength(distance);

            if (track) {
                scooter.style.left =
                    (point.x / 100) * track.clientWidth + "px";

                scooter.style.top =
                    (point.y / 700) * track.clientHeight + "px";
            }

            /* Colour the part of the road already travelled */

            progressPath.style.strokeDashoffset =
                pathLength - distance;

            /* Detect which section is currently visible */

            let activeStop = 0;

            stops.forEach(function (stop, index) {
                const section = document.getElementById(stop.id);

                if (
                    section &&
                    section.getBoundingClientRect().top <=
                        window.innerHeight * 0.45
                ) {
                    activeStop = index;
                }
            });

            /* Update the current stop label */

            const stopNumber = String(
                activeStop + 1
            ).padStart(2, "0");

            label.textContent =
                `STOP ${stopNumber} / ${stops[activeStop].name}`;

            frameRequested = false;
        }

        /* Use requestAnimationFrame for smooth updates */

        function scheduleRouteUpdate() {
            if (frameRequested) {
                return;
            }

            frameRequested = true;

            window.requestAnimationFrame(updateRoute);
        }

        window.addEventListener(
            "scroll",
            scheduleRouteUpdate,
            { passive: true }
        );

        window.addEventListener(
            "resize",
            scheduleRouteUpdate
        );

        window.addEventListener(
            "load",
            scheduleRouteUpdate
        );

        /* Set correct position immediately */

        updateRoute();
    }


    /* ======================================
       3. INTERACTIVE CRICKET FILE
       ====================================== */

    const factToggle = document.querySelector(".fun-fact-toggle");
    const factAnswer = document.getElementById("ishitaFact");
    if (factToggle && factAnswer) {
        factToggle.addEventListener("click", function () {
            const expanded = factToggle.getAttribute("aria-expanded") === "true";
            factToggle.setAttribute("aria-expanded", String(!expanded));
            factAnswer.hidden = expanded;
            factToggle.textContent = expanded ? "✳ OPEN THE CRICKET FILE ↗" : "✳ CLOSE THE CRICKET FILE ×";
        });
    }

    /* ======================================
       4. SMOOTH NAVIGATION
       ====================================== */

    // Smooth scrolling is handled by CSS:
    // html { scroll-behavior: smooth; }

});
