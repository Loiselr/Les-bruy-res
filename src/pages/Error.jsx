import { useRouteError, Link } from "react-router-dom";

const Error = () => {
  const error = useRouteError();
  console.log(error);

  if(error.status === 404) {
    return (
      <main className="grid min-h-[100vh] place-items-center px-8">
        <div className="text-center">
          <p className="text-9xl font-semibold text-primary">404</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">page non trouvé</h1>
          <p className="mt-6 text-lg leading-7">Désolé, nous ne pouvons pas trouver la page demandée</p>
          <div className="mt-10">
            <Link to='/' className="btn btn-secondary">
              Retour à la page d'accueil
            </Link>
          </div>
        </div>
      </main>
    )
  }
};

export default Error;