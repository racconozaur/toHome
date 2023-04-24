import React, { useState, useEffect } from 'react'
import Post from './Post'
import { useTranslation } from 'react-i18next'
import { getActivePostsFrom, getRewiewPostsFrom } from '../../actions/user'

const UserPosts = (props) => {
	const [posts, setPosts] = useState([])
	const [postsState, setPostsState] = useState(true)

	const { t } = useTranslation()

	const email = localStorage.getItem('user')

	const handleActive = (e) => {
		e.preventDefault()
		setPostsState(true)
	}
	const handleReview = (e) => {
		e.preventDefault()
		setPostsState(false)
	}

	useEffect(() => {
		if (postsState) {
			getActivePostsFrom(email)
				.then(setPosts([]))
				.then((res) => setPosts(res))
		} else {
			getRewiewPostsFrom(email)
				.then(setPosts([]))
				.then((res) => setPosts(res))
		}
		return () => {
			setPosts([])
		}
	}, [postsState, email])

	const data = posts.map((e) => {
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
				validation={e.validation}
			/>
		)
	})

	return (
		<div className=' w-2/4 mx-auto '>
			<div className='flex my-9 border-b-2'>
				<button
					className={`mx-4 py-2 ${
						postsState
							? 'border-cblue border-b-2 text-cyellow dark:border-white'
							: ''
					}`}
					onClick={handleActive}
				>
					{t('Active Posts')}
				</button>
				<button
					className={`mx-4 py-2 ${
						!postsState
							? 'border-cblue border-b-2 text-cyellow dark:border-white'
							: ''
					}`}
					onClick={handleReview}
				>
					{t('On Moderation')}
				</button>
			</div>
			<h2 className=' text-black text-2xl font-medium ml-4 my-9 dark:text-slate-50'>
				{t('Your posts')}
			</h2>
			<div className=' w-full'>{data.reverse()}</div>
		</div>
	)
}

export default UserPosts
