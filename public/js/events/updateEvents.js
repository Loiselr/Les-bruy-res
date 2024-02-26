const updateEvent = document.querySelectorAll("form");

async function update(eventId, newTitle, displayEvent) {
  try {
    // Envoi de la requête PUT pour mettre à jour l'event
    const response = await fetch(`http://localhost:3000/api/events/${eventId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: newTitle, display_event: displayEvent })
    });

    if (!response.ok) {
      // Récupération du message d'erreur renvoyé par l'API
      const errorData = await response.json();
      const errorMessage = errorData.error;
      alert(`Erreur lors de la mise à jour : ${errorMessage}`);
      return;
    }

    // Actualiser la page après la mise à jour réussie
    window.location.reload();
  } catch (error) {
    console.error("Erreur lors de la requête:", error);
    alert("Une erreur s'est produite lors de la mise à jour de l'event.");
  }
}





updateEvent.forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const id = form.id.split("-")[2];
    const title = document.querySelector(`#title-${id}`).value;
    const display_event = document.querySelector(`#toggle-event-${id}`).checked;
    update(id, title, display_event);

  });
});


