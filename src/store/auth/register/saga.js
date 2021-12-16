import { call, put, takeEvery } from "redux-saga/effects";

//Account Redux states
import { REGISTER_USER } from "./actionTypes";
import { registerUserFailed, registerUserSuccessful } from "./actions";

//Include Both Helper File with needed methods
import { getFirebaseBackend } from "../../../helpers/firebase_helper";
import { postJwtRegister } from "../../../helpers/fakebackend_helper";

// initialize relavant method of both Auth
const fireBaseBackend = getFirebaseBackend();

// Is user register successfull then direct plot user in redux.
function* registerUser({ payload: { user } }) {
  try {
    const response = yield call(postJwtRegister, "/register", user);
    yield put(registerUserSuccessful(response));
  } catch (error) {
    console.log(error);
    window.er = error
    yield put(registerUserFailed(error));
  }
}

function* accountSaga() {
  yield takeEvery(REGISTER_USER, registerUser);
}

export default accountSaga;
