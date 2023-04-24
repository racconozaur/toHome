import React, { useEffect, useState } from 'react'
import { getAllActivePosts } from '../../actions/user'
import PostInfo from './PostInfo'

const AllPosts = () => {
	const [allActivePosts, setAllActivePosts] = useState([])

	useEffect(() => {
		getAllActivePosts().then((res) => setAllActivePosts(res))
		return () => {
			setAllActivePosts([])
		}
	}, [])

	const allModeratedPosts = allActivePosts.map((e) => {
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
			/>
		)
	})

	return (
		<div className='flex flex-col w-10/12 ml-60 -z-10'>
			{allModeratedPosts}
		</div>
	)
}

export default AllPosts
