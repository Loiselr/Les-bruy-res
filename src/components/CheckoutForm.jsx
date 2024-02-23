import { Form, redirect } from 'react-router-dom';
import FormInput from './FormInput';
import SubmitBtn from './SubmitBtn';
import { customFetch } from '../utils';
import { toast } from 'react-toastify';
import { clearCart } from '../features/cart/cartSlice';

export const action = (store) => async ({ request }) => {
  //console.log(store);
  const formData = await request.formData();
  const { name, address } = Object.fromEntries(formData);
  const user = store.getState().userState.user;
  const { cartItems, orderTotal, numItemsInCart } = store.getState().cartState;
  
  const info = {
    name,
    address,
    chargeTotal: orderTotal,
    orderTotal: orderTotal,
    cartItems,
    numItemsInCart,
  };
  try {
    const response = await customFetch.post(
      '/orders',
      { data: info },
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    store.dispatch(clearCart());
    toast.success('Commande effectuée avec succès');
    return redirect('/orders');
  } catch (error) {
    console.log(error);
    const errorMessage =
      error?.response?.data?.error?.message ||
      'Il y a eu une erreur en effectuant la commande';
    toast.error(errorMessage);
    if (error?.response?.status === 401 || 403) return redirect('/login');
    
    return null;
  }
};
    
const CheckoutForm = () => {
  return (
    <Form method='POST' className='flex flex-col gap-y-4'>
      <h4 className='font-medium text-xl'>Adresse de livraison</h4>
      <FormInput label='Nom' name='name' type='text' />
      <FormInput label='Addresse' name='address' type='text' />
      <div className='mt-4'>
        <SubmitBtn text='Passer votre commande' />
      </div>
    </Form>
  );
};
export default CheckoutForm;
