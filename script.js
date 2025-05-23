document.addEventListener("DOMContentLoaded", function () {
    // Set max date for birthdate input to today
    const today = new Date().toISOString().split("T")[0];
    document.getElementById("birthdate").setAttribute("max", today);

    // Form submit event
    document.getElementById("registrationForm").addEventListener("submit", function (e) {
        e.preventDefault();

        // Get form values trimmed
        let username = document.getElementById("username").value.trim();
        let email = document.getElementById("email").value.trim();
        let password = document.getElementById("password").value.trim();
        let birthdate = document.getElementById("birthdate").value;
        let address = document.getElementById("address").value.trim();
        let phone = document.getElementById("phone").value.trim();

        // Error elements
        let errors = {
            username: document.getElementById("usernameError"),
            email: document.getElementById("emailError"),
            password: document.getElementById("passwordError"),
            birthdate: document.getElementById("birthdateError"),
            address: document.getElementById("addressError"),
            phone: document.getElementById("phoneError")
        };

        // Clear previous errors
        for (let key in errors) {
            errors[key].textContent = "";
        }

        let valid = true;

        // Username validation - min 3 characters
        if (username.length < 3) {
            errors.username.textContent = "Username must be at least 3 characters";
            valid = false;
        }

        // Email validation (basic regex)
        if (!/^\S+@\S+\.\S+$/.test(email)) {
            errors.email.textContent = "Please enter a valid email address";
            valid = false;
        }

        // Password validation - min 6 characters
        if (password.length < 6) {
            errors.password.textContent = "Password must be at least 6 characters";
            valid = false;
        }

        // Birthdate validation - required & not future date
        if (!birthdate) {
            errors.birthdate.textContent = "Birthdate is required";
            valid = false;
        } else {
            let selectedDate = new Date(birthdate);
            let todayDate = new Date();
            todayDate.setHours(0, 0, 0, 0);
            if (selectedDate > todayDate) {
                errors.birthdate.textContent = "Birthdate cannot be in the future";
                valid = false;
            }
        }

        // Address validation - min 5 characters
        if (address.length < 5) {
            errors.address.textContent = "Please enter a valid address";
            valid = false;
        }

        // Phone validation - exactly 10 digits numeric
        if (!/^\d{10}$/.test(phone)) {
            errors.phone.textContent = "Phone number must be exactly 10 digits";
            valid = false;
        }

        if (valid) {
            alert("Form submitted successfully!");
            this.submit();  // Comment this if backend not ready yet
        }
    });
});
