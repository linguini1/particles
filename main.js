// Constants
const PARTICLE_COLOUR = "#FFFFFF";
const PARTICLE_SIZE = 2;
const SPACE_SIZE = 900;
const VELOCITY_DAMPER = 1;
const FORCE_DAMPER = 0.1;

// Get space background elements
const space = document.getElementById("space");
const space_context = space.getContext("2d");

// Particle creator functions
var particles = [];
const particle = (x, y) => {
  return { x: x, y: y, vx: 0, vy: 0, colour: PARTICLE_COLOUR };
};

// Functions for translating canvas coordinates
function translateX(x) {
  var rect = space.getBoundingClientRect();
  var factor = space.width / rect.width;
  return factor * (x - rect.left);
}

function translateY(y) {
  var rect = space.getBoundingClientRect();
  var factor = space.width / rect.width;
  return factor * (y - rect.top);
}

function spawn_particle(event) {
  // Mouse click location to spawn particle
  const x = translateX(event.clientX);
  const y = translateY(event.clientY);

  // Create particle object and add to screen
  const current_particle = particle(x, y);
  particles.push(current_particle);
}

space.addEventListener("click", spawn_particle);

// Reset
const clear_button = document.getElementById("clear");
function clear() {
  particles = [];
  console.log("cleared");
}
clear_button.addEventListener("click", clear);

// Random start
const random_button = document.getElementById("random");
function random_start() {
  for (let i = 0; i < 3; i++) {
    const x = translateX(Math.random() * (SPACE_SIZE - 100) + 80);
    const y = translateY(Math.random() * (SPACE_SIZE - 100) + 80);
    particles.push(particle(x, y));
  }
}
random_button.addEventListener("click", random_start);

// Physics and drawing
const draw = (x, y, colour, size) => {
  space_context.fillStyle = colour;
  space_context.fillRect(x, y, size, size);
};

const update = () => {
  physics_process(-1);
  space_context.clearRect(0, 0, SPACE_SIZE, SPACE_SIZE);
  draw(0, 0, "black", SPACE_SIZE);

  for (let i = 0; i < particles.length; i++) {
    const current_particle = particles[i];
    draw(
      current_particle.x,
      current_particle.y,
      current_particle.colour,
      PARTICLE_SIZE
    );
  }
  requestAnimationFrame(update);
};

function physics_process(g) {
  for (let i = 0; i < particles.length; i++) {
    var fx = 0;
    var fy = 0;

    for (let j = 0; j < particles.length; j++) {
      var a = particles[i];
      const b = particles[j];

      const dx = a.x - b.x;
      const dy = a.y - b.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance > 0 && distance < 200) {
        const F = g * (1 / distance);
        fx += F * dx * FORCE_DAMPER;
        fy += F * dy * FORCE_DAMPER;
      }
    }

    a.vx = (a.vx + fx) * VELOCITY_DAMPER;
    a.vy = (a.vy + fy) * VELOCITY_DAMPER;
    a.x += a.vx;
    a.y += a.vy;
  }
}

update();
