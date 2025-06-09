const form = document.querySelector(`.planet-form`);
const planet = document.querySelector(`.planet`);
const label = document.querySelector(`.planet-label`);

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = form.querySelector("input").value.trim();
    const selects = form.querySelectorAll("select");
    const type = selects[0].value;
    const climate = selects[1].value;
    const rings = form.querySelector('input[type="checkbox"]').checked;

    label.textContent = name ? name : "Your Planet";

    let background = "";
    if (type === "Rocky") background = 'radial-gradient(circle at center, #a0522d, #2f1b0c)';
    if (type === 'Gas Giant') background = 'radial-gradient(circle at center, #f5deb3, #b8860b)';
    if (type === 'Icy') background = 'radial-gradient(circle at center, #cceeff, #336699)';
    planet.style.background = background;

    let glowColor = "#00ffff";
    if (climate === 'Cold') glowColor = '#66ccff';
    if (climate === 'Temperate') glowColor = '#00ff99';
    if (climate === 'Hot') glowColor = '#ff4500';
    planet.style.boxShadow = `0 0 40px ${glowColor}`;

    // Add or remove rings
    if (rings) {
        planet.classList.add('rings');
    } else {
        planet.classList.remove('rings');
    }
});

const canvas = document.getElementById("star-canvas");
const ctx = canvas.getContext("2d");
let stars = [];

function resizeCanvas() {                   // fullscreen
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    createStars(2000)
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas); // resize in change in the window

function createStars(count) {
    stars = [];
    for (let i = 0; i < count; i++) {
        stars.push({
            x: Math.random() * canvas.width, //random x and y
            y: Math.random() * canvas.height,
            radius: Math.random() * 1.5 + 0.5, // small radius
            alpha: Math.random(),
            delta: (Math.random() * 0.02 + 0.005) * (Math.random() < 0.5 ? 1 : -1) // flicker speed
        });
    }
}

//twinkle
function animateStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height) // clearning the frame
    for (let star of stars) {
        star.alpha += star.delta;
        if (star.alpha <= 0 || star.alpha >= 1) {
            star.delta *= -1;
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
        ctx.fill();
    }
    requestAnimationFrame(animateStars); //looping
}
animateStars()















