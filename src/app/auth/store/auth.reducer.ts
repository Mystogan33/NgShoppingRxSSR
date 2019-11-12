
import * as AuthActions from './auth.actions';
import { User } from 'src/app/models/user.model';

export interface State {
  user: User;
  authError: string;
  loading: boolean;
}

const initialState: State = {
  user: null,
  authError: null,
  loading: false
};

export function authReducer(state = initialState, action: AuthActions.AuthActions) {
  switch (action.type) {
    case AuthActions.LOGIN_START:
    case AuthActions.SIGNUP_START:
    return {
      ...state,
      authError: null,
      loading: true
    }
    case AuthActions.AUTHENTICATE_SUCCESS:
    const user = new User(
      action.payload.email,
      action.payload.userId,
      action.payload.token,
      action.payload.expirationDate
    );
    return {
      ...state,
      authError: null,
      user,
      loading: false
    }
    case AuthActions.AUTHENTICATE_FAIL:
    return {
      ...state,
      user: null,
      authError: action.payload,
      loading: false
    }
    case AuthActions.LOGOUT:
    return {
      ...state,
      user: null
    }
    case AuthActions.CLEAR_ERROR:
    return {
      ...state,
      authError: null
    }
    default:
    return state;
  }
}