
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

/* ==========================================
   THE ISHITA SCOREBOARD — ANIMATED COUNTERS
========================================== */

document.addEventListener("DOMContentLoaded", () => {
    const scoreboard = document.querySelector("#scoreboard");
    const counters = document.querySelectorAll(
        "#scoreboard .scoreboard-value[data-target]"
    );

    if (!scoreboard || counters.length === 0) return;

    let hasAnimated = false;

    const animateCounter = (counter) => {
        const target = Number(counter.dataset.target);
        const duration = 1200;
        const startTime = performance.now();

        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            const eased = 1 - Math.pow(1 - progress, 3);
            counter.textContent = Math.round(target * eased);

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        }

        requestAnimationFrame(updateCounter);
    };

    if (!("IntersectionObserver" in window)) {
        counters.forEach(counter => {
            counter.textContent = counter.dataset.target;
        });
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;

                if (window.matchMedia(
                    "(prefers-reduced-motion: reduce)"
                ).matches) {
                    counters.forEach(counter => {
                        counter.textContent = counter.dataset.target;
                    });
                } else {
                    counters.forEach(animateCounter);
                }

                observer.disconnect();
            }
        });
    }, {
        threshold: 0.25
    });

    observer.observe(scoreboard);
});

/* ==========================================
   ISHITA FM — VINYL PLAY / PAUSE
========================================== */

document.addEventListener("DOMContentLoaded", () => {
    const fm = document.querySelector(".ishita-fm");
    const vinyl = document.getElementById("fmVinyl");
    const button = document.getElementById("fmPlayButton");
    const status = document.getElementById("fmStatus");

    if (!fm || !vinyl || !button || !status) return;

    // Respect visitors who prefer reduced motion.
    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    let isPlaying = !reducedMotion;

    function updatePlayer() {
        vinyl.classList.toggle("paused", !isPlaying);
        fm.classList.toggle("is-paused", !isPlaying);

        button.textContent = isPlaying ? "❚❚" : "▶";
        button.setAttribute(
            "aria-label",
            isPlaying
                ? "Pause vinyl animation"
                : "Play vinyl animation"
        );
        button.setAttribute("aria-pressed", String(isPlaying));

        status.textContent = isPlaying
            ? "VINYL SPINNING"
            : "VINYL PAUSED";
    }

    button.addEventListener("click", () => {
        isPlaying = !isPlaying;
        updatePlayer();
    });

    updatePlayer();
});

/* ==========================================
   THE DETOUR DIARIES — FLIP INTERACTION
========================================== */

document.addEventListener("DOMContentLoaded", () => {
    const postcards = document.querySelectorAll(".detour-card");

    postcards.forEach((postcard) => {
        postcard.addEventListener("click", () => {
            const isFlipped = postcard.classList.toggle("is-flipped");

            postcard.setAttribute(
                "aria-pressed",
                String(isFlipped)
            );

            postcard.setAttribute(
                "aria-label",
                isFlipped
                    ? "Flip postcard back to the front"
                    : "Flip postcard to read the message"
            );
        });
    });
});

/* ==========================================
   SECRET CRICKET — SIX-HIT CHALLENGE
========================================== */

document.addEventListener("DOMContentLoaded", () => {
    const trigger = document.getElementById("cricketSecretTrigger");
    const overlay = document.getElementById("cricketGameOverlay");
    const close = document.getElementById("cricketGameClose");
    const dialog = overlay?.querySelector(".cricket-game");

    const runsDisplay = document.getElementById("cricketRuns");
    const ballsDisplay = document.getElementById("cricketBalls");
    const bestDisplay = document.getElementById("cricketBest");
    const message = document.getElementById("cricketGameMessage");
    const ball = document.getElementById("cricketGameBall");

    const swingButton = document.getElementById("cricketSwingButton");
    const restartButton = document.getElementById("cricketRestartButton");

    if (
        !trigger || !overlay || !close || !dialog ||
        !runsDisplay || !ballsDisplay || !bestDisplay ||
        !message || !ball || !swingButton || !restartButton
    ) return;

    let runs = 0;
    let ballsLeft = 3;
    let best = 0;
    let previousFocus = null;

    const shots = [
        { runs: 0, message: "Dot ball! The bowler wins this one." },
        { runs: 1, message: "Quick single! Every run counts." },
        { runs: 2, message: "Nice running! That's two." },
        { runs: 4, message: "FOUR! Straight to the boundary!" },
        { runs: 6, message: "SIX! OUT OF THE PARK! 🔥" }
    ];

    function updateStats() {
        runsDisplay.textContent = runs;
        ballsDisplay.textContent = ballsLeft;
        bestDisplay.textContent = best;
    }

    function resetGame() {
        runs = 0;
        ballsLeft = 3;
        message.textContent = "Ready to face the first ball?";
        swingButton.disabled = false;
        swingButton.hidden = false;
        restartButton.hidden = true;
        updateStats();
    }

    function openGame() {
        previousFocus = document.activeElement;
        resetGame();
        overlay.hidden = false;
        document.body.style.overflow = "hidden";
        close.focus();
    }

    function closeGame() {
        overlay.hidden = true;
        document.body.style.overflow = "";
        if (previousFocus instanceof HTMLElement) {
            previousFocus.focus();
        }
    }

    function swing() {
        if (ballsLeft <= 0) return;

        const shot = shots[Math.floor(Math.random() * shots.length)];

        runs += shot.runs;
        ballsLeft--;

        if (runs > best) best = runs;

        message.textContent = shot.message;
        updateStats();

        ball.classList.remove("swinging");
        void ball.offsetWidth;
        ball.classList.add("swinging");

        if (ballsLeft === 0) {
            message.textContent =
                `INNINGS OVER! You scored ${runs} runs from 3 balls.`;

            swingButton.hidden = true;
            restartButton.hidden = false;
        }
    }

    trigger.addEventListener("click", openGame);
    close.addEventListener("click", closeGame);
    swingButton.addEventListener("click", swing);
    restartButton.addEventListener("click", resetGame);

    overlay.addEventListener("click", (event) => {
        if (event.target === overlay) closeGame();
    });

    document.addEventListener("keydown", (event) => {
        if (overlay.hidden) return;

        if (event.key === "Escape") {
            closeGame();
            return;
        }

        if (event.key === "Tab") {
            const focusable = Array.from(
                dialog.querySelectorAll(
                    'button:not([disabled]):not([hidden])'
                )
            );

            const first = focusable[0];
            const last = focusable[focusable.length - 1];

            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        }
    });

    updateStats();
});