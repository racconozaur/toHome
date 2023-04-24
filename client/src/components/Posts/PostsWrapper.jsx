import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
	HiOutlineSearch,
	HiOutlineLocationMarker,
	HiOutlineMenuAlt1,
} from 'react-icons/hi'
import Input from '../../utils/input/Input'
import DefaultView from './DefaultView'
import { NavLink, Route, Switch, useRouteMatch } from 'react-router-dom'
import MapView from './MapView'

const PostsWrapper = (props) => {
	const { t } = useTranslation()

	const [value, setValue] = useState('')

	let { path, url } = useRouteMatch()

	return (
		<div className=' bg-white w-full h-full min-h-full container mx-auto relative dark:bg-slate-800'>
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

				<div className=' w-56 h-12 border-2 border-cblue rounded-2xl hidden text-xl lg:flex lg:justify-around lg:items-center dark:border-white'>
					<NavLink
						className='flex items-center  justify-center w-2/4 h-full border-r-2 border-cblue hover:cursor-pointer  rounded-l-2xl dark:border-white'
						activeClassName='bg-cyellow'
						to={`${url}/posts`}
					>
						<HiOutlineMenuAlt1 />
						{t('List')}
					</NavLink>
					<NavLink
						className='flex items-center justify-center w-2/4 h-full border-l-2 border-cblue hover:cursor-pointer rounded-r-2xl dark:border-white'
						activeClassName='bg-cyellow'
						to={`${url}/map`}
					>
						<HiOutlineLocationMarker />
						{t('Map')}
					</NavLink>
				</div>
			</div>

			<Switch>
				<Route exact path={path}>
					<DefaultView value={value} />
				</Route>
				<Route path={`${path}/posts`}>
					<DefaultView value={value} />
				</Route>
				<Route path={`${path}/map`}>
					<MapView value={value} />
				</Route>
			</Switch>
			{/* <DefaultView/> */}
		</div>
	)
}

export default PostsWrapper
