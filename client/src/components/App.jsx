import React, { useEffect } from 'react'
import Navbar from './navbar/Navbar'
import './app.css'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import Registration from './authorization/Registration'
import Login from './authorization/Login'
import NotFound from './nooFound/NotFound'
import { useDispatch, useSelector } from 'react-redux'
import { auth } from '../actions/user'
import User from './User/User'
import PostsList from './Posts/PostsList'
import PostDescription from './Posts/PostDescription'
import MenuCard from './AdminPanel/MenuCard'
import useLocalstorage from '../hooks/use-localstorage'
import i18n from '../i18n'
import AddPost from './Posts/AddPost'
import ValidatePosts from './AdminPanel/ValidatePostsList'

function App() {
	const isAuth = useSelector((state) => state.user.isAuth)

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

	return (
		<BrowserRouter>
			<Navbar
				onDark={darkModeHandler}
				handleLenguageChange={handleLenguageChange}
				language={language}
			/>
			<main className='px-4 lg:px-0 '>
				{!isAuth && (
					<Switch>
						<Route path='/' exact>
							<Redirect to='/all' />
						</Route>
						<Route path='/all' exact>
							<PostsList />
						</Route>
						<Route path='/registration' component={Registration} />
						<Route path='/login' component={Login} />
						<Route exact path='*' component={NotFound} />

						<Route path='/postinfo'>
							<PostDescription />
						</Route>
					</Switch>
				)}

				{isAuth ? (
					<Switch>
						<Route path='/' exact>
							<Redirect to='/all' />
						</Route>
						<Route path='/all'>
							<PostsList />
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
						{/* {
							isAdmin ? (
						
									<Route path={'/admin'}>
										<MenuCard/>
									</Route>
								
							) : null
						} */}
						<Route path={'/admin'}>
							<MenuCard/>
						</Route>

						<Route path='*' component={NotFound} />
					</Switch>
				) : null}

				{/* {isAdmin && isAuth ? (
					<Switch>
						<Route path={'/admin'}>
							<MenuCard/>
						</Route>
			
					</Switch>
				) : null} */}
			</main>
		</BrowserRouter>
	)
}

export default App