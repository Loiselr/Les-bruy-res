async function addCategory(newCategoryTitle) {
  try {
    // Envoi de la requête POST pour ajouter une nouvelle catégorie
    const response = await fetch("http://localhost:3000/api/categorys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ title: newCategoryTitle })
    });

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage = errorData.error;
      alert(`Erreur lors de l'ajout' : ${errorMessage}`);
      return;
    }

    // Actualiser la page après l'ajout réussi de la catégorie
    window.location.reload();
  } catch (error) {
    console.error("Erreur lors de la requête d'ajout de catégorie :", error);
    alert("Une erreur s'est produite lors de l'ajout de la catégorie.");
  }
}

const formAddCategories = document.querySelector("#form-add-category");
formAddCategories.addEventListener("submit", (event) => {
  event.preventDefault();

  const newTitle = document.querySelector("#new-category-title").value;
  addCategory(newTitle);
});