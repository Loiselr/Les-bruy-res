



export async function home(req, res) {
  try {
    res.render("index");

  } catch (error) {
    console.error("Une erreur est survenue : ", error);
    return res.status(500).json({
      error: "Une erreur est survenue lors du traitement de la requête",
    });
  }

}

export async function homeCategorys(req, res) {
  try {
    const response = await fetch("http://localhost:3000/api/categorys");
    const categorys = await response.json();
    res.render("categorys", { categorys });

  } catch (error) {
    console.error("Une erreur est survenue : ", error);
    return res.status(500).json({
      error: "Une erreur est survenue lors du traitement de la requête",
    });
  }
}

export async function homeEvents(req, res) {
  try {
    const response = await fetch("http://localhost:3000/api/events");
    const events = await response.json();
    res.render("events", { events });

  } catch (error) {
    console.error("Une erreur est survenue : ", error);
    return res.status(500).json({
      error: "Une erreur est survenue lors du traitement de la requête",
    });
  }
}

export async function homeArtciles(req, res) {
  try {
    const response = await fetch("http://localhost:3000/api/articles");
    const articles = await response.json();
    const responseEvents = await fetch("http://localhost:3000/api/events");
    const events = await responseEvents.json();
    const responseCategories = await fetch("http://localhost:3000/api/categorys");
    const categories = await responseCategories.json();

    res.render("artciles", { articles, events, categories });

  } catch (error) {
    console.error("Une erreur est survenue : ", error);
    return res.status(500).json({
      error: "Une erreur est survenue lors du traitement de la requête",
    });
  }
}

export async function getArticle(req, res) {
  try {
    const id = parseInt(req.params.id);

    

    const response = await fetch(`http://localhost:3000/api/articles/${id}`);
    const article = await response.json();

    const responseEvents = await fetch("http://localhost:3000/api/events");
    const events = await responseEvents.json();
    const responseCategories = await fetch("http://localhost:3000/api/categorys");
    const categories = await responseCategories.json();


    res.render("oneArticle", { article, events, categories });

  } catch (error) {
    console.error("Une erreur est survenue : ", error);
    return res.status(500).json({
      error: "Une erreur est survenue lors du traitement de la requête",
    });
  }
}