

// Updated Three.js Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(700, 700);
document.getElementById('techSphere').appendChild(renderer.domElement);

// Create larger particle sphere
const geometry = new THREE.SphereGeometry(3, 64, 64);
const material = new THREE.PointsMaterial({
  size: 0.03,
  color: 0x00bcd4
});
const sphere = new THREE.Points(geometry, material);
scene.add(sphere);

camera.position.z = 7;

function animate() {
  requestAnimationFrame(animate);
  sphere.rotation.x += 0.001;
  sphere.rotation.y += 0.001;
  renderer.render(scene, camera);
}
animate();

// Timeline Animation
const timelineItems = document.querySelectorAll('.timeline-item');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.5 });

timelineItems.forEach(item => observer.observe(item));

// Form handling
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  // Show loading state
  const button = this.querySelector('button');
  const originalText = button.textContent;
  button.textContent = 'Sending...';
  button.disabled = true;

  // Prepare template parameters
  const templateParams = {
    from_name: this.user_name.value,
    from_email: this.user_email.value,
    message: this.message.value
  };

  // Send email using EmailJS
  emailjs.send("service_y9hvkce", "template_p1watly", templateParams)
    .then(function() {
      alert('Message sent successfully!');
      e.target.reset(); // Reset form
    }, function(error) {
      alert('Failed to send message. Please try again.');
      console.error('EmailJS Error:', error);
    })
    .finally(function() {
      // Restore button state
      button.textContent = originalText;
      button.disabled = false;
    });
});
