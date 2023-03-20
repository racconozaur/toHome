import React from 'react'

const Comment = (props) => {
	return (
		<div
			key={props._id}
			className=' rounded-lg flex w-full mx-0 lg:mx-auto lg:w-5/12 border-4 p-4 m-4 dark:bg-slate-800 dark:text-white '
		>
			<div className='flex justify-center items-center bg-slate-50 w-10 h-10 text-slate-800 p-4 mr-2 rounded-full'>
				{props.author === undefined
					? null
					: props.author.slice(0, 1).toUpperCase()}
			</div>
			<div>
				<h2 className=' font-bold mb-2'>{props.author}</h2>
				<div>{props.comment}</div>
			</div>
		</div>
	)
}

export default Comment
