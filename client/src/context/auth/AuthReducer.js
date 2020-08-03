export default (state, action) => {
  switch (action.type) {
    case 'REGISTER_SUCCESS':
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: {...action.payload},
        isLoading: false,
        isAuthenticated: true,
        errors: null,
        isLoading: false
      };
    case 'LOAD_USER_SUCCESS':
      return {
        ...state,
        user: {...action.payload},
        isLoading: false,
        isAuthenticated: true,
        errors: null,
        isLoading: false
      };
    case 'REGISTER_FAILURE':
    case 'LOGIN_FAILURE':
    case 'LOAD_USER_FAILURE':
    case 'LOGOUT':
    case 'USER_DELETED':
      localStorage.removeItem('token');
      //Need to figure out how to dispatch way to setTimeout and clear errors so they are removed from UI
      return {
        ...state,
        token: null,
        isLoading: false,
        isAuthenticated: false,
        user: null,
        errors: action.payload,
        isLoading: false
      };
    default:
      return state;
  }
};
