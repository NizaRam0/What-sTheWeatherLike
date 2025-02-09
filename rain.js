const rainContainer = document.querySelector(".rain");

    function createRain() {
        for (let i = 0; i < 100; i++) {
            let drop = document.createElement("div");
            drop.classList.add("drop");
            drop.style.left = Math.random() * 100 + "vw";
            drop.style.animationDuration = Math.random() * 0.5 + 0.5 + "s"; // Different speeds
            rainContainer.appendChild(drop);
        }
    }

    createRain();