// Import des dépendances nécessaires
import { FormInput, SubmitBtn } from '../components';
import { Form, redirect, Link } from 'react-router-dom'; // Correction de l'import de Redirect
import axios from 'axios';
import { toast } from 'react-toastify';

// Définition de l'URL de l'API de production
const productionUrl ='https://les-bruyeres.onrender.com/api';

// Création de l'instance Axios personnalisée pour les requêtes vers l'API
export const customFetch = axios.create({
  baseURL: productionUrl,
});

// Fonction d'action pour gérer la soumission du formulaire d'inscription
export const action = async ({ request }) => {
  try {
    // Récupération des données du formulaire
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    // Envoi de la requête POST vers l'API pour créer un nouvel utilisateur
    const response = await customFetch.post('/users', data);
    console.log(response.data)

    // Affichage d'un message de succès
    toast.success('Compte créé avec succès');

    // Redirection vers la page d'accueil après la création du compte
    return redirect('/');
 
  } catch (error) {
    // Gestion des erreurs
    const errorMessage =
      error?.response?.data?.error?.message || 'Veuillez vérifier vos informations d\'accès';

    // Affichage d'un message d'erreur à l'utilisateur
    toast.error(errorMessage);

    // Retour null en cas d'erreur
    return null;
  }
};

// Composant React pour le formulaire d'inscription
const Register = () => {
  return (
    <section className='h-screen grid place-items-center'>
      <Form 
        method='POST' 
        className='card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4'
      >
        <h4 className='text-center text-3xl font-bold'>Inscription</h4>
        <FormInput type='text' label='Nom utilisateur' name='name' />
        <FormInput type='email' label='Email' name='email' />
        <FormInput type='password' label='Mot de passe' name='password' />
        <FormInput type='password' label='Confirmation du mot de passe' name='passwordConfirm' /> {/* Correction de l'étiquette */}
        <FormInput type='text' label='Ville' name='city' />
        <FormInput type='text' label='Code postal' name='zip_code' />
        <FormInput type='text' label='Téléphone' name='phone_number' />
        <div className="mt-4">
          <SubmitBtn text="Inscription" />
        </div>
        <p className='text-center'>
          Déjà inscrit ?
          <Link
            to='/login'
            className='ml-2 link link-hover link-primary capitalize'
          >
            Connexion
          </Link>
        </p>
      </Form>
    </section>
  );
};

// Export du composant Register
export default Register;
