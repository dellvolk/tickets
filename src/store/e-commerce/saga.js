import { call, put, select, takeEvery } from "redux-saga/effects";

// Ecommerce Redux States
import {
  ADD_NEW_CUSTOMER,
  ADD_NEW_ORDER,
  ADD_PRODUCT_TO_CART,
  DELETE_CART_BY_ID,
  DELETE_CUSTOMER,
  DELETE_ORDER,
  GET_ARCHIVE_DATA,
  GET_CART_DATA,
  GET_CUSTOMERS,
  GET_ORDERS,
  GET_PRODUCT_DETAIL,
  GET_PRODUCTS,
  GET_SHOPS, POST_BUY_TICKETS,
  UPDATE_CUSTOMER,
  UPDATE_ORDER
} from "./actionTypes";
import {
  addCustomerFail,
  addCustomerSuccess,
  addOrderFail,
  addOrderSuccess,
  deleteCustomerFail,
  deleteCustomerSuccess,
  deleteOrderFail,
  deleteOrderSuccess, getArchiveDataSuccess,
  getCartDataFail,
  getCartDataSuccess,
  getCustomersFail,
  getCustomersSuccess,
  getOrdersFail,
  getOrdersSuccess,
  getProductDetailFail,
  getProductDetailSuccess,
  getProductsFail,
  getProductsSuccess,
  getShopsFail,
  getShopsSuccess, setProductFilters,
  updateCustomerFail,
  updateCustomerSuccess,
  updateOrderFail,
  updateOrderSuccess
} from "./actions";

//Include Both Helper File with needed methods
import {
  addNewCustomer,
  addNewOrder,
  deleteCustomer,
  deleteOrder,
  deleteProductFromCartById,
  getArchiveData,
  getCartData,
  getCustomers,
  getOrders,
  getProductDetail, getProductFilters,
  getProducts,
  getShops, postBuyTickets,
  postCartData,
  updateCustomer,
  updateOrder
} from "helpers/fakebackend_helper";
import { setUserInfo } from "../layout/actions";
import { showErrorMessage, showInfoMessage, showSuccessMessage } from "../../helpers/alerts";

function* fetchProducts() {
  try {
    const filters = yield select(state => state.ecommerce.filters)
    if (!filters.cities || !filters.categories) {
      const response = yield call(getProductFilters);
      yield put(setProductFilters(response));
    }
  } catch (e) {}

  try {
    const response = yield call(getProducts);
    yield put(getProductsSuccess(response));
  } catch (error) {
    yield put(getProductsFail(error));
  }
}

function* fetchProductDetail({ productId }) {
  try {
    const response = yield call(getProductDetail, productId);
    yield put(getProductDetailSuccess(response));
  } catch (error) {
    yield put(getProductDetailFail(error));
  }
}

function* fetchOrders() {
  try {
    const response = yield call(getOrders);
    yield put(getOrdersSuccess(response));
  } catch (error) {
    yield put(getOrdersFail(error));
  }
}

function* onAddNewOrder({ payload: order }) {
  try {
    const response = yield call(addNewOrder, order);
    yield put(addOrderSuccess(response));
  } catch (error) {

    yield put(addOrderFail(error));
  }
}

function* onUpdateOrder({ payload: order }) {
  try {
    const response = yield call(updateOrder, order);
    yield put(updateOrderSuccess(response));
  } catch (error) {
    yield put(updateOrderFail(error));
  }
}

function* onDeleteOrder({ payload: order }) {
  try {
    const response = yield call(deleteOrder, order);
    yield put(deleteOrderSuccess(response));
  } catch (error) {
    yield put(deleteOrderFail(error));
  }
}

function* fetchCartData() {
  try {
    const response = yield call(getCartData);
    yield put(getCartDataSuccess(response));
    yield put(setUserInfo({ cart_count: response.length }));
  } catch (error) {
    yield put(getCartDataFail(error));
  }
}

function* fetchArchiveData() {
  try {
    const response = yield call(getArchiveData);
    yield put(getArchiveDataSuccess(response));
  } catch (error) {
    console.log(error);
    // yield put(getCartDataFail(error));
  }
}

