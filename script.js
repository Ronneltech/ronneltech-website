const form = document.getElementById("consultation-form");
const statusMessage = document.getElementById("form-status");

if (form) {
    const isFrench = document.documentElement.lang === "fr";

    const messages = isFrench
        ? {
              sending: "Envoi en cours...",
              success:
                  "Merci. Votre demande de consultation a bien été reçue. Notre équipe vous contactera prochainement.",
              error:
                  "Nous n’avons pas pu envoyer votre demande. Veuillez réessayer ou écrire à contact@ronneltech.com.",
              connection:
                  "Erreur de connexion. Veuillez réessayer ou écrire à contact@ronneltech.com.",
              sent: "Demande envoyée",
              send: "Envoyer la demande"
          }
        : {
              sending: "Sending...",
              success:
                  "Thank you. Your consultation request has been received. Our team will contact you shortly.",
              error:
                  "We could not send your request. Please try again or email contact@ronneltech.com.",
              connection:
                  "Connection error. Please try again or email contact@ronneltech.com.",
              sent: "Request Sent",
              send: "Send Request"
          };

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const submitButton = form.querySelector(".form-submit");

        submitButton.disabled = true;
        submitButton.textContent = messages.sending;

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

                statusMessage.textContent = messages.success;
                submitButton.textContent = messages.sent;
            } else {
                statusMessage.textContent = messages.error;

                submitButton.disabled = false;
                submitButton.textContent = messages.send;
            }
        } catch (error) {
            statusMessage.textContent = messages.connection;

            submitButton.disabled = false;
            submitButton.textContent = messages.send;
        }
    });
}
