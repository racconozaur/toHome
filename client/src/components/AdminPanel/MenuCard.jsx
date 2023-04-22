import React from 'react'
import { NavLink, Route, Switch, useRouteMatch } from 'react-router-dom'
import AllUsers from './AllUsers'
import ValidatePosts from './ValidatePostsList'
import { AiOutlineUser, AiOutlineFilePpt } from "react-icons/ai";
import AllPosts from './AllPosts';
import AdsPanel from './AdsPanel';

const MenuCard = (props) => {
	let { path, url } = useRouteMatch()


	return (
		<>
			<div className=' h-full w-60 bg-amber-300 fixed bottom-0 '>
				<div className=' relative top-20 flex flex-col font-medium text-xl ml-2'>
					<NavLink 
						className='z-20 flex items-center border-b-2 border-black' 
						activeClassName='text-white' 
						to={`${url}/allUsers`}
					>
						<AiOutlineUser className='mr-1'/>
						All Users
					</NavLink>
					<NavLink 
						className='z-20 flex items-center border-b-2 border-black' 
						activeClassName='text-white' 
						to={`${url}/allUnmoderatedPosts`}
					>
						<AiOutlineFilePpt className='mr-1'/>
						Moderate Posts
					</NavLink>
					<NavLink 
						className='z-20 flex items-center border-b-2 border-black' 
						activeClassName='text-white' 
						to={`${url}/allActivePosts`}
					>
						<AiOutlineFilePpt className='mr-1'/>
						Active Posts
					</NavLink>
					<NavLink 
						className='z-20 flex items-center border-b-2 border-black' 
						activeClassName='text-white' 
						to={`${url}/adsPanel`}
					>
						<AiOutlineFilePpt className='mr-1'/>
						Ads Panel
					</NavLink>
				</div>
			</div>

			<Switch>
				<Route exact path={path}></Route>
				<Route path={`${path}/allUsers`}>
					<AllUsers />
				</Route>
				<Route path={`${path}/allUnmoderatedPosts`}>
					<ValidatePosts />
				</Route>
				<Route path={`${path}/allActivePosts`}>
					<AllPosts/>
				</Route>
				<Route path={`${path}/adsPanel`}>
					<AdsPanel/>
				</Route>
			</Switch>
		</>
	)
}

export default MenuCard
