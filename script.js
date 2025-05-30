/**
 * breathtaker1 website JavaScript
 * Provides interactive functionality for the breathtaker1 website
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive elements
    initializeNavigation();
    initializeNewsletterForm();
    initializeSupportForm();
    initializeImageZoom();
    addFormatBadges();
    initializeScrollShadow();

    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');

            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

/**
 * Add shadow to header on scroll
 */
function initializeScrollShadow() {
    const header = document.querySelector('header');

    // Initial check in case page is loaded scrolled down
    if (window.scrollY > 20) {
        header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = 'none';
    }

    // Add scroll listener
    window.addEventListener('scroll', function() {
        if (window.scrollY > 20) {
            header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = 'none';
        }
    });
}

/**
 * Initialize lightbox for product screenshots
 */
function initializeImageZoom() {
    const screenshots = document.querySelectorAll('.plugin-screenshot img');
    
    screenshots.forEach(img => {
        img.addEventListener('click', () => {
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            
            const imgClone = document.createElement('img');
            imgClone.src = img.src;
            
            const closeButton = document.createElement('div');
            closeButton.className = 'lightbox-close';
            closeButton.innerHTML = '&times;';
            
            lightbox.appendChild(imgClone);
            lightbox.appendChild(closeButton);
            document.body.appendChild(lightbox);
            
            // Small delay before adding active class for transition effect
            setTimeout(() => {
                lightbox.classList.add('active');
            }, 10);
            
            lightbox.addEventListener('click', () => {
                lightbox.classList.remove('active');
                setTimeout(() => {
                    document.body.removeChild(lightbox);
                }, 300);
            });
        });
        
        // Add pointer cursor to indicate clickability
        img.style.cursor = 'pointer';
    });
}

/**
 * Add format badges to trial sections
 */
function addFormatBadges() {
    const trialInfoSections = document.querySelectorAll('.trial-info');
    
    trialInfoSections.forEach(section => {
        // Create format badges container if it doesn't already exist
        if (!section.querySelector('.format-badges')) {
            const formatBadges = document.createElement('div');
            formatBadges.className = 'format-badges';
            
            // Create VST3 badge
            const vst3Badge = document.createElement('div');
            vst3Badge.className = 'format-badge';
            vst3Badge.innerHTML = '<i class="fas fa-plug"></i> VST3';
            formatBadges.appendChild(vst3Badge);
            
            // Create AU badge
            const auBadge = document.createElement('div');
            auBadge.className = 'format-badge';
            auBadge.innerHTML = '<i class="fas fa-music"></i> AU';
            formatBadges.appendChild(auBadge);
            
            // Create Standalone badge
            const standaloneBadge = document.createElement('div');
            standaloneBadge.className = 'format-badge';
            standaloneBadge.innerHTML = '<i class="fas fa-desktop"></i> Standalone';
            formatBadges.appendChild(standaloneBadge);
            
            // Insert after the paragraph
            const paragraph = section.querySelector('p');
            if (paragraph) {
                paragraph.parentNode.insertBefore(formatBadges, paragraph.nextSibling);
            } else {
                section.appendChild(formatBadges);
            }
        }
    });
}

/**
 * Initialize the responsive navigation
 */
function initializeNavigation() {
    // This will handle any mobile navigation toggling
    // To be implemented when/if a mobile menu button is added
}

/**
 * Initialize the newsletter form with validation and submission handling
 */
function initializeNewsletterForm() {
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    
    newsletterForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (!isValidEmail(email)) {
                showFormError(emailInput, 'Please enter a valid email address');
                return;
            }
            
            // Here you would normally send the form data to a server
            // For now, we'll just show a success message
            
            // Clear any previous error messages
            clearFormErrors(this);
            
            // Replace the form with a success message
            const container = this.parentElement;
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.textContent = 'Thank you for subscribing! We\'ll keep you updated on breathtaker1 news.';
            
            // Hide the form
            this.style.display = 'none';
            
            // Add the success message
            container.appendChild(successMessage);
        });
    });
}

/**
 * Initialize the support contact form with validation
 */
function initializeSupportForm() {
    const supportForm = document.querySelector('.newsletter-form button');
    
    if (supportForm && supportForm.textContent.includes('Contact Support')) {
        const form = supportForm.closest('form');
        
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (!isValidEmail(email)) {
                showFormError(emailInput, 'Please enter a valid email address');
                return;
            }
            
            // Here you would normally send the form data to a server
            // For now, we'll just show a success message
            
            // Clear any previous error messages
            clearFormErrors(this);
            
            // Replace the form with a success message
            const container = this.parentElement;
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.textContent = 'Thank you for contacting support! We\'ll get back to you shortly.';
            
            // Hide the form
            this.style.display = 'none';
            
            // Add the success message
            container.appendChild(successMessage);
        });
    }
}

/**
 * Validate email format
 * @param {string} email - The email to validate
 * @return {boolean} - Whether the email is valid
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Show a form error message
 * @param {HTMLElement} inputElement - The input element with the error
 * @param {string} message - The error message to display
 */
function showFormError(inputElement, message) {
    // Clear any existing error
    clearFormErrors(inputElement.form);
    
    // Create error message element
    const errorElement = document.createElement('div');
    errorElement.className = 'form-error';
    errorElement.textContent = message;
    
    // Insert after the input
    inputElement.parentElement.appendChild(errorElement);
    
    // Highlight the input
    inputElement.style.borderColor = '#E74C3C';
}

/**
 * Clear all form error messages
 * @param {HTMLFormElement} form - The form to clear errors from
 */
function clearFormErrors(form) {
    // Remove error messages
    const errorElements = form.querySelectorAll('.form-error');
    errorElements.forEach(el => el.remove());
    
    // Reset input styling
    const inputs = form.querySelectorAll('input');
    inputs.forEach(input => {
        input.style.borderColor = '';
    });
}