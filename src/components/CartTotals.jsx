import { useSelector } from 'react-redux';

const CartTotals = () => {
  const { cartTotal, shipping, tax, orderTotal } = useSelector(
    (state) => state.cartState
  );

  return (
    <div className='card bg-base-200'>
      <div className='card-body'>
        {/* SUBTOTAL */}
        <p className='flex justify-between text-xs border-b border-base-300 pb-2'>
          <span>Sous-total TTC</span>
          <span className='font-medium'>{(cartTotal)+"€"}</span>
        </p>
        {/* SHIPPING */}
        <p className='flex justify-between text-xs border-b border-base-300 pb-2'>
          <span>Frais de port</span>
          <span className='font-medium'>{shipping+"€"}</span>
        </p>
        {/* Tax */}
        <p className='flex justify-between text-xs border-b border-base-300 pb-2'>
          <span>TVA</span>
          <span className='font-medium'>{tax+"€"}</span>
        </p>
        {/* Total */}
        <p className='mt-4 flex justify-between text-sm  pb-2'>
          <span className='font-bold'>Total Commande TTC</span>
          <span className='font-bold'>{orderTotal+"€"}</span>
        </p>
      </div>
    </div>
  );
};
export default CartTotals;