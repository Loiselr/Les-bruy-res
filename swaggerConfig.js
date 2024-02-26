import swaggerJSDoc from "swagger-jsdoc";

// Swagger definition
const swaggerDefinition = {
  info: {
    title: "Api les bruyères",
    version: "1.0.0",
    description: "",
  },
  basePath: "/",
  
};

// Schéma de sécurité JWT
const securityDefinitions = {
  JWTAuth: {
    type: "apiKey",
    name: "Authorization",
    in: "header",
  },
};

// Options de Swagger-JSDoc
const options = {
  swaggerDefinition,
  apis: ["./app/routers/api/*.js"],
  securityDefinitions,
};

// Initialisation de Swagger-JSDoc
const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
