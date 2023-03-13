import React from 'react'
import { NavLink, Route, Switch, useRouteMatch } from 'react-router-dom'
import AllUsers from './AllUsers'
import ValidatePosts from './ValidatePostsList'

const MenuCard = (props) => {
	let { path, url } = useRouteMatch()


	return (
		<>
			<div className=' h-full w-60 bg-slate-400 fixed bottom-0 '>
				<div className=' relative top-20 flex flex-col'>
					<NavLink 
						className='z-20' 
						activeClassName='text-white' 
						to={`${url}/allUsers`}
					>
						All Users
					</NavLink>
					<NavLink 
						className='z-20' 
						activeClassName='text-white' 
						to={`${url}/allPosts`}
					>
						All Posts
					</NavLink>
					<div>3</div>
					<div>4</div>
				</div>
			</div>

			<Switch>
				<Route exact path={path}></Route>
				<Route path={`${path}/allUsers`}>
					<AllUsers />
				</Route>
				<Route path={`${path}/allPosts`}>
					<ValidatePosts />
				</Route>
			</Switch>
		</>
	)
}

export default MenuCard