function* fetchCustomers() {
  try {
    const response = yield call(getCustomers);
    yield put(getCustomersSuccess(response));
  } catch (error) {
    yield put(getCustomersFail(error));
  }
}

function* fetchShops() {
  try {
    const response = yield call(getShops);
    yield put(getShopsSuccess(response));
  } catch (error) {
    yield put(getShopsFail(error));
  }
}

function* onAddNewCustomer({ payload: customer }) {
  try {
    const response = yield call(addNewCustomer, customer);
    yield put(addCustomerSuccess(response));
  } catch (error) {

    yield put(addCustomerFail(error));
  }
}

function* onUpdateCustomer({ payload: customer }) {
  try {
    const response = yield call(updateCustomer, customer);
    yield put(updateCustomerSuccess(response));
  } catch (error) {
    yield put(updateCustomerFail(error));
  }
}

function* onDeleteCustomer({ payload: customer }) {
  try {
    const response = yield call(deleteCustomer, customer);
    yield put(deleteCustomerSuccess(response));
  } catch (error) {
    yield put(deleteCustomerFail(error));
  }
}

function* onAddProductToCart({ payload: { history, id } }) {
  try {
    const cart_count = (yield select(state => state.Layout.user.cart_count)) || 0;
    const res = yield call(postCartData, id);
    yield put(setUserInfo({ cart_count: cart_count + 1 }));

    // yield put(deleteCustomerSuccess(response))
    if (history) {
      history.push("/ecommerce-cart");
    } else {
      showSuccessMessage(res);
    }
  } catch (error) {
    if (history) {
      history.push("/ecommerce-cart");
    } else {
      showInfoMessage(error);
    }
    // yield put(deleteCustomerFail(error))
  }
}

function* onDeleteProductFromCart({ payload: { id } }) {
  try {
    let cart_data = yield select(state => state.ecommerce.cartData);

    yield call(deleteProductFromCartById, id);
    cart_data = [...cart_data].filter(i => i.id !== id);
    yield put(setUserInfo({ cart_count: cart_data.length }));
    yield put(getCartDataSuccess(cart_data));
  } catch (error) {
    showErrorMessage(error);
    // yield put(deleteCustomerFail(error))
  }
}

function* onBuyTickets({ payload: { data, history } }) {
  try {
    for (let i of data) {
      yield call(postBuyTickets, {
        count: i.data_attr,
        cart_id: i.id,
        ticket: i.ticket
      })
    }
    // yield call(deleteProductFromCartById, id);
    // cart_data = [...cart_data].filter(i => i.id !== id);
    yield put(setUserInfo({ cart_count: 0 }));
    yield put(getCartDataSuccess([]));
    history.push('/profile')
    showSuccessMessage('Квитки успішно куплені!')
  } catch (error) {
    showErrorMessage(error);
    // yield put(deleteCustomerFail(error))
  }
}


function* ecommerceSaga() {
  yield takeEvery(GET_PRODUCTS, fetchProducts);
  yield takeEvery(GET_PRODUCT_DETAIL, fetchProductDetail);
  yield takeEvery(GET_ORDERS, fetchOrders);
  yield takeEvery(ADD_NEW_ORDER, onAddNewOrder);
  yield takeEvery(UPDATE_ORDER, onUpdateOrder);
  yield takeEvery(DELETE_ORDER, onDeleteOrder);
  yield takeEvery(GET_CART_DATA, fetchCartData);
  yield takeEvery(GET_ARCHIVE_DATA, fetchArchiveData);
  yield takeEvery(GET_CUSTOMERS, fetchCustomers);
  yield takeEvery(GET_SHOPS, fetchShops);
  yield takeEvery(ADD_NEW_CUSTOMER, onAddNewCustomer);
  yield takeEvery(UPDATE_CUSTOMER, onUpdateCustomer);
  yield takeEvery(DELETE_CUSTOMER, onDeleteCustomer);
  yield takeEvery(ADD_PRODUCT_TO_CART, onAddProductToCart);
  yield takeEvery(DELETE_CART_BY_ID, onDeleteProductFromCart);
  yield takeEvery(POST_BUY_TICKETS, onBuyTickets);
}

export default ecommerceSaga;
