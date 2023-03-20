import React, { useEffect, useState, useCallback } from 'react'
import Post from './Post'
import { useTranslation } from 'react-i18next'
import axios from '../../handlers/axiosHandler'
import {
	HiOutlineSearch,
	HiOutlineLocationMarker,
	HiOutlineMenuAlt1,
} from 'react-icons/hi'
import Input from '../../utils/input/Input'
import ButtonFilter from '../../utils/button/ButtonFilter'

const PostsList = (props) => {
	const { t } = useTranslation()

	const [value, setValue] = useState('')
	const [sorted, setSorted] = useState(false)

	const [postData, setPostData] = useState([])

	const getAllActivePosts = useCallback(async () => {
		try {
			const res = await axios.get(
				`allactiveposts`,

				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem(
							'token'
						)}`,
					},
				}
			)
			setPostData(res.data)
			return res.data
		} catch (e) {
			console.log(e)
		}
	}, [])

	useEffect(() => {
		getAllActivePosts()
	}, [getAllActivePosts])

	const sortedHandler = () => {
		setSorted(!sorted)
	}

	const sortedPosts = postData.sort((a, b) => {
		return +b.rate - +a.rate
	})

	const filteredPosts = postData.filter((post) => {
		return post.title.toLowerCase().includes(value.toLowerCase())
	})

	const allPosts = filteredPosts.map((e) => {
		return (
			<Post
				key={e._id}
				id={e._id}
				sender={e.sender}
				title={e.title}
				content={e.content}
				img={e.image}
				location={e.location}
				price={e.price}
				square={e.square}
				status={e.status}
				type={e.type}
				likes={e.likes}
				number={e.number}
				rooms={e.rooms}
				moderated={e.moderated}
			/>
		)
	})

	const allSortedPosts = sortedPosts.map((e) => (
		<Post
			key={e._id}
			id={e._id}
			sender={e.sender}
			title={e.title}
			content={e.content}
			img={e.image}
			location={e.location}
			price={e.price}
			square={e.square}
			status={e.status}
			type={e.type}
			likes={e.likes}
			number={e.number}
			rooms={e.rooms}
		/>
	))

	return (
		<div className=' bg-white w-full container mx-auto '>
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

				<div className=' w-56 h-12 border-2 border-cblue rounded-2xl hidden text-xl lg:flex lg:justify-around lg:items-center'>
					<div className='flex items-center justify-center w-2/4 h-full border-r-2 border-cblue hover:cursor-pointer bg-cyellow rounded-l-2xl '>
						<HiOutlineMenuAlt1 />
						List
					</div>
					<div className='flex items-center justify-center w-2/4 h-full border-l-2 border-cblue hover:cursor-pointer'>
						<HiOutlineLocationMarker />
						Map
					</div>
				</div>
			</div>

			<div className='w-10/12 container mx-auto flex justify-between'>
				<div className=' w-2/3 '>
					<h2 className=' text-black text-2xl font-medium ml-10'>
						Results
					</h2>
					{allPosts.reverse()}
				</div>

				<div className=' w-[29%] h-[550px] mt-16 border-black text-cblue border-2 rounded-2xl drop-shadow'>
					<div className=' border-b-2 border-black px-8 py-4 text-2xl font-semibold'>
						Filter
					</div>
					<div className='px-8'>
						<h3 className='mt-5 mb-4 font-semibold text-lg'>
							Type
						</h3>
						<div className='flex justify-between text-sm font-normal'>
							<ButtonFilter>House</ButtonFilter>
							<ButtonFilter>Land</ButtonFilter>
							<ButtonFilter>Appartament</ButtonFilter>
						</div>

						<h3 className='mt-5 mb-4 font-semibold text-lg'>
							Status
						</h3>
						<div className='flex flex-wrap text-sm font-normal'>
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
			</div>
		</div>

		// <div className=' container mx-auto'>
		//     <div className='flex flex-col mt-4'>
		//         <input
		//             value={value}
		//             onChange={e => setValue(e.target.value)}
		//             type="text"
		//             className="px-3 py-2 bg-white w-full mx-0 lg:mx-auto lg:w-3/6 border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block  rounded-md sm:text-sm focus:ring-1"
		//             placeholder={t("Search by title")} required
		//         />

		//         <div className=' w-full mx-0 lg:mx-auto lg:w-3/6 flex border-4 rounded-lg p-4 mt-4 dark:text-white font-semibold'>
		//             {t("Recent tags")}: {allTags} ...
		//         </div>

		//         <div className='flex justify-between font-bold mx-auto w-5/12 mt-4'>
		//             <div className='flex items-center'>
		//                 <h2 className='dark:text-white'>{t("Sort by")}:</h2>
		//                 <Button
		//                     onClick={sortedHandler}
		//                     className={'bg-yellow-100 p-2'}
		//                 >
		//                     {t("Rate")}
		//                 </Button>
		//                 <Button
		//                     onClick={sortedHandler}
		//                     className={'bg-blue-300 p-2'}
		//                 >
		//                     {t("Latest")}

		//                 </Button>
		//             </div>
		//             <div className='flex items-center font-normal dark:text-white'>{t("Sorted by")} {sorted ? t("Rate"): t("Latest")}</div>
		//         </div>

		//     </div>

		//     <div>
		//         {sorted ? allSortedPosts : allPosts.reverse()}
		//     </div>

		// </div>
	)
}

export default PostsList
