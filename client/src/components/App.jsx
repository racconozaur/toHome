import React, { useEffect, Suspense } from 'react'
import Navbar from './navbar/Navbar'
import './app.css'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { auth } from '../actions/user'
import useLocalstorage from '../hooks/use-localstorage'
import i18n from '../i18n'
import Spinner from '../utils/Spinner/Spinner'

function App() {
	const isAuth = useSelector((state) => state.user.isAuth)
	const isAdmin = useSelector((state) => state.user.isAdmin)

	const dispatch = useDispatch()

	const darkModeHandler = () => {
		document.documentElement.classList.toggle('white')
		document.documentElement.classList.toggle('dark')
	}

	useEffect(() => {
		dispatch(auth())
	}, [dispatch])

	const [language, setLanguage] = useLocalstorage('language', 'ru')
	const handleLenguageChange = () => {
		if (language === 'en') {
			i18n.changeLanguage('ru')
			setLanguage('ru')
		} else if (language === 'ru') {
			i18n.changeLanguage('en')
			setLanguage('en')
		}
	}

	const Registration = React.lazy(() =>
		import('./authorization/Registration')
	)
	const Login = React.lazy(() => import('./authorization/Login'))
	const PostsWrapper = React.lazy(() => import('./Posts/PostsWrapper'))
	const PostDescription = React.lazy(() => import('./Posts/PostDescription'))
	const NotFound = React.lazy(() => import('./nooFound/NotFound'))
	const User = React.lazy(() => import('./User/User'))
	const AddPost = React.lazy(() => import('./Posts/AddPost'))
	const MenuCard = React.lazy(() => import('./AdminPanel/MenuCard'))

	return (
		<BrowserRouter>
			<Navbar
				onDark={darkModeHandler}
				handleLenguageChange={handleLenguageChange}
				language={language}
			/>
			<main className='px-4 mt-[70px] lg:px-0 h-full'>
				<Suspense
					fallback={
						<div className='flex justify-center'>
							<Spinner />
						</div>
					}
				>
					{!isAuth && (
						<Switch>
							<Route path='/' exact>
								<Redirect to='/all' />
							</Route>
							<Route path='/all'>
								<PostsWrapper />
							</Route>
							<Route path='/registration'>
								<Registration />
							</Route>
							<Route path='/login'>
								<Login />
							</Route>
							<Route path='/postinfo'>
								<PostDescription />
							</Route>
							<Route exact path='*'>
								<NotFound />
							</Route>
						</Switch>
					)}

					{isAuth && (
						<Switch>
							<Route path='/' exact>
								<Redirect to='/all' />
							</Route>
							<Route path='/all'>
								<PostsWrapper />
							</Route>
							<Route path={'/user'}>
								<User />
							</Route>
							<Route path={'/addpost'}>
								<AddPost />
							</Route>
							<Route path='/postinfo'>
								<PostDescription />
							</Route>
							{isAdmin && (
								<Route path={'/admin'}>
									<MenuCard />
								</Route>
							)}

							<Route path='*'>
								<NotFound />
							</Route>
						</Switch>
					)}
				</Suspense>
			</main>
		</BrowserRouter>
	)
}

export default App
