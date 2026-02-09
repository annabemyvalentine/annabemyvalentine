// Handle Yes button click
document.getElementById("yes-button").addEventListener("click", function() {
    document.querySelector(".container").style.display = "none";
    document.getElementById("celebration").style.display = "block";
    hideButtons(); // Hide all buttons when celebration page is shown
});

// Handle No button hover (random movement)
document.getElementById("no-button").addEventListener("mouseover", function() {
    // Reset the transform property before applying new random movement
    this.style.transform = 'none'; // Resets any previous transform

    const randomX = Math.floor(Math.random() * 100) - 100; // Random move in the x-direction (75px)
    const randomY = Math.floor(Math.random() * 100) - 100; // Random move in the y-direction (75px)

    // Apply the new random transformation
    this.style.transform = `translate(${randomX}px, ${randomY}px)`;
});

// Handle No button click (create 5-10 new Yes buttons at random positions)
document.getElementById("no-button").addEventListener("click", function() {
    // Hide the No button after it is clicked
    this.style.display = "none";

    // Create between 5 and 10 new Yes buttons
    const numberOfButtons = Math.floor(Math.random() * 20) + 20; // 5-10 buttons
    for (let i = 0; i < numberOfButtons; i++) {
        const newYesButton = document.createElement("button");
        newYesButton.textContent = "Yes";
        newYesButton.classList.add("yes-button");

        // Set the random position of the new Yes button
        const randomX = Math.random() * window.innerWidth - 100; // Random x position
        const randomY = Math.random() * window.innerHeight - 50; // Random y position
        newYesButton.style.position = "absolute";
        newYesButton.style.left = `${randomX}px`;
        newYesButton.style.top = `${randomY}px`;

        // Add the new Yes button to the body
        document.body.appendChild(newYesButton);

        // Add functionality to the new Yes button
        newYesButton.addEventListener("click", function() {
            document.querySelector(".container").style.display = "none";
            document.getElementById("celebration").style.display = "block";
            hideButtons(); // Hide all buttons when celebration page is shown
        });
    }
});

// Handle Back button click (navigate back to index.html)
document.getElementById("back-button").addEventListener("click", function() {
    window.location.href = "index.html"; // Redirect back to the index page
});

// Function to hide all buttons except for the Back button
function hideButtons() {
    const allButtons = document.querySelectorAll("button");
    allButtons.forEach(button => {
        if (button.id !== "back-button") {
            button.style.display = "none";
        }
    });
}

/* =========================
   SAFE CAROUSEL (isolated)
   ========================= */

window.addEventListener("load", function () {

    const carousel = document.getElementById("carousel");
    const leftArrow = document.getElementById("carousel-left");
    const rightArrow = document.getElementById("carousel-right");
    const carouselWrapper = document.querySelector(".carousel-wrapper");
    const celebration = document.getElementById("celebration");

    // If carousel doesn't exist, exit safely (prevents crashes)
    if (!carousel) return;

    let currentIndex = 0;
    const images = document.querySelectorAll(".carousel-img");
    const visibleImages = 5;
    const totalImages = images.length;
    const imageWidth = images[0].getBoundingClientRect().width + 20;

    function updateCarousel() {
        const offset = currentIndex * imageWidth;
        carousel.style.transform = `translateX(-${offset}px)`;
        carousel.style.transition = "transform 0.5s ease";
    }

    // Arrow buttons
    rightArrow.addEventListener("click", () => {
        if (currentIndex < totalImages - visibleImages) {
            currentIndex++;
            updateCarousel();
        }
    });

    leftArrow.addEventListener("click", () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });

    // Dragging
    let isDragging = false;
    let startX = 0;
    let startTranslate = 0;

    carousel.addEventListener("mousedown", (e) => {
        isDragging = true;
        startX = e.clientX;
        startTranslate = -currentIndex * imageWidth;
        carousel.style.transition = "none";
    });

    document.addEventListener("mouseup", () => {
        if (!isDragging) return;
        isDragging = false;
        currentIndex = Math.round(-parseInt(carousel.style.transform.replace(/[^0-9\-.,]/g, '')) / imageWidth);
        currentIndex = Math.max(0, Math.min(currentIndex, totalImages - visibleImages));
        updateCarousel();
    });

    document.addEventListener("mousemove", (e) => {
        if (!isDragging) return;
        const dx = e.clientX - startX;
        carousel.style.transform = `translateX(${startTranslate + dx}px)`;
    });

    // Hide carousel when celebration appears (safe observer)
    const observer = new MutationObserver(() => {
        if (celebration.style.display === "block") {
            carouselWrapper.style.display = "none";
        }
    });

    observer.observe(celebration, { attributes: true, attributeFilter: ["style"] });

});


