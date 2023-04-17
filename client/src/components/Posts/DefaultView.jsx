import React, { useState, useEffect } from 'react'
import Input from '../../utils/input/Input'
import ButtonFilter from '../../utils/button/ButtonFilter'
import PostsList from './PostsList'
import { useTranslation } from 'react-i18next'
import { getAllActivePosts } from '../../actions/user'

const DefaultView = () => {
	const { t } = useTranslation()

	const [postData, setPostData] = useState([])

	useEffect(() => {
		getAllActivePosts().then((res) => setPostData(res))
		return () => {
			setPostData([])
		}
	}, [])

	return (
		<div className='w-10/12 container mx-auto flex flex-col-reverse justify-between md:flex-row'>
			<div className=' w-fill md:w-2/3 '>
				<h2 className=' text-black text-2xl font-medium ml-10 dark:text-slate-50'>
					{t('Results')}
				</h2>
				<PostsList postData={postData} />
			</div>

			<div className=' w-full h-max mt-16 border-black text-cblue border-2 rounded-2xl drop-shadow md:w-[29%] dark:border-white dark:text-slate-50'>
				<div className=' border-b-2 border-black px-8 py-4 text-2xl font-semibold dark:border-white'>
					{t('Filter')}
				</div>
				<div className='px-8'>
					<h3 className='mt-5 mb-4 font-semibold text-lg'>
						{t('Type')}
					</h3>
					<div className='flex justify-between flex-wrap text-sm font-normal'>
						<ButtonFilter>House</ButtonFilter>
						<ButtonFilter>Land</ButtonFilter>
						<ButtonFilter>Appartament</ButtonFilter>
					</div>

					<h3 className='mt-5 mb-4 font-semibold text-lg'>
						{t('Status')}
					</h3>
					<div className='flex justify-between content-between flex-wrap text-sm font-normal'>
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
