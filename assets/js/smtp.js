function sendEmail() {
    emailjs.send("service_xxne7yp", "template_etrydde", {
        from_name: document.getElementById('name').value,
        message: document.getElementById('message').value,
        email_id: document.getElementById('email').value,
    }).then(
        alert('Your message has been sent successfully !')
    );
}