import { FormInput, SubmitBtn } from '../components';
import { Form, redirect, Link } from 'react-router-dom';
import axios from 'axios';
import { registerUser } from '../features/user/userSlice'

//import { customFetch } from '../utils';
import { toast } from 'react-toastify';

{/*
const testingUrl = 'https://strapi-store-server.onrender.com/api';
export const customFetchTest = axios.create({
  baseURL: testingUrl,
});
*/}

const productionUrl ='https://les-bruyeres.onrender.com/api';

export const customFetch = axios.create({
  baseURL: productionUrl,
});

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    console.log(data);
    const response = await customFetch.post('/users', data);
    //const response = await customFetchTest.post('/auth/local/register', data);
    store.dispatch(registerUser(response.data));
    toast.success('Compte créé avec succès');
    return redirect('/');
  } catch (error) {
    const errorMessage =
      error?.response?.data?.error?.message ||
      'svp vérifier votre accréditation';

    toast.error(errorMessage);
    return null;
  }
};

const Register = () => {
  return (
    <section className='h-screen grid place-items-center'>
      <Form 
        method='POST' 
        className='card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4'
      >
        <h4 className='text-center text-3xl font-bold'>Inscription</h4>
        {/*<FormInput type='text' label='Nom utilisateur' name='username' />*/}
        <FormInput type='text' label='Nom utilisateur' name='name' />
        <FormInput type='email' label='Email' name='email' />
        <FormInput type='password' label='Mot de passe' name='password' />
        <FormInput type='password' label='Mot de passe' name='passwordConfirm' />
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
export default Register;