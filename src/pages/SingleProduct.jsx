import { useLoaderData } from 'react-router-dom';
import { customFetch } from '../utils';
import { Link } from 'react-router-dom';
import { useState } from 'react';

import { useDispatch } from 'react-redux';
import { addItem } from '../features/cart/cartSlice';

export const loader = async({params}) => {
  const response = await customFetch(`/articles/${params.id}`);
  return { product: response.data};
};

const SingleProduct = () => {
  const { product } = useLoaderData();
  console.log(product);
   
  const  { img, name, article_price, description } = product;
  const [amount, setAmount] = useState(1);

  const handleAmount = (e) => {
    setAmount(parseInt(e.target.value));
  };

  const cartProduct = {
    cartID:product.id,
    productID: product.id,
    img,
    name,
    article_price,
    amount,
  };
  
  const dispatch = useDispatch();

  const addToCart = () => {
    dispatch(addItem({ product: cartProduct }));
  }
  

  return (
    <section>
      <div className="text-md breadcrumbs">
        <ul>
          <li>
            <Link to='/'>Accueil</Link>
          </li>
          <li>
            <Link to='/products'>Produits</Link>
          </li>
        </ul>
      </div>
      {/* PRODUCT */}
      <div className="mt-6 grid gap-y-8 lg:grid-cols-2 lg:gap-x-16">
        {/* IMAGE */}
        <img 
          src={img} 
          alt={name} 
          className="w-96 h-96 object-cover rounded-lg lg:w-full"
        />
        {/* PRODUCT */}
        <div>
        {/*<h1 className="capitalize text-3xl font-bold">{title}</h1>*/}
        <h1 className="capitalize text-3xl font-bold">{name}</h1>
          <h4 className="text-xl text-neutral-content font-bold mt-2">
            {/*company*/}
          </h4>

          {/*<p className="mt-3 text-xl">{eurosAmount}</p>*/}
          <p className="mt-3 text-xl">{article_price}</p>

          <p className="mt-6 leading-8">{description}</p>

          {/* COLORS */}
          {/*
          <div className="mt-6">
            <h4 className="text-md font-medium tracking-wider capitalize">
              couleurs
            </h4>
            <div className="mt-2">
              {colors.map((color) => {
                return (
                  <button
                    key={color}
                    type="button"
                    className={`badge  w-6 h-6 mr-2  ${
                      color === productColor && "border-2 border-secondary"
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => setProductColor(color)}
                  ></button>
                );
              })}
            </div>
          </div>
          */}

          {/* AMOUNT */}
          <div className='form-control w-full max-w-xs'>
            <label className='label'>
              <h4 className='text-md font-medium tracking-wider capitalize'>
                quantité
              </h4>
            </label>
            <select
              className='select select-secondary select-bordered select-md'
              value={amount}
              onChange={handleAmount}
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
              <option value={7}>7</option>
              <option value={8}>8</option>
              <option value={9}>9</option>
              <option value={10}>10</option>
              <option value={12}>12</option>
              <option value={16}>16</option>
              <option value={24}>24</option>
              <option value={36}>36</option>
              <option value={48}>48</option>
            </select>
          </div>
          {/* CARD BUTTON */}
          <div className="mt-10">
            <button
              className="btn btn-secondary btn-md"
              onClick={addToCart}
            >
              Ajouter au panier
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
export default SingleProduct;