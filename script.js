const form = document.getElementById("consultation-form");
const statusMessage = document.getElementById("form-status");

if (form) {
    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const submitButton = form.querySelector(".form-submit");
        submitButton.disabled = true;
        submitButton.textContent = "Sending...";

        statusMessage.textContent = "";

        try {
            const response = await fetch(form.action, {
                method: form.method,
                body: new FormData(form),
                headers: {
                    Accept: "application/json"
                }
            });

            if (response.ok) {
                form.reset();

                statusMessage.textContent =
                    "Thank you. Your consultation request has been received. Our team will contact you shortly.";

                submitButton.textContent = "Request Sent";
            } else {
                statusMessage.textContent =
                    "We could not send your request. Please try again or email contact@ronneltech.com.";

                submitButton.disabled = false;
                submitButton.textContent = "Send Request";
            }
        } catch (error) {
            statusMessage.textContent =
                "Connection error. Please try again or email contact@ronneltech.com.";

            submitButton.disabled = false;
            submitButton.textContent = "Send Request";
        }
    });
}
