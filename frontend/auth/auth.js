const form = document.querySelectorAll('form');
const submitBtn = document.querySelectorAll('#submit');
const a = document.getElementById('sign-up');
const b = document.getElementById('sign-in');
const signinBtn = document.getElementById('signin-btn');
const signupBtn = document.getElementById('signup-btn');
const errorDisplay = document.querySelectorAll('.error');
a.addEventListener('change', () => {
    if (a.checked) b.checked = false;
});

b.addEventListener("change", () => {
    if (b.checked) a.checked = false;
});

form.forEach(form => {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const payload = {
            username: formData.get('username') || null,
            email: formData.get('email'),
            password: formData.get('password'),
        };
        signinBtn.textContent = "Signing you in...";
        signupBtn.textContent = "Signing you up..."
        signinBtn.disabled = true;
        signupBtn.disabled = true;
        try {
            const response = await fetch(`/${form.dataset.url}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            if (data.success || data.ok) {
                console.log(data.message);
                window.location.href = data.redirectTo;
            } else {
                console.log(data.error);
                errorDisplay.forEach(display => {
                    display.textContent = data.error;
                });
            }
        } catch (err) {
            console.log("Network error, check internet connection");
            errorDisplay.forEach(display => {
                display.textContent = err;
            });
        } finally {
            signinBtn.textContent = "Sign in";
            signupBtn.textContent = "Sign up"
            signinBtn.disabled = false;
            signupBtn.disabled = false;
            setTimeout(() => {
                errorDisplay.forEach(display => {
                    display.textContent = "";
                });
            }, 2000);
        }

    });
})
