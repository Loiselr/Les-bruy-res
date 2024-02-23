import { useRouteError } from "react-router-dom";

const ErrorElement = () => {
    const error = useRouteError();
    console.log(error);

    return (
        <div className="font-bold text-4xl">
            Il y a une erreur...
        </div>
    )
}
export default ErrorElement;