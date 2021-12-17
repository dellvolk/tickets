import { all, call, fork, put, takeEvery } from "redux-saga/effects";

// Login Redux States
import { EDIT_PROFILE } from "./actionTypes";
import { profileError, profileSuccess } from "./actions";

//Include Both Helper File with needed methods
import { getFirebaseBackend } from "../../../helpers/firebase_helper";
import { postJwtProfile } from "../../../helpers/fakebackend_helper";

function* editProfile({ payload: { user } }) {
  try {
    const response = yield call(postJwtProfile, {
      password: user.password
    })
    yield put(profileSuccess(response))
  } catch (error) {
    yield put(profileError(error))
  }
}
export function* watchProfile() {
  yield takeEvery(EDIT_PROFILE, editProfile)
}

function* ProfileSaga() {
  yield all([fork(watchProfile)])
}

export default ProfileSaga
