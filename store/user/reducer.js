import actionTypes from './actionTypes';

const initialState = {
  name: '',
  email: '',
  id: null,
  investedCredits: 0,
  token: null
};

const loginSuccess = (state, action) => {
  const { _id: id, ...userData } = action.user;
  const user = { ...userData, id };
  localStorage.setItem("user", JSON.stringify(user));
  return {
    ...state,
    ...user
  };
};

const logout = (state, action) => {
  localStorage.removeItem('user');
  return initialState;
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS: return loginSuccess(state, action);
    case actionTypes.LOGOUT: return logout(state, action);
    default: return state;
  }
};

export default reducer;
