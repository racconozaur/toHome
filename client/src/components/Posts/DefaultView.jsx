import React, { useState, useEffect } from 'react'
import Input from '../../utils/input/Input'
import ButtonFilter from '../../utils/button/ButtonFilter'
import PostsList from './PostsList'
import { useTranslation } from 'react-i18next'
import { getAllActivePosts, getAllAds } from '../../actions/user'
import { AiOutlineDown } from 'react-icons/ai'

const DefaultView = (props) => {
	const { t } = useTranslation()

	const [postData, setPostData] = useState([])
	const [adsData, setAdsData] = useState([])
	const [showFilter, setShowFilter] = useState(false)

	const changeShowFilter = () => {
		setShowFilter((prev) => !prev)
		console.log(showFilter)
	}

	useEffect(() => {
		getAllActivePosts().then((res) => setPostData(res))
		getAllAds().then((res) => setAdsData(res))
		return () => {
			setPostData([])
			setAdsData([])
		}
	}, [])

	const ads = adsData.map((e) => {
		return (
			<div key={e._id}>
				<a href={e.link} target="_blank" rel="noreferrer">
					<img src={e.image} alt={e.image} className=' rounded-xl' />
				</a>
				<a href={e.link} target="_blank" rel="noreferrer" className=' underline ml-4'>
					{e.description}
				</a>
			</div>
		)
	})

	return (
		<div className='w-10/12 container mx-auto flex flex-col-reverse justify-between md:flex-row'>
			<div className=' w-fill md:w-2/3 '>
				<h2 className=' text-black text-2xl font-medium ml-10 dark:text-slate-50'>
					{t('Results')}
				</h2>

				<PostsList postData={postData} value={props.value} />
			</div>

			<div className=' w-full h-max mt-0  md:w-[29%] md:mt-16 '>
				<div className='border-black text-cblue border-2 rounded-2xl drop-shadow dark:border-white dark:text-slate-50'>
					<div
						className={` flex justify-between border-b-2 ${
							showFilter && 'border-none'
						} border-black px-8 py-4 text-2xl font-semibold dark:border-white`}
					>
						{t('Filter')}
						<AiOutlineDown
							className={` block md:hidden hover:cursor-pointer rotate-180 ${
								showFilter && 'rotate-0'
							}`}
							onClick={changeShowFilter}
						/>
					</div>
					<div
						className={`px-8 transition-all ${
							showFilter && ' hidden'
						}`}
					>
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

						<h3 className='mt-5 mb-4 font-semibold text-lg'>
							Price
						</h3>
						<Input
							className='bg-cblue w-full h-2 caret-cblue  accent-cyellow cursor-pointer rounded-xl '
							type={'range'}
						/>
					</div>
				</div>
				{adsData.length > 0 ? (
					<div className=' mt-8 border-black text-cblue border-2 rounded-2xl drop-shadow dark:border-white dark:text-slate-50'>
						{ads}
					</div>
				) : null}
			</div>
		</div>
	)
}

export default DefaultView
