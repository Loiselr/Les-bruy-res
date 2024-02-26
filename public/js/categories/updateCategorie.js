const updateCategorie = document.querySelectorAll("form");

async function update(categoryId, newTitle, displayCategory) {
  try {
    // Envoi de la requête PUT pour mettre à jour la catégorie
    const response = await fetch(`http://localhost:3000/api/categorys/${categoryId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: newTitle, display_category: displayCategory })
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
    alert("Une erreur s'est produite lors de la mise à jour de la catégorie.");
  }
}





updateCategorie.forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const id = form.id.split("-")[2];
    const title = document.querySelector(`#title-${id}`).value;
    const display_categorie = document.querySelector(`#toggle-category-${id}`).checked;
    update(id, title, display_categorie);

  });
});


