//import { Form, useLoaderData, Link } from 'react-router-dom';
import { Form, Link } from 'react-router-dom';
import FormInput from './FormInput';
import FormSelect from './FormSelect';
import FormRange from './FormRange';
import FormCheckbox from './FormCheckbox';

const Filters = () => {
  //const { meta } = useLoaderData();
  //const { search, company, category, shipping, order, price } = params;

  return (
    <Form className='bg-base-200 rounded-md px-8 py-4 grid gap-x-4  gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center'>
      {/* SEARCH */}
      <FormInput
        type='search'
        label='Recherche Produit'
        name='search'
        size='input-sm'
      />
      {/* CATEGORIES */}
      {/*
      <FormSelect
        label='Catégories'
        name='category'
        list=''
        size='select-sm'
        
      />
      */}
      {/* COMPANIES */}
      {/*
      <FormSelect
        label='Marque'
        name='company'
        list=''
        size='select-sm'
      
      />
      */}
      {/* ORDER */}
      {/*
      <FormSelect
        label='Trié'
        name='order'
        list={['a-z', 'z-a', 'high', 'low']}
        size='select-sm'
      
      />
      */}
      {/* PRICE */}
      {/*
      <FormRange
        name='price'
        label='Prix'
        size='range-sm'
      />
      */}

      {/* SHIPPING */}
      {/*
      <FormCheckbox
        name='shipping'
        label='Transport offert'
        size='checkbox-sm'
      
      />
      */}
      {/* BUTTONS */}
      <button type='submit' className='btn btn-primary btn-sm'>
        Rechercher
      </button>
      <Link to='/products' className='btn btn-accent btn-sm'>
        Réinitialiser
      </Link>
    </Form>
  );
};
export default Filters;