// script.js
let ticking = false;
let lastX = 0;
let lastY = 0;

function updateParallax(x, y) {
  const layers = document.querySelectorAll('.parallax-layer');
  
  layers.forEach((layer, index) => {
    const depth = (index + 1) * 5;
    let moveX = x * depth;
    let moveY = y * depth;
    
    // Invert the movement for layer3 (planets)
    if (index === 2) { // layer3
      moveX = -moveX;
      moveY = -moveY;
    }
    
    layer.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
  });
  
  ticking = false;
}

document.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 2;
  const y = (e.clientY / window.innerHeight - 0.5) * 2;
  
  if (!ticking) {
    window.requestAnimationFrame(() => {
      updateParallax(x, y);
    });
    ticking = true;
  }
});
