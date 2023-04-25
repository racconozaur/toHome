import { setUser } from '../reducers/userReducer'
import axios from '../handlers/axiosHandler'

export const registration = async (email, password, number, name) => {
	try {
		const response = await axios.post(`registration`, {
			email,
			password,
			number,
			name,
		})
		alert(response.data.message)
	} catch (e) {
		alert(e.response.data.message)
	}
}

export const login = (email, password) => {
	// save user data in state
	return async (dispatch) => {
		try {
			const response = await axios.post(`login`, {
				email,
				password,
			})
			dispatch(setUser(response.data.user))
			localStorage.setItem('token', response.data.token)
		} catch (e) {
			alert(e.response.data.message)
		}
	}
}

export const auth = () => {
	return async (dispatch) => {
		try {
			const response = await axios.get(`auth`, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},
			})
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
		const res = await axios.patch(`user/${id}`)
		const newStatus = await res.data.user
		return newStatus
	} catch (e) {
		alert(e.response.data.message)
	}
}

export const updateRole = async (id) => {
	try {
		const res = await axios.patch(`userrole/${id}`)
		const newRole = await res.data.user
		return newRole
	} catch (e) {
		alert(e.response.data.message)
	}
}

export const getoneuser = async (email) => {
	try {
		const res = await axios.get(`getoneuser/${email}`)
		return res.data
	} catch (e) {
		alert(e.response.data.message)
	}
}

export const getAllUserInfo = async () => {
	try {
		const res = await axios.get(`allusers`)
		return res.data
	} catch (e) {
		console.log(e)
	}
}

// posts

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

export const updatePost = async (
	id,
	title,
	status,
	type,
	rooms,
	square,
	price,
	content
) => {
	try {
		await axios.patch(`post/${id}`, {
			title,
			status,
			type,
			rooms,
			square,
			price,
			content,
		})
	} catch (e) {
		alert(e.response.data.message)
	}
}

export const likePost = async (id, username) => {
	try {
		await axios.patch(`likepost/${id}`, {
			username,
		})
	} catch (e) {
		alert(e.response.data.message)
	}
}

export const dislikePost = async (id, username) => {
	try {
		await axios.patch(`likepost/${id}`, {
			username,
		})
	} catch (e) {
		alert(e.response.data.message)
	}
}

export const acceptPostFrom = async (id) => {
	try {
		const res = await axios.patch(`acceptpostfrom/${id}`)
		const newPost = await res.data.post
		return newPost
	} catch (e) {
		alert(e.response.data.message)
	}
}

export const denyPostFrom = async (id) => {
	try {
		const res = await axios.patch(`denypostfrom/${id}`)
		const newPost = await res.data.post
		return newPost
	} catch (e) {
		alert(e.response.data.message)
	}
}

// get

export const getAllActivePosts = async () => {
	try {
		const res = await axios.get(
			`allactiveposts`,

			{
				headers: {
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},
			}
		)
		return res.data
	} catch (e) {
		console.log(e)
	}
}

export const getActivePostsFrom = async (sender) => {
	try {
		const res = await axios.get(`getactivepostsfrom/${sender}`)
		return res.data
	} catch (e) {
		alert(e.response.data.message)
	}
}

export const getRewiewPostsFrom = async (sender) => {
	try {
		const res = await axios.get(`getreviewpostsfrom/${sender}`)
		return res.data
	} catch (e) {
		alert(e.response.data.message)
	}
}

export const getOnePost = async (postId) => {
	try {
		const res = await axios.get(`getonepost/${postId}`)
		return res.data
	} catch (e) {
		alert(e.response.data.message)
	}
}

export const getAllNotActivePosts = async () => {
	try {
		const res = await axios.get(`allnotactiveposts`)
		return res.data
	} catch (e) {
		console.log(e)
	}
}

export const getAllPosts = async () => {
	try {
		const res = await axios.get(`/allposts`)
		return res.data
	} catch (e) {
		console.log(e)
	}
}

// comments

export const sendComment = async (postId, comment, author) => {
	try {
		const response = await axios.post(`comment`, {
			postId,
			comment,
			author,
		})
		const newComment = response.data.newComment
		alert(response.data.message)
		return newComment
	} catch (e) {
		alert(e.response.data.message)
	}
}

export const getCommentsFrom = async (postId) => {
	try {
		const res = await axios.get(`getcommentsfrom/${postId}`)
		return res.data
	} catch (e) {
		alert(e.response.data.message)
	}
}

// location

export const getLocatoinPlace = async (longitude, latitude, key) => {
	try {
		const res = await axios.get(
			`https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${key}`
		)
		return res.data
	} catch (e) {
		alert(e.response.data.message)
	}
}

// ads

export const sendAds = async (formData) => {
	try {
		const response = await axios.post(`postads`, formData)
		const newAds = await response.data.ads
		alert(response.data.message)
		return newAds
	} catch (e) {
		alert(e.response.data.message)
	}
}

export const getAllAds = async () => {
	try {
		const res = await axios.get(`/allAds`)
		return res.data
	} catch (e) {
		console.log(e)
	}
}

export const deleteAds = async (id) => {
	try {
		await axios.delete(`deleteAds`)
	} catch (e) {
		alert(e.response.data.message)
	}
}
