document.getElementById('registration-form').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent default form submission

    // Gather data from form inputs
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const address = document.getElementById('address').value;
    const dob = document.getElementById('dob').value;

    // Create data object to send to the server
    const formData = {
        username,
        email,
        password,
        confirmPassword,
        address,
        dob
    };

    // Send POST request to the backend
    fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        // Handle success or error
        if (data.error) {
            document.getElementById('error-message').innerText = data.error;
            document.getElementById('error-message').style.display = 'block';
        } else {
            document.getElementById('success-message').innerText = data.message;
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
