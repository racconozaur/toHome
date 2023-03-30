import React from 'react'
import Post from './Post'

const PostsList = (props) => {
	const allPosts = props.postData.map((e) => {
		return (
			<Post
				key={e._id}
				id={e._id}
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

	return <>{allPosts.reverse()}</>
}

export default PostsList
