import { FormInput, SubmitBtn } from '../components';
import { Form, Link, redirect, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { loginUser } from '../features/user/userSlice';
import { useDispatch } from 'react-redux';

/*
const testingUrl = 'https://strapi-store-server.onrender.com/api';
export const customFetchTest = axios.create({
  baseURL: testingUrl,
});
*/
const productionUrl = 'https://les-bruyeres.onrender.com/api';
export const customFetch = axios.create({
  baseURL: productionUrl,
});

export const action = (store) => 
  async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
      const response = await customFetch.post('/login', data);
      //const response = await customFetchTest.post('/auth/local', data);

      store.dispatch(loginUser(response.data));
      toast.success('Connecté avec succès');
      return redirect('/');
      
    } catch (error) {
      console.log(error);
      console.log(data);
      const errorMessage =
        error?.response?.data?.error?.message ||
        'svp vérifier votre accréditation';

      toast.error(errorMessage);
      return null;
    }
  };

const Login = () => {
  return (
    <section className='h-screen grid place-items-center'>
      <Form 
        method='post' 
        className='card w-96 py-8 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4'
      >
        <h4 className='text-center text-3xl font-bold'>Connexion</h4>
        <FormInput 
          type="email" 
          label="email" 
          name="email" 
        />
        <FormInput 
          type="password" 
          label="mot de passe" 
          name="password" 
        />
        <div className='mt-4'>
          <SubmitBtn text="Connexion"/>
          
          {/*<button type='button' className='btn btn-secondary btn-block'>*/}
          {/* Utilisateur invité */}
          {/*</button>*/}
         
          <p className='text-center'>
            Pas encore inscrit ?{' '}
            <Link
              to='/register'
              className='ml-2 link link-hover link-primary capitalize'
            >
              Inscription
            </Link>
          </p>
        </div>
      </Form>  
    </section>
  );
};
export default Login;