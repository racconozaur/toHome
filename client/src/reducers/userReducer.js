const SET_USER = "SET_USER"
const LOGOUT = "LOGOUT"
const SET_ADMIN = "SET_ADMIN"


const defaultState = {
    currentUser: {},
    isAuth: false,
    isAdmin: false
}

export default function userReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                currentUser: action.payload,
                isAuth: true,
                isAdmin: false
            }
        case SET_ADMIN:
            return {
                ...state,
                currentUser: action.payload,
                isAuth: true,
                isAdmin: true
            }
        case LOGOUT:
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            localStorage.removeItem('id')
            return {
                ...state,
                currentUser: {},
                isAuth: false,
                isAdmin: false
            }
            
        default:
            return state
    }
}


export const setUser = (user) => ({type: SET_USER, payload: user})
export const setAdmin = (user) => ({type: SET_ADMIN, payload: user})
export const logout = () => ({type: LOGOUT})
