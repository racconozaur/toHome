import React, { useEffect, useState } from 'react'
import { sendPost } from '../../actions/user'
import Post from '../Posts/Post'
import { useDispatch, useSelector } from 'react-redux'
import { setAdmin } from '../../reducers/userReducer'
// import axios from 'axios'
import { Route, Switch, useParams, useRouteMatch } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { BsImage } from 'react-icons/bs'
import { useTranslation } from 'react-i18next'
import axios from '../../handlers/axiosHandler'
import { NavLink } from 'react-router-dom'
import ButtonFilter from '../../utils/button/ButtonFilter'
import { useCallback } from 'react'
import MenuCard from '../AdminPanel/MenuCard'
import ModeratedPosts from '../Posts/ModeratedPosts'
import io from 'socket.io-client'

const socket = io.connect('http://localhost:5000')

const User = (props) => {
	const email = localStorage.getItem('user')
	const dispatch = useDispatch()
	const { t } = useTranslation()

	const [userInfo, setUserInfo] = useState([])
	const [posts, setPosts] = useState([])

	let { path, url } = useRouteMatch()

	const getoneuser = useCallback(async (email) => {
		try {
			const res = await axios.get(`getoneuser/${email}`)
			setUserInfo(res.data)
		} catch (e) {
			alert(e.response.data.message)
		}
	}, [])

	const getPostsFrom = useCallback(async (sender) => {
		try {
			const res = await axios.get(`getpostsfrom/${sender}`)
			setPosts(res.data)
		} catch (e) {
			alert(e.response.data.message)
		}
	}, [])

	if (userInfo.role === 'admin') {
		dispatch(setAdmin())
	}

	const [isConnected, setIsConnected] = useState(socket.connected)

	socket.emit('join_room', email)

	useEffect(() => {
		socket.on('connect', () => {
			setIsConnected(true)
		})
		socket.on('disconnect', () => {
			setIsConnected(false)
		})

		return () => {
			socket.off('connect')
			socket.off('disconnect')
		}
	}, [])

	useEffect(() => {
		getoneuser(email)
		getPostsFrom(email)
	}, [getoneuser, getPostsFrom, email])

	// test
	const [msg, setMsg] = useState('')

	useEffect(() => {
		socket.on('receive_message', (data) => {
			console.log(data.message)
			setMsg(data.message)
		})
	}, [])

	console.log(isConnected, socket.id)

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
			/>
		)
	})

	return (
		<>
			<div className=' bg-white w-full container mx-auto py-9 h-full'>
				<div className=' w-10/12 h-80 border-2 rounded-xl border-cblue mx-auto px-36 py-8 flex justify-between text-cblue'>
					<div>
						<div className='flex items-center'>
							<div className='flex justify-center items-center bg-slate-50 w-24 h-24 text-slate-800 p-4 rounded-full text-4xl font-bold'>
								{userInfo.name === undefined
									? null
									: userInfo.name.slice(0, 1).toUpperCase()}
							</div>
							<p className=' mx-12 text-2xl font-medium'>
								{t('Name')}: {userInfo.name}
							</p>
						</div>
						<p className=' mt-7 text-xl font-medium'>
							{t('Number')}: +{userInfo.number}
						</p>
						<p className=' my-4 text-xl font-normal'>
							E-mail: {userInfo.email}
						</p>
						<p className=' text-xl font-norma'>
							{t('Registeration Date')}: {userInfo.date}
						</p>
					</div>
					<div className='flex flex-col items-end justify-between'>
						<div className='flex flex-col'>
							{userInfo.status === 'active' ? (
								<Link
									to={{
										pathname: '/addpost',
										state: {
											number: userInfo.number,
											email: userInfo.email,
											name: userInfo.name,
										},
									}}
								>
									<button className=' w-28 py-3 bg-cyellow rounded-xl mb-4'>
										{t('Add Post')}
									</button>
								</Link>
							) : (
								<p>You cant make posts</p>
							)}

							{userInfo.role === 'admin' ? (
								<Link to={'/admin'}>
									<button className=' w-28 py-3 bg-cyellow rounded-xl'>
										{t('Admin panel')}
									</button>
								</Link>
							) : null}
						</div>
						<div className='flex font-normal text-xl'>
							<div className=''>
								<p>
									{t('Status')}: {userInfo.status}
								</p>
								<p>
									{t('Role')}: {userInfo.role}
								</p>
							</div>
							<div className=' flex flex-col justify-around ml-5'>
								<div
									className={` w-4 h-4 rounded-full ${
										userInfo.status === 'active'
											? 'bg-green-400'
											: 'bg-red-400'
									}`}
								></div>
								<div
									className={` w-4 h-4 rounded-full ${
										userInfo.role === 'user'
											? 'bg-blue-300'
											: 'bg-yellow-400'
									}`}
								></div>
							</div>
						</div>
					</div>
				</div>

				<div className=' w-2/4 mx-auto '>
					<div className='flex my-9 border-b-2'>
						<NavLink
							className='mx-4 py-2 border-cblue'
							activeClassName='border-b-2 text-cyellow'
							to={`${url}/moderatedPosts`}
						>
							Active Posts
						</NavLink>
						<NavLink
							className='mx-4 py-2 border-cblue'
							activeClassName='border-b-2 text-cyellow'
							to={`${url}/onModerationPosts`}
						>
							On Moderation
						</NavLink>
					</div>
					<h2 className=' text-black text-2xl font-medium ml-4 my-9'>
						{t('Your posts')}
						Message: {msg}
					</h2>
					{posts.length > 0 ? (
						<div className=' w-full'>{data.reverse()}</div>
					) : (
						<div className=' dark:text-white'>
							{t('loading')}...
						</div>
					)}
				</div>
			</div>

			<Switch>
				<Route exact path={path}></Route>
				<Route path={`${path}/moderatedPosts`}>
					<ModeratedPosts/>
				</Route>
				<Route path={`${path}/onModerationPosts`}>
					<ValidatePosts />
				</Route>
			</Switch>
		</>
	)
}

export default User
