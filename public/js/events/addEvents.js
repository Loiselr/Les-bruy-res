async function addEvents(newEventTitle) {
  try {

    // Envoi de la requête POST pour ajouter une nouvelle Event
    const response = await fetch("http://localhost:3000/api/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ title: newEventTitle })
    });

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage = errorData.error;
      console.log(errorMessage);
      alert(`Erreur lors de l'ajout' : ${errorMessage}`);
      return;
    }

    // Actualiser la page après l'ajout réussi de la Event
    window.location.reload();
  } catch (error) {
    console.error("Erreur lors de la requête d'ajout de Event :", error);
    alert("Une erreur s'est produite lors de l'ajout de la Event.");
  }
}

const formAddEvent = document.querySelector("#form-add-event");
formAddEvent.addEventListener("submit", (event) => {
  event.preventDefault();

  const newTitle = document.querySelector("#new-event-title").value;

  addEvents(newTitle);
});