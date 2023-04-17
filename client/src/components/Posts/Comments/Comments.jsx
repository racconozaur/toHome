import React, { useEffect, useState, useCallback } from 'react'
import { getCommentsFrom, sendComment } from '../../../actions/user'
import axios from '../../../handlers/axiosHandler'
import Button from '../../../utils/button/Button'
import { useTranslation } from 'react-i18next'
import Comment from './Comment'

const Comments = (props) => {
	const { t } = useTranslation()

	const [comments, setComments] = useState([])
	const [comment, setComment] = useState('')

	const user = localStorage.getItem('user')

	// const getCommentsFrom = useCallback(async () => {
	// 	try {
	// 		const res = await axios.get(`getcommentsfrom/${props.postId}`)
	// 		setComments(res.data)
	// 	} catch (e) {
	// 		alert(e.response.data.message)
	// 	}
	// }, [props.postId])

	const sendCommentHandler = async () => {
		if (comment.trim() === '') {
			alert('ur data is empty')
		} else {
			sendComment(props.postId, comment, user).then(setComment([]))
		}
	}

	useEffect(() => {
		getCommentsFrom(props.postId).then(res => setComments(res))
		return () => {
			setComments([])
		}
	}, [props.postId])

	const commentList = comments.map((e) => {
		return (
            <Comment
                key = {e._id}
                _id = {e._id}
                author = {e.author}
                comment = {e.comment}
            />
		)
	})

	return (
		<>
			{props.isAuth ? (
				<div className=' w-full mx-0 lg:mx-auto lg:w-5/12 my-4'>
					<textarea
						value={comment}
						onChange={(e) => setComment(e.target.value)}
						type='text'
						className='px-3 py-2  text-black bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none w-full focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1'
						placeholder={t('Your Comment')}
						required
					/>

					<div className=' flex mt-2'>
						<Button
							onClick={sendCommentHandler}
							className=' bg-amber-100 rounded-md  px-3 py-2  hover:bg-amber-200 '
						>
							{t('Send')}
						</Button>
					</div>
				</div>
			) : (
				<div className='w-full mx-0 lg:mx-auto lg:w-5/12 my-4'>
					<div className=' dark:text-white font-bold'>
						{t('notRegisteredComment')}
					</div>
				</div>
			)}

			<div className=' dark:text-white font-bold text-lg w-full mx-0 lg:mx-auto lg:w-5/12 my-4'>
				{t('Comments')}:
			</div>
			{commentList}
		</>
	)
}

export default Comments
