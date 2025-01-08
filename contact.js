document.addEventListener('DOMContentLoaded', function() {
    const scriptURL = 'https://script.google.com/macros/s/AKfycbxfulDQp3g2EOy7hrWFJcNExRfOj2aMdYS0FhEkZw8Kexw5rFIfiMcs23GUn1cvc4T94w/exec';
    const form = document.forms['Lut-contact-form'];
    const btnKirim = document.querySelector('.btn-kirim');
    const btnLoading = document.querySelector('.btn-loading');
    const alertSuccess = document.querySelector('.alert-success');
    const inputs = form.querySelectorAll('input, textarea');

    // Handle input validation and mobile keyboard
    inputs.forEach(input => {
        // Prevent zoom on focus for iOS devices
        if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
            input.style.fontSize = '16px';
        }

        // Handle input validation
        input.addEventListener('blur', function() {
            validateInput(this);
        });

        // Clear error state on focus
        input.addEventListener('focus', function() {
            this.style.borderColor = '';
        });
    });

    // Form submission
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Validate all fields before submission
        let isValid = true;
        inputs.forEach(input => {
            if (!validateInput(input)) {
                isValid = false;
            }
        });

        if (!isValid) {
            return;
        }

        // Show loading state
        btnKirim.style.display = 'none';
        btnLoading.style.display = 'inline-flex';
        
        try {
            const response = await fetch(scriptURL, {
                method: 'POST',
                body: new FormData(form)
            });
            
            if (response.ok) {
                form.reset();
                showSuccessMessage();
            }
        } catch (error) {
            console.error('Error!', error.message);
            showErrorMessage();
        } finally {
            btnLoading.style.display = 'none';
            btnKirim.style.display = 'inline-flex';
        }
    });

    // Input validation function
    function validateInput(input) {
        if (input.required && !input.value.trim()) {
            input.style.borderColor = '#ff0000';
            return false;
        }

        if (input.type === 'email' && input.value.trim() && !isValidEmail(input.value)) {
            input.style.borderColor = '#ff0000';
            return false;
        }

        if (input.type === 'tel' && input.value.trim() && !isValidPhone(input.value)) {
            input.style.borderColor = '#ff0000';
            return false;
        }

        input.style.borderColor = '';
        return true;
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function isValidPhone(phone) {
        const phoneRegex = /^[\d\s-+()]{10,}$/;
        return phoneRegex.test(phone);
    }

    function showSuccessMessage() {
        alertSuccess.style.display = 'block';
        // Position the alert for better mobile visibility
        if (window.innerWidth <= 768) {
            alertSuccess.style.position = 'fixed';
            alertSuccess.style.top = '20px';
            alertSuccess.style.left = '50%';
            alertSuccess.style.transform = 'translateX(-50%)';
            alertSuccess.style.width = '90%';
            alertSuccess.style.zIndex = '1000';
        }
        setTimeout(() => {
            alertSuccess.style.display = 'none';
        }, 3000);
    }

    function showErrorMessage() {
        // You can implement error message display here
        alert('An error occurred. Please try again.');
    }

    // Handle mobile viewport height issues
    function handleMobileViewport() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }

    // Call on load and resize
    handleMobileViewport();
    window.addEventListener('resize', handleMobileViewport);

    // Prevent form submission on enter key for mobile
    form.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
            e.preventDefault();
        }
    });
});