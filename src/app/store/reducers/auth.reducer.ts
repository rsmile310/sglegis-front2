import { AuthAction, AuthTypes, AuthUser } from "../actions/auth.actions";

const initialState = {
    user: null
}

export default (state = initialState, action: AuthAction) => {  
    switch (action.type) {
        case AuthTypes.GET:
            return {
                ...state,
                user: action.payload
            }    
        default:
            return state;
    }
}

