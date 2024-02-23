import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const defaultState = {
  cartItems: [],
  numItemsInCart: 0,
  cartTotal: 0,
  shipping: 50,
  tax: 0,
  orderTotal: 0,
};

const getCartFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem('cart')) || defaultState;
}

const cartSlice = createSlice({
  name:'cart',
  initialState: getCartFromLocalStorage,
  reducers:{
    addItem:(state,action) => {
      console.log(action.payload)
      const { product } = action.payload;
      const item = state.cartItems.find((i) => i.cartID === product.cartID);
      if (item) {
        item.amount += product.amount;
      } else {
        state.cartItems.push(product);
      }

      state.numItemsInCart += product.amount;
      state.cartTotal += product.article_price * product.amount;

      // we do not take in account tax and shipping features, use All Tax Included Price
      //state.tax = 0.2 * state.cartTotal;
      //state.orderTotal = state.cartTotal + state.shipping + state.tax;
      //state.orderTotal = state.cartTotal;
      cartSlice.caseReducers.calculateTotals(state);
      
      toast.success('Article ajouté au panier');
    },
    clearCart:(state) => {
      localStorage.setItem('cart',JSON.stringify(defaultState));
      return defaultState;
    },
    removeItem:(state,action) => {
      const {cartID} = action.payload;
      const product = state.cartItems.find((i) => i.cartID === cartID);
      state.cartItems = state.cartItems.filter((i) => i.cartID !== cartID);
      state.numItemsInCart -= product.amount;
      state.cartTotal -= product.article_price * product.amount;
      cartSlice.caseReducers.calculateTotals(state);
      toast.error('Article retiré du panier');
    },
    editItem:(state, action) =>{
      const { cartID, amount } = action.payload;
      const item = state.cartItems.find((i) => i.cartID === cartID);
      state.numItemsInCart += amount - item.amount;
      state.cartTotal += item.price * (amount - item.amount);
      item.amount = amount;
      cartSlice.caseReducers.calculateTotals(state);
      toast.success('Panier mis à jour');
    },
    calculateTotals : (state) => {
      //state.tax = 0.2 * state.cartTotal;
      //state.orderTotal = state.cartTotal + state.shipping + state.tax;
      state.orderTotal = state.cartTotal;
      localStorage.setItem('cart', JSON.stringify(state));
    },
  },
});

export const { addItem, clearCart, removeItem, editItem } = cartSlice.actions;

export default cartSlice.reducer;