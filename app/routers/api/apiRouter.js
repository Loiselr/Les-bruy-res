import express from "express";
import apiArticle from "./apiArticle.js";
import apiUser from "./apiUsers.js";
import apiLogin from "./apiLogin.js";
import apiEvents from "./apiEvents.js";
import apiInvoices from "./apiInvoice.js";
import apiCategorys from "./apiCategorys.js";
import apiAdmin from "./apiAdmin.js";
import apiCart from "./apiCart.js";
import apiLoginAdmin from "./apiLoginAdmin.js";
import checkSession from "../../middlewares/chechSession.js";

// le router principal de l'API

const apiRouter = express.Router();
//ici c'est toutes les routes disponible de notre api , article , event , catégory ,user, cart, admin
// la route ressemble a localhost:3000/api/....
apiRouter.use("/articles", apiArticle);
apiRouter.use("/cart", apiCart);

apiRouter.use("/users", apiUser);
apiRouter.use("/events", apiEvents);
apiRouter.use("/categorys", apiCategorys);
apiRouter.use("/admin", checkSession, apiAdmin);
apiRouter.use("/invoices", apiInvoices);
apiRouter.use("/login", apiLogin);
apiRouter.use("/loginAdmin", apiLoginAdmin);
export default apiRouter;
