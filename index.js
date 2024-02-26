import { createServer } from "node:http";
import "./app/helpers/env.load.js";
import app from "./app/index.js";


//on écoute sur le port du .env ou sur port 3000 par défault
const PORT = process.env.PORT || 3000;
// oncrée le server

const httpServer = createServer(app);
// on écoute le server pour tester notre app
httpServer.listen(3000, () => {
  console.log(`📡📡 Server launched at http://localhost:${PORT}`);
});
