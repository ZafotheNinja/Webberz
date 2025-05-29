import PocketBase from './js/pocketbase.es.js';

// const pb = new PocketBase('https://pb.wethepeople.network');
const pb = new PocketBase('/pb');

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

		emailError.textContent = '';
		const email = emailInput.value.trim();

		if (!email) {
			emailError.textContent = 'Email is required';
			return;
		}

		if (!validateEmail(email)) {
			emailError.textContent = 'Please enter a valid email';
			return;
		}

		setSubmitting(true);

		try {
			const record = await pb.collection('email_list').create({ email });
			alert('Thank you for joining the movement!');
			form.reset(); // Optional: reset form after successful submission
		} catch (error) {
			console.error(error);
			form.reset();
			// emailError.textContent = 'Failed to submit. Please try again.';
		}

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
