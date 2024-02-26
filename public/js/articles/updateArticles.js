async function addArticle(artcileID, name, img, description, size, stock_quantity, article_price, categoryId, eventId, article_brand, display_stock_article, display_featured_article) {
  try {
    // Envoi de la requête POST pour ajouter une nouveau artcile
    const response = await fetch(`http://localhost:3000/api/articles/${artcileID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, img, description, size, stock_quantity, article_price, categoryId, eventId, article_brand, display_stock_article, display_featured_article })
    });

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage = errorData.error;
      return alert(`Erreur lors de l'ajout' : ${errorMessage}`);
    }

    // Actualiser la page après l'ajout réussi de la catégorie
    window.location.reload();
  } catch (error) {
    console.error("Erreur lors de la requête d'ajout de l'artcile :", error);
    alert("Une erreur s'est produite lors de l'ajout de l'artcile.");
  }
}

const formAddArtcile = document.querySelector("form");
formAddArtcile.addEventListener("submit", (event) => {
  event.preventDefault();

  // Récupérer les valeurs des champs du formulaire
  const name = document.getElementById("new-article-name").value || null;
  const img = document.getElementById("new-article-img").value || null;
  const description = document.getElementById("new-article-description").value || null;
  const size = document.getElementById("new-article-size").value || null;
  const stock_quantity = document.getElementById("new-article-stock-quantity").value || null;
  const article_price = document.getElementById("new-article-price").value || null;
  // on  récupérer l'élément select 
  const SelectCategoryId = document.querySelector("select[name=\"categorie\"]");
  // on récupérer l'option sélectionnée
  const selectedOptionCategory = SelectCategoryId.options[SelectCategoryId.selectedIndex];
  // et ici l'id de la categorie
  const categoryId = selectedOptionCategory.value;
  const SelectEventId = document.querySelector("select[name=\"event\"]");
  const selectedOptionEvent = SelectEventId.options[SelectEventId.selectedIndex];
  const eventId = selectedOptionEvent.value;
  const article_brand = document.getElementById("new-article-brand").value || null;
  const artcileID = document.querySelector("form").id.split("-")[3];
  const display_stock_article = document.querySelector("#toggle-stock").checked;
  const display_featured_article = document.querySelector("#toggle-featured").checked;
  

  addArticle(artcileID, name, img, description, size, stock_quantity, article_price, categoryId, eventId, article_brand, display_stock_article, display_featured_article);
});