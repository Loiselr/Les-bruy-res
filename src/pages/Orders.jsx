import { redirect, useLoaderData } from 'react-router-dom';
import { toast } from 'react-toastify';
import { customFetch } from '../utils';
import { OrdersList, SectionTitle } from '../components';

{/*
export const loader = (store) => async({ request }) => {
  //console.log(store);
  const user = store.getState().userState.user;

  if (!user) {
    toast.warn('Vous devez être connecté pour voir vos commandes');
    return redirect('/login');
  }
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);
  try {
    const response = await customFetch.get('/orders', {
      params,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    console.log(response);
    return { orders: response.data };
  } catch (error) {
    console.log(error);
    const errorMessage =
      error?.response?.data?.error?.message ||
      'Il y a eu une erreur pour accéder à vos commandes';

    toast.error(errorMessage);
    if (error?.response?.status === 401 || 403) return redirect('/login');

    return null;
  }
};
*/}

const Orders = () => {
  return (
    <>
      <SectionTitle text='Vos commandes' />
      <OrdersList />
      
    </>
  );
};
export default Orders;
