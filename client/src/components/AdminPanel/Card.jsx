import React from 'react'
import Button from '../../utils/button/Button'
import { deleteuser, updateRole, updateStatus } from '../../actions/user'
import { Link, useRouteMatch } from 'react-router-dom'

const Card = (props) => {
	const { url } = useRouteMatch()

	const blockHandler = () => {
		updateStatus(props.id).then(res => props.handleUserRoleChange(res, props.id))
		
	}

	const roleHandler = () => {
		updateRole(props.id).then(res => props.handleUserRoleChange(res, props.id))
		
	}

	const deleteHandler = async () => {
		deleteuser(props.id)

		setTimeout(() => {
			window.location.reload()
		}, 500)
	}

	return (
		<>
			<tr>
				<td className='px-6 py-4 text-sm font-bold dark:text-white whitespace-nowrap hover:text-slate-300'>
					{props.role === 'admin' ? (
						props.mail
					) : (
						<Link to={`${url}/${props.mail}`}>{props.mail}</Link>
					)}
				</td>
				<td className='px-6 py-4 text-sm dark:text-white font-bold  whitespace-nowrap'>
					{props.date}
				</td>
				<td className='px-6 py-4 text-sm dark:text-white font-bold whitespace-nowrap'>
					{props.status}
				</td>
				<td className='px-6 py-4 text-sm dark:text-white font-bold whitespace-nowrap flex justify-center'>
					{props.role}
				</td>
				<td className='px-6 py-4 text-sm font-bold text-right whitespace-nowrap'>
					<Button
						className={
							props.role === 'admin'
								? 'bg-blue-400 w-20 hover:bg-blue-500'
								: ' bg-yellow-400 w-20 hover:bg-yellow-500'
						}
						onClick={roleHandler}
					>
						{props.role === 'admin' ? 'dis admin' : 'set admin'}
					</Button>
				</td>
				<td className='px-6 py-4 text-sm font-bold text-right whitespace-nowrap'>
					{props.role === 'user' ? (
						<Button
							className={
								props.status === 'active'
									? 'bg-red-400 w-20 hover:bg-red-500'
									: ' bg-green-300 w-20 hover:bg-green-500'
							}
							onClick={blockHandler}
							disabled={props.role === 'admin' ? true : false}
						>
							{props.status === 'active' ? 'Block' : 'Unblock'}
						</Button>
					) : (
						<p className=' dark:text-white'>cant block</p>
					)}
				</td>
				<td className='px-6 py-4 text-sm font-bold text-right whitespace-nowrap '>
					<Button
						className={
							' bg-slate-300 dark:bg-white w-20 hover:bg-slate-200'
						}
						onClick={deleteHandler}
					>
						Delete
					</Button>
				</td>
			</tr>

			{/* <Switch>
                <Route path={`${path}/:topicId`}>
                    <
                </Route>
            </Switch> */}
		</>
	)
}

export default Card
