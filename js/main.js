// RGU Echo Website - Main JavaScript

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all functionality
    initSmoothScroll();
    initFormValidation();
    initAnimations();
    initAccessibility();
    
});

// Smooth Scrolling for Anchor Links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// Form Validation for Contact Page
function initFormValidation() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            event.stopPropagation();
            
            if (contactForm.checkValidity()) {
                handleFormSubmit(contactForm);
            }
            
            contactForm.classList.add('was-validated');
        }, false);
    }
}

// Handle Form Submission
function handleFormSubmit(form) {
    // Get form data
    const formData = {
        name: form.querySelector('#name').value,
        email: form.querySelector('#email').value,
        studentId: form.querySelector('#studentId')?.value || 'Not provided',
        subject: form.querySelector('#subject').value,
        message: form.querySelector('#message').value,
        timestamp: new Date().toISOString()
    };
    
    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        // Log form data (in production, send to server)
        console.log('Form submitted:', formData);
        
        // Show success message
        showNotification('success', 'Thank you! We\'ve received your message and will respond within 2 working days.');
        
        // Reset form
        form.reset();
        form.classList.remove('was-validated');
        
        // Restore button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 1500);
}

// Show Notification
function showNotification(type, message) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type === 'success' ? 'success' : 'danger'} alert-dismissible fade show position-fixed top-0 start-50 translate-middle-x mt-3`;
    alertDiv.style.zIndex = '9999';
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(alertDiv);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        alertDiv.remove();
    }, 5000);
}

// Scroll Animations
function initAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all cards and sections
    document.querySelectorAll('.card, section > .container > .row').forEach(el => {
        observer.observe(el);
    });
}

// Accessibility Enhancements
function initAccessibility() {
    // Add skip to main content link
    addSkipLink();
    
    // Enhance keyboard navigation for cards
    document.querySelectorAll('.card').forEach(card => {
        const link = card.querySelector('a');
        if (link && !card.hasAttribute('tabindex')) {
            card.setAttribute('tabindex', '0');
            card.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    link.click();
                }
            });
        }
    });
    
    // Add ARIA labels to social media icons
    document.querySelectorAll('a[href*="facebook"], a[href*="twitter"], a[href*="instagram"]').forEach(link => {
        if (!link.getAttribute('aria-label')) {
            const platform = link.href.includes('facebook') ? 'Facebook' : 
                          link.href.includes('twitter') ? 'Twitter' : 'Instagram';
            link.setAttribute('aria-label', `Visit our ${platform} page`);
        }
    });
}

// Add Skip to Content Link
function addSkipLink() {
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'visually-hidden-focusable btn btn-primary position-absolute top-0 start-0 m-3';
    skipLink.textContent = 'Skip to main content';
    skipLink.style.zIndex = '9999';
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add main-content ID if not present
    const mainContent = document.querySelector('main') || document.querySelector('section:first-of-type');
    if (mainContent && !mainContent.id) {
        mainContent.id = 'main-content';
    }
}

// Navbar scroll effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('shadow');
    } else {
        navbar.classList.remove('shadow');
    }
    
    lastScroll = currentScroll;
});

// Emergency Contact Quick Access (for crisis situations)
function checkForEmergencyKeywords() {
    const searchParams = new URLSearchParams(window.location.search);
    const keywords = ['crisis', 'emergency', 'help', 'urgent'];
    
    keywords.forEach(keyword => {
        if (searchParams.get(keyword)) {
            showEmergencyBanner();
        }
    });
}

function showEmergencyBanner() {
    const banner = document.createElement('div');
    banner.className = 'alert alert-danger alert-dismissible fade show position-fixed bottom-0 start-50 translate-middle-x mb-3';
    banner.style.zIndex = '9999';
    banner.innerHTML = `
        <h5 class="alert-heading"><i class="bi bi-exclamation-triangle me-2"></i>Need Immediate Help?</h5>
        <p class="mb-2">If you're in crisis, please contact:</p>
        <ul class="mb-0">
            <li><strong>Emergency:</strong> 999</li>
            <li><strong>Samaritans:</strong> 116 123 (24/7)</li>
            <li><strong>Shout:</strong> Text SHOUT to 85258</li>
        </ul>
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(banner);
}

// Initialize emergency check
checkForEmergencyKeywords();

// Log page view (for analytics - replace with actual analytics)
console.log('Page loaded:', window.location.pathname);
