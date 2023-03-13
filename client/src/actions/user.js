// import axios from 'axios'
import {setUser} from "../reducers/userReducer";
import axios from '../handlers/axiosHandler'

export const registration = async (email, password, number, name) => {
    try {
        const response = await axios.post(`registration`, {
            email, password, number, name
        })
        alert(response.data.message)
    } catch (e) {
        alert(e.response.data.message)
    }
}

export const login =  (email, password) => {
    return async dispatch => {
        try {
            const response = await axios.post(`login`, {
                email,
                password
            })
            dispatch(setUser(response.data.user))
            localStorage.setItem('token', response.data.token)
        } catch (e) {
            alert(e.response.data.message)
        }
    }
}

export const auth =  () => {
    return async dispatch => {
        try {
            const response = await axios.get(`auth`,
                {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}}
            )
            dispatch(setUser(response.data.user))
            localStorage.setItem('token', response.data.token)
        } catch (e) {
            alert(e.response.data.message)
            localStorage.removeItem('token')
        }
    }
}

export const deleteuser = async (id) => {
    try {
        await axios.delete(`delete/${id}`)
        
    } catch (e) {
        alert(e.response.data.message)
    }
}

export const updateStatus = async (id) => {
    try {
        await axios.patch(`user/${id}`)
        
    } catch (e) {
        alert(e.response.data.message)
    }
}

export const updateRole = async (id) => {
    try {
        await axios.patch(`userrole/${id}`)
        
    } catch (e) {
        alert(e.response.data.message)
    }
}



// post recomendation

export const sendPost = async (formData) => {
    try {
        const response = await axios.post(`post`, formData)
        alert(response.data.message)
    } catch (e) {
        alert(e.response.data.message)
    }
}

export const deletePost = async (id) => {
    try {
        await axios.delete(`deletepost/${id}`)
        
    } catch (e) {
        alert(e.response.data.message)
    }
}

export const updatePost = async (id, title, content, rate, category, hashtags) => {
    try {
        await axios.patch(`post/${id}`, {
            title, content, rate, category, hashtags
        })
    } catch (e) {
        alert(e.response.data.message)
    }
}

export const likePost = async (id, username) => {
    try {
        await axios.patch(`likepost/${id}`, {
            username
        })
    } catch (e) {
        alert(e.response.data.message)
    }
}

export const dislikePost = async (id, username) => {
    try {
        await axios.patch(`likepost/${id}`, {
            username
        })
    } catch (e) {
        alert(e.response.data.message)
    }
}

export const acceptPostFrom = async (id) => {
    try {
        await axios.patch(`acceptpostfrom/${id}`)
        
    } catch (e) {
        alert(e.response.data.message)
    }
}

export const denyPostFrom = async (id) => {
    try {
        await axios.patch(`denypostfrom/${id}`)
        
    } catch (e) {
        alert(e.response.data.message)
    }
}

// comment

export const sendComment = async (postId, comment, author) => {
    try {
        const response = await axios.post(`comment`, {
            postId, comment, author
        })
        alert(response.data.message)
    } catch (e) {
        alert(e.response.data.message)
    }
}



