/* eslint-disable no-console */
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import axios from 'axios';

//ACTION TYPES
const SET_USER = 'SET_USER';
const SET_PRODUCTS = 'SET_PRODUCTS';
const SET_CATEGORIES = 'SET_CATEGORIES';
const SET_REVIEWS = 'SET_REVIEWS';

//ACTION CREATORS
const setUser = user => ({
  type: SET_USER,
  user,
});

const setProducts = products => ({
  type: SET_PRODUCTS,
  products,
});

const setCategories = categories => ({
  type: SET_CATEGORIES,
  categories,
});

const setReviews = reviews => ({
  type: SET_REVIEWS,
  reviews,
});

//THUNK CREATORS
export const fetchProducts = () => {
  return dispatch => {
    return axios
      .get('api/products')
      .then(res => res.data)
      .then(products => dispatch(setProducts(products)));
  };
};

export const fetchProduct = id => {
  return dispatch => {
    return axios
      .get(`api/products/${id}`)
      .then(res => res.data)
      .then(product => dispatch(setProducts([product])));
  };
};

export const fetchCategories = () => {
  return dispatch => {
    return axios
      .get('api/categories')
      .then(res => res.data)
      .then(categories => dispatch(setCategories(categories)));
  };
};

export const fetchProductReviews = id => {
  return dispatch => {
    return axios
      .get(`api/reviews/${id}`)
      .then(res => res.data)
      .then(reviews => dispatch(setReviews(reviews)));
  };
};

export const searchProducts = searchTerm => {
  return dispatch => {
    return axios
      .get('api/products')
      .then(res => res.data)
      .then(allProducts =>
        allProducts.filter(product =>
          product.title.toLowerCase().includes(searchTerm.toLowerCase()),
        ),
      )
      .then(products => dispatch(setProducts(products)));
  };
};

export const filterProducts = categoryIds => {
  return dispatch => {
    return axios
      .get('api/products')
      .then(res => res.data)
      .then(allProducts => allProducts.filter(product => categoryIds.includes(product.categoryId)))
      .then(products => dispatch(setProducts(products)));
  };
};

export const checkUser = enteredUser => async dispatch => {
  try {
    const response = await axios.put('/api/auth/login', enteredUser);
    const user = response.data;
    return dispatch(setUser(user));
  } catch (error) {
    throw new Error(error);
  }
};

export const logOut = () => async dispatch => {
  try {
    await axios.delete('/api/auth/logout');
    return dispatch(setUser({}));
  } catch (error) {
    throw new Error(error);
  }
};

export const addUser = enteredUser => async dispatch => {
  try {
    const response = await axios.post('/api/users/adduser', enteredUser);
    const newUser = response.data;
    return dispatch(setUser(newUser));
  } catch (error) {
    throw new Error(error);
  }
};

export const logOut = () => async dispatch => {
  try {
    await axios.delete('/api/auth/logout');
    return dispatch(setUser({}));
  } catch (error) {
    throw new Error(error);
  }
};

// export const getMe = () => async dispatch => {
//     try {
//         const response = await axios.get('/api/auth/me')
//         user = response.data
//         return dispatch(setUser(user))
//     } catch (error) { throw new Error(error) }
// };

//REDUCERS

const product = (state = { products: [] }, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return { ...state, products: action.products };
    default:
      return state;
  }
};

const user = (state = {}, action) => {
  switch (action.type) {
    case SET_USER:
      return action.user;
    default:
      return state;
  }
};

const category = (state = { categories: [] }, action) => {
  switch (action.type) {
    case SET_CATEGORIES:
      return { ...state, categories: action.categories };
    default:
      return state;
  }
};

const review = (state = { reviews: [] }, action) => {
  switch (action.type) {
    case SET_REVIEWS:
      return { ...state, reviews: action.reviews };
    default:
      return state;
  }
};

const reducer = combineReducers({
  product,
  user,
  category,
  review,
});

export const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunkMiddleware)));
