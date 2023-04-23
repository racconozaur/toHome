import React, { useEffect, useState } from 'react'
import PostInfo from './PostInfo'
import { getAllNotActivePosts } from '../../actions/user'

const ValidatePosts = () => {
	const [validatePosts, setValidatedPosts] = useState([])

	useEffect(() => {
		getAllNotActivePosts().then((res) => setValidatedPosts(res))
		return () => {
			setValidatedPosts([])
		}
	}, [])

	const handlePostChange = (data, id) => {
		const newData = validatePosts.map((prevObj) => {
			if (prevObj._id === id) {
				return data
			}
			return prevObj
		})

		setValidatedPosts(newData)
		console.log(validatePosts)
	}

	const allNotModeratedPosts = validatePosts.map((e) => {
		if (e.validation === 'under review') {
			return (
				<PostInfo
					key={e._id}
					id={e._id}
					name={e.name}
					sender={e.sender}
					title={e.title}
					content={e.content}
					img={e.image}
					location={e.location}
					price={e.price}
					square={e.square}
					status={e.status}
					type={e.type}
					likes={e.likes}
					number={e.number}
					rooms={e.rooms}
					moderated={e.moderated}
					handlePostChange={handlePostChange}
				/>
			)
		}
		return (
			<div className=' flex justify-center mt-10'>
				No unmoderated posts yet
			</div>
		)
	})

	return (
		<div className='flex flex-col w-10/12 ml-60 -z-10'>
			{validatePosts.length === 0 ? (
				<div className=' flex justify-center mt-10'>
					No unmoderated posts yet
				</div>
			) : (
				allNotModeratedPosts
			)}
		</div>
	)
}

export default ValidatePosts
