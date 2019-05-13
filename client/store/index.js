import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { checkUser, logOut, addUser, user, updateUser } from './user';
import { fetchUsers, users } from './users';
import { fetchProducts, searchProducts, filterProducts, products } from './products';
<<<<<<< HEAD
import { fetchProduct, product } from './product';
=======
import { fetchProduct, deleteProduct, product } from './product';
>>>>>>> 37eff9f3abf67676ce96e9b8b0d87f0399f905f4
import { fetchCategories, filterCategories, categories } from './categories';
import { fetchOrder, addOrderThunk, updateOrderThunk, order } from './order';
import { fetchOrderItems, deleteOrderItemThunk, addOrderItemThunk, orderItems } from './orderItems';
import { fetchProductReviews, reviews, addProductReview } from './reviews';
import { fetchProductVariants, productVariants } from './productVariants';

//THUNK CREATORS

export {
  checkUser,
  logOut,
  addUser,
  updateUser,
  fetchUsers,
  fetchProducts,
  searchProducts,
  filterProducts,
  fetchProduct,
  fetchCategories,
  filterCategories,
  fetchOrder,
  addOrderThunk,
  updateOrderThunk,
  fetchOrderItems,
  deleteOrderItemThunk,
  addOrderItemThunk,
  fetchProductReviews,
  addProductReview,
  fetchProductVariants,
};

const reducer = combineReducers({
  user,
  users,
  products,
  product,
  categories,
  order,
  orderItems,
  reviews,
  productVariants,
});

export const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunkMiddleware)));
