/* JavaScript animation trigger */
document.addEventListener('DOMContentLoaded', function() {
    // Animate progress bars when section comes into view
    const skillsSection = document.querySelector('.skills-section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate linear progress bars
                document.querySelectorAll('.skill-progress-bar').forEach(bar => {
                    const width = bar.getAttribute('data-width');
                    bar.style.width = width + '%';
                });
                
                // Animate circular progress bars
                document.querySelectorAll('.circular-progress').forEach(progress => {
                    const percent = progress.getAttribute('data-percent');
                    const fill = progress.querySelector('.progress-circle-fill');
                    const circumference = 565.48;
                    const offset = circumference - (percent / 100) * circumference;
                    fill.style.strokeDashoffset = offset;
                });
                
                // Stop observing after animation
                observer.unobserve(entry.target);
            }
        });
    }, {threshold: 0.1});
    
    if (skillsSection) {
        observer.observe(skillsSection);
    }
});

// Update copyright year automatically
document.getElementById('year').textContent = new Date().getFullYear();

// Back to top button
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    backToTopBtn.style.opacity = '1';
    backToTopBtn.style.visibility = 'visible';
  } else {
    backToTopBtn.style.opacity = '0';
    backToTopBtn.style.visibility = 'hidden';
  }
});

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

document.querySelector('.glass-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = e.target;
  const submitBtn = form.querySelector('button[type="submit"]');
  
  // Show loading state
  submitBtn.innerHTML = '<span>Sending...<span>';
  submitBtn.disabled = true;

  try {
    await fetch('/', {
      method: 'POST',
      body: new FormData(form)
    });
    
    // Success message
    document.getElementById('formResponse').innerHTML = `
      <div class="alert alert-success">
        ✓ Message sent successfully!
      </div>
    `;
    form.reset();
  } catch (error) {
    // Error message
    document.getElementById('formResponse').innerHTML = `
      <div class="alert alert-danger">
        ✗ Failed to send. Please try again.
      </div>
    `;
  } finally {
    submitBtn.innerHTML = '<span>Send Message<span>';
    submitBtn.disabled = false;
  }
});

