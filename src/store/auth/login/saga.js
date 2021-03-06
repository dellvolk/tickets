import { takeEvery, put, call, takeLatest } from "redux-saga/effects"

// Login Redux States
import { LOGIN_USER, LOGOUT_USER, SOCIAL_LOGIN } from "./actionTypes"
import { loginSuccess, logoutUserSuccess, apiError } from "./actions"

//Include Both Helper File with needed methods
import { getFirebaseBackend } from "../../../helpers/firebase_helper"
import {
  postFakeLogin,
  postJwtLogin,
  postSocialLogin,
} from "../../../helpers/fakebackend_helper"
import { axiosApi } from "../../../helpers/api_helper";
import { setUserInfo } from "../../layout/actions";

const fireBaseBackend = getFirebaseBackend()

function* loginUser({ payload: { user, history } }) {
  try {
    const response = yield call(postJwtLogin, {
      email: user.email,
      password: user.password,
    })
    localStorage.setItem("authUser", JSON.stringify(response))
    axiosApi.defaults.headers.common["Authorization"] = `Token ${response.id}`
    yield put(loginSuccess(response))
    history.push("/dashboard")
  } catch (error) {
    yield put(apiError(error.response.data))
  }
}

function* logoutUser({ payload: { history } }) {
  try {
    localStorage.removeItem("authUser")
    axiosApi.defaults.headers.common["Authorization"] = ""
    yield put(setUserInfo({cart_count: null }))
    history.push("/login")
  } catch (error) {
    yield put(apiError(error))
  }
}

function* socialLogin({ payload: { data, history, type } }) {
  try {
    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      const fireBaseBackend = getFirebaseBackend()
      const response = yield call(
        fireBaseBackend.socialLoginUser,
        data,
        type
      )
      localStorage.setItem("authUser", JSON.stringify(response))
      yield put(loginSuccess(response))
    } else {
      const response = yield call(postSocialLogin, data)
      localStorage.setItem("authUser", JSON.stringify(response))
      yield put(loginSuccess(response))
    }
    history.push("/dashboard")
  } catch (error) {
    yield put(apiError(error))
  }
}

function* authSaga() {
  yield takeEvery(LOGIN_USER, loginUser)
  yield takeLatest(SOCIAL_LOGIN, socialLogin)
  yield takeEvery(LOGOUT_USER, logoutUser)
}

export default authSaga
