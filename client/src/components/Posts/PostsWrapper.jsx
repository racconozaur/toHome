import React, { useEffect, useState, useCallback } from 'react'
import Post from './Post'
import { useTranslation } from 'react-i18next'
import axios from '../../handlers/axiosHandler'
import {
	HiOutlineSearch,
	HiOutlineLocationMarker,
	HiOutlineMenuAlt1,
} from 'react-icons/hi'
import Input from '../../utils/input/Input'
import ButtonFilter from '../../utils/button/ButtonFilter'
import PostsList from './PostsList'
import DefaultView from './DefaultView'
import { NavLink, Route, Switch, useRouteMatch } from 'react-router-dom'
import MapView from './MapView'

const PostsWrapper = (props) => {
	const { t } = useTranslation()

	const [value, setValue] = useState('')
	
	// const [sorted, setSorted] = useState(false)

	// const [postData, setPostData] = useState([])

	// const getAllActivePosts = useCallback(async () => {
	// 	try {
	// 		const res = await axios.get(
	// 			`allactiveposts`,

	// 			{
	// 				headers: {
	// 					Authorization: `Bearer ${localStorage.getItem(
	// 						'token'
	// 					)}`,
	// 				},
	// 			}
	// 		)
	// 		setPostData(res.data)
	// 		return res.data
	// 	} catch (e) {
	// 		console.log(e)
	// 	}
	// }, [])

	// useEffect(() => {
	// 	getAllActivePosts()
	// }, [getAllActivePosts])

	// const sortedHandler = () => {
	// 	setSorted(!sorted)
	// }

	// const sortedPosts = postData.sort((a, b) => {
	// 	return +b.rate - +a.rate
	// })

	// const filteredPosts = postData.filter((post) => {
	// 	return post.title.toLowerCase().includes(value.toLowerCase())
	// })

	// const allPosts = postData.map((e) => {
	// 	return (
	// 		<Post
	// 			key={e._id}
	// 			id={e._id}
	// 			sender={e.sender}
	// 			title={e.title}
	// 			content={e.content}
	// 			img={e.image}
	// 			location={e.location}
	// 			price={e.price}
	// 			square={e.square}
	// 			status={e.status}
	// 			type={e.type}
	// 			likes={e.likes}
	// 			number={e.number}
	// 			rooms={e.rooms}
	// 			moderated={e.moderated}
	// 		/>
	// 	)
	// })

	// const allSortedPosts = sortedPosts.map((e) => (
	// 	<Post
	// 		key={e._id}
	// 		id={e._id}
	// 		sender={e.sender}
	// 		title={e.title}
	// 		content={e.content}
	// 		img={e.image}
	// 		location={e.location}
	// 		price={e.price}
	// 		square={e.square}
	// 		status={e.status}
	// 		type={e.type}
	// 		likes={e.likes}
	// 		number={e.number}
	// 		rooms={e.rooms}
	// 	/>
	// ))
	let {path, url} = useRouteMatch()

	return (
		<div className=' bg-white w-full container mx-auto relative'>
			<div className='py-9 w-10/12 flex justify-between container mx-auto'>
				<div className='flex items-center text-lg w-full lg:w-4/12'>
					<HiOutlineSearch
						className='absolute ml-4'
						viewBox='0 0 24 24'
						width='24'
					/>
					<Input
						className=' border-black rounded-2xl '
						value={value}
						setValue={setValue}
						type={'text'}
						placeholder={t('Search by title')}
					/>
				</div>

				<div className=' w-56 h-12 border-2 border-cblue rounded-2xl hidden text-xl lg:flex lg:justify-around lg:items-center'>
					<NavLink 
						className='flex items-center justify-center w-2/4 h-full border-r-2 border-cblue hover:cursor-pointer  rounded-l-2xl '
						activeClassName='bg-cyellow'
						to={`${url}/posts`}	
					>
						<HiOutlineMenuAlt1 />
						List
					</NavLink>
					<NavLink 
						className='flex items-center justify-center w-2/4 h-full border-l-2 border-cblue hover:cursor-pointer rounded-r-2xl'
						activeClassName='bg-cyellow'
						to={`${url}/map`}
					>
						<HiOutlineLocationMarker />
						Map
					</NavLink>
				</div>
			</div>

			<Switch>
				<Route exact path={path}>
					<DefaultView/>
				</Route>
				<Route path={`${path}/posts`}>
					<DefaultView/>
				</Route>
				<Route path={`${path}/map`}>
					<MapView/>
				</Route>
			</Switch>
			{/* <DefaultView/> */}

		</div>	
	)
}

export default PostsWrapper
