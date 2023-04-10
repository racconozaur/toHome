import React, { useState, useCallback, useEffect } from 'react'
import axios from '../../handlers/axiosHandler'
import Post from './Post'
import { AiOutlineUser, AiOutlineFilePpt } from "react-icons/ai";
import { useTranslation } from 'react-i18next'

const UserPosts = (props) => {
	const [posts, setPosts] = useState([])
    const [postsState, setPostsState] = useState(true)

	const { t } = useTranslation()

	const getActivePostsFrom = useCallback(async (sender) => {
		try {
			const res = await axios.get(`getactivepostsfrom/${sender}`)
            setPosts([])
            setPosts(res.data)
		} catch (e) {
			alert(e.response.data.message)
		}
	}, [])

    const getRewiewPostsFrom = useCallback(async (sender) => {
		try {
			const res = await axios.get(`getreviewpostsfrom/${sender}`)
            setPosts([])
			setPosts(res.data)
		} catch (e) {
			alert(e.response.data.message)
		}
	}, [])

    const handleActive = (e) => {
        e.preventDefault()
        setPostsState(true)
    }
    const handleReview = (e) => {
        e.preventDefault()
        setPostsState(false)
    } 

	useEffect(() => {
        if(postsState){
            getActivePostsFrom(props.email)
        }
        else{
            getRewiewPostsFrom(props.email)
        }
		
	}, [getActivePostsFrom, getRewiewPostsFrom, postsState, props.email])

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
					className={`mx-4 py-2 ${postsState ? 'border-cblue border-b-2 text-cyellow dark:border-white' : ''}`}
                    onClick={handleActive}
				>
					{t("Active Posts")}
				</button>
				<button
					className={`mx-4 py-2 ${!postsState ? 'border-cblue border-b-2 text-cyellow dark:border-white' : ''}`}
                    onClick={handleReview}
				>
					{t("On Moderation")}
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
