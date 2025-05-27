document.addEventListener('DOMContentLoaded', function() {
    // Get form elements
    const form = document.getElementById('signup-form');
    const emailInput = document.getElementById('email-input');
    const emailError = document.getElementById('email-error');
    const submitButton = document.getElementById('submit-button');
    const buttonText = document.getElementById('button-text');

    // Add event listeners
    form.addEventListener('submit', handleSubmit);

    // Add keyboard accessibility for buttons
    document.querySelectorAll('a[role="button"], button').forEach(button => {
        button.addEventListener('keydown', handleKeyDown);
    });

    // Email validation function
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Form submission handler
    async function handleSubmit(event) {
        event.preventDefault();

        // Clear previous error
        emailError.textContent = '';

        // Get email value
        const email = emailInput.value.trim();

        // Validate email
        if (!email) {
            emailError.textContent = 'Email is required';
            return;
        }

        if (!validateEmail(email)) {
            emailError.textContent = 'Please enter a valid email';
            return;
        }

        // Set submitting state
        setSubmitting(true);

        try {
            // Simulated API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Reset form
            emailInput.value = '';

            // Show success message
            alert('Thank you for joining the movement!');
        } catch (error) {
            // Show error message
            emailError.textContent = 'Failed to submit. Please try again.';
        }

        // Reset submitting state
        setSubmitting(false);
    }

    // Handle keyboard events for accessibility
    function handleKeyDown(event) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            event.target.click();
        }
    }

    // Set submitting state
    function setSubmitting(isSubmitting) {
        if (isSubmitting) {
            submitButton.disabled = true;
            buttonText.textContent = 'Signing up...';
        } else {
            submitButton.disabled = false;
            buttonText.textContent = 'Sign Up';
        }
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
