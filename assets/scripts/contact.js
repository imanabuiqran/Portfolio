(function () {
    'use strict';
    const ENDPOINT = "https://formspree.io/f/xbgrleqn";

    const form = document.getElementById('contact-form');
    const statusEl = document.getElementById('form-status');
    const sendBtn = document.getElementById('send-btn');
    const emailDisplay = document.getElementById('contact-email');

    const fields = {
        firstName: document.getElementById('first-name'),
        lastName: document.getElementById('last-name'),
        email: document.getElementById('email'),
        message: document.getElementById('message'),
    };

    const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function setFieldError(input, message) {
        const field = input.closest('.field');
        const errorEl = field.querySelector('.field-error');
        if (message) {
            field.classList.add('invalid');
            errorEl.textContent = message;
        } else {
            field.classList.remove('invalid');
            errorEl.textContent = '';
        }
    }

    function validate() {
        let valid = true;

        if (!fields.firstName.value.trim()) {
            setFieldError(fields.firstName, 'Enter your first name.');
            valid = false;
        } else {
            setFieldError(fields.firstName, '');
        }

        if (!fields.lastName.value.trim()) {
            setFieldError(fields.lastName, 'Enter your last name.');
            valid = false;
        } else {
            setFieldError(fields.lastName, '');
        }

        const emailVal = fields.email.value.trim();
        if (!emailVal) {
            setFieldError(fields.email, 'Enter your email address.');
            valid = false;
        } else if (!EMAIL_RE.test(emailVal)) {
            setFieldError(fields.email, "That email address doesn't look right.");
            valid = false;
        } else {
            setFieldError(fields.email, '');
        }

        if (!fields.message.value.trim()) {
            setFieldError(fields.message, 'Write a short message.');
            valid = false;
        } else {
            setFieldError(fields.message, '');
        }

        return valid;
    }

    function setStatus(state, text) {
        statusEl.textContent = text;
        if (state) {
            statusEl.setAttribute('data-state', state);
        } else {
            statusEl.removeAttribute('data-state');
        }
    }

    // Clear a field's error as soon as the person starts fixing it.
    Object.values(fields).forEach(function (input) {
        input.addEventListener('input', function () {
            setFieldError(input, '');
        });
    });

    form.addEventListener('submit', async function (event) {
        event.preventDefault();
        setStatus('', '');

        if (!validate()) {
            setStatus('error', 'Please fix the highlighted fields.');
            return;
        }

        sendBtn.disabled = true;
        setStatus('sending', 'Sending…');

        const payload = {
            firstName: fields.firstName.value.trim(),
            lastName: fields.lastName.value.trim(),
            email: fields.email.value.trim(),
            message: fields.message.value.trim(),
            _to: emailDisplay ? emailDisplay.textContent.trim() : undefined,
        };

        try {
            const response = await fetch(ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error('Request failed with status ' + response.status);
            }

            setStatus('success', 'Message sent — thank you!');
            form.reset();
        } catch (err) {
            console.error('Contact form send failed:', err);
            setStatus(
                'error',
                'Something went wrong sending your message. Please try again, or email me directly.'
            );
        } finally {
            sendBtn.disabled = false;
        }
    });
})();