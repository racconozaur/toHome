import React from 'react'
import { NavLink, Route, Switch, useRouteMatch } from 'react-router-dom'
import AllUsers from './AllUsers'
import ValidatePosts from './ValidatePostsList'
import { AiOutlineUser, AiOutlineFilePpt } from "react-icons/ai";

const MenuCard = (props) => {
	let { path, url } = useRouteMatch()


	return (
		<>
			<div className=' h-full w-60 bg-amber-300 fixed bottom-0 '>
				<div className=' relative top-20 flex flex-col font-medium text-xl ml-2'>
					<NavLink 
						className='z-20 flex items-center' 
						activeClassName='text-white' 
						to={`${url}/allUsers`}
					>
						<AiOutlineUser className='mr-1'/>
						All Users
					</NavLink>
					<NavLink 
						className='z-20 flex items-center' 
						activeClassName='text-white' 
						to={`${url}/allPosts`}
					>
						<AiOutlineFilePpt className='mr-1'/>
						Moderate Posts
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
