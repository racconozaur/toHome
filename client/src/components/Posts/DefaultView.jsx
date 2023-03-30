import React from 'react'
import Input from '../../utils/input/Input'
import ButtonFilter from '../../utils/button/ButtonFilter'
import PostsList from './PostsList'

const DefaultView = (props) => {
	return (
		<div className='w-10/12 container mx-auto flex justify-between'>
			<div className=' w-2/3 '>
				<h2 className=' text-black text-2xl font-medium ml-10'>
					Results
				</h2>
				<PostsList postData={props.postData}/>
			</div>

			<div className=' w-[29%] h-[550px] mt-16 border-black text-cblue border-2 rounded-2xl drop-shadow'>
				<div className=' border-b-2 border-black px-8 py-4 text-2xl font-semibold'>
					Filter
				</div>
				<div className='px-8'>
					<h3 className='mt-5 mb-4 font-semibold text-lg'>Type</h3>
					<div className='flex justify-between text-sm font-normal'>
						<ButtonFilter>House</ButtonFilter>
						<ButtonFilter>Land</ButtonFilter>
						<ButtonFilter>Appartament</ButtonFilter>
					</div>

					<h3 className='mt-5 mb-4 font-semibold text-lg'>Status</h3>
					<div className='flex flex-wrap text-sm font-normal'>
						<ButtonFilter>New</ButtonFilter>
						<ButtonFilter>Development</ButtonFilter>
						<ButtonFilter>Old</ButtonFilter>
						<ButtonFilter>Commerical</ButtonFilter>
						<ButtonFilter>Residential</ButtonFilter>
					</div>

					<h3 className='mt-5 mb-4 font-semibold text-lg'>Price</h3>
					<Input
						className='bg-cblue w-full h-2 caret-cblue  accent-cyellow cursor-pointer rounded-xl '
						type={'range'}
					/>
				</div>
			</div>
		</div>
	)
}

export default DefaultView
