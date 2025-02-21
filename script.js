emailjs.init("_Mczvev_oUorf4ERM"); // Replace with your EmailJS API key

// Generate a dynamic CAPTCHA question and its answer
let captchaAnswer; // This will hold the correct CAPTCHA answer

function generateCaptcha() {
    const num1 = Math.floor(Math.random() * 10); // Random number between 0-9
    const num2 = Math.floor(Math.random() * 10); // Random number between 0-9
    captchaAnswer = num1 + num2; // Calculate the correct answer
    document.getElementById("captchaQuestion").innerText = `What is ${num1} + ${num2}?`; // Display the question
}

// Call the function to generate the initial CAPTCHA
generateCaptcha();

document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form data
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;
    const captcha = parseInt(document.getElementById("captcha").value, 10); // Parse CAPTCHA input as an integer

    // CAPTCHA validation
    if (captcha !== captchaAnswer) { // Check if the CAPTCHA answer is correct
        document.getElementById("captchaError").style.display = "block";
        generateCaptcha(); // Regenerate the CAPTCHA question
        return; // Stop form submission
    }
    document.getElementById("captchaError").style.display = "none";

    // Send email using EmailJS
    emailjs.send("service_92gbfx2", "template_1qu0jow", {
        to_name: name,
        from_name: email,
        message: message
    })
    .then(function (response) {
        document.getElementById("status").innerText = "Message sent successfully!";
        document.getElementById("status").style.color = "green";
        document.getElementById("contactForm").reset(); // Clear the form
        generateCaptcha(); // Regenerate the CAPTCHA question
    })
    .catch(function (error) {
        document.getElementById("status").innerText = "Failed to send message. Please try again.";
        document.getElementById("status").style.color = "red";
    });
});




// document.getElementById("download-btn").addEventListener("click", function() {
//     const fileLink = document.createElement("a");
//     fileLink.href = "MohamedAbdelrahman.pdf"; // Replace with your file path
//     fileLink.download = "MohamedAbdelrahman.pdf"; // Specify the file name
//     fileLink.click();
    
//     // Disable the button after the file download starts
//     this.disabled = true;
//     this.currentStyle.pointerEvents = "none";
// });


const downloadButton = document.getElementById("download-btn");

// Check sessionStorage to disable the button if the file was already downloaded
if (sessionStorage.getItem("fileDownloaded")) {
    downloadButton.disabled = true;
}

downloadButton.addEventListener("click", function() {
    const fileLink = document.createElement("a");
    fileLink.href = "MohamedAbdelrahman.pdf"; // Replace with your file path
    fileLink.download = "MohamedAbdelrahman.pdf"; // Specify the file name
    fileLink.click();

    // Mark the file as downloaded in sessionStorage
    sessionStorage.setItem("fileDownloaded", "true");

    // Disable the button
    this.disabled = true;
});