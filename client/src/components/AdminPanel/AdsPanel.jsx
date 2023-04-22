import React, { useEffect, useState } from 'react'
import { BsImage } from 'react-icons/bs'
import { useTranslation } from 'react-i18next'
import Input from '../../utils/input/Input'
import { deleteAds, getAllAds, sendAds } from '../../actions/user'

const AdsPanel = () => {
	const { t } = useTranslation()

	const [drag, setDrag] = useState(false)
	const [image, setImage] = useState()
	const [link, setLink] = useState('')
	const [description, setDescription] = useState('')

	const [currentAds, setCurrentAds] = useState([])

	const dragStartHandler = (e) => {
		e.preventDefault()
		setDrag(true)
	}
	const dragLeaveHandler = (e) => {
		e.preventDefault()
		setDrag(false)
	}
	const onDropHandler = (e) => {
		e.preventDefault()
		let files = [...e.dataTransfer.files]
		setImage(files[0])
		setDrag(false)
		console.log(image)
	}

	const sendMessage = async () => {
		if (link.trim() === '' || description.trim() === '' || image === null) {
			alert('ur data is empty')
		} else {
			const formData = new FormData()
			formData.append('testImage', image)
			formData.append('link', link)
			formData.append('description', description)

			sendAds(formData)

			setImage()
			setLink('')
			setDescription('')
		}
	}

	useEffect(() => {
		getAllAds().then((res) => setCurrentAds(res))
		return () => {
			setCurrentAds([])
		}
	}, [])

	console.log(currentAds)

	const ads = currentAds.map((e) => {
		return (
			<div key={e._id}>
				<a href={e.link}>
					<img src={e.image} alt={e.image} className=' rounded-xl' />
				</a>
				<a href={e.link} className=' underline ml-4'>
					{e.description}
				</a>
			</div>
		)
	})

	const deleteAdsHandler = async () => {
		deleteAds()
		setTimeout(() => {
			window.location.reload()
		}, 500)
	}

	return (
		<div className='flex w-10/12 ml-60 -z-10 p-4'>
			<div className=' w-2/4 flex flex-col'>
				<p>Add Ads Image</p>
				{drag ? (
					<div
						onDragStart={(e) => dragStartHandler(e)}
						onDragLeave={(e) => dragLeaveHandler(e)}
						onDragOver={(e) => dragStartHandler(e)}
						onDrop={(e) => onDropHandler(e)}
						className='w-full h-28 flex flex-col items-center justify-center rounded-lg border-4 border-dotted border-sky-500 bg-white'
					>
						<BsImage />
						<div className=' text-xs'>Drop image</div>
					</div>
				) : (
					<div
						onDragStart={(e) => dragStartHandler(e)}
						onDragLeave={(e) => dragLeaveHandler(e)}
						onDragOver={(e) => dragStartHandler(e)}
						className='w-full h-28 flex flex-col items-center justify-center rounded-lg border-4 border-dotted border-slate-300 bg-white'
					>
						<BsImage />
						<div className=' text-xs'>
							{t('Drag and Drop image')}
						</div>
					</div>
				)}

				<p className='my-2'>{t('Link')}</p>

				<Input
					className='border-cblue rounded-xl focus:outline-none focus:border-cyellow focus:ring-cyellow'
					value={link}
					setValue={setLink}
					type={'text'}
					placeholder={t('Link including https://')}
				/>

				<p className='my-2'>{t('Description')}</p>

				<Input
					className='border-cblue rounded-xl focus:outline-none focus:border-cyellow focus:ring-cyellow'
					value={description}
					setValue={setDescription}
					type={'text'}
					placeholder={t('Description')}
				/>

				<button
					onClick={sendMessage}
					className=' w-28 py-3 my-4 bg-cyellow rounded-xl'
				>
					Send
				</button>
			</div>
			<div className=' w-2/4 pl-8'>
				<p>Current Ads</p>

				{currentAds.length > 0 ? (
					<div className='flex flex-col items-center'>
						<div className=' w-2/4 border-black text-cblue border-2 rounded-2xl drop-shadow dark:border-white dark:text-slate-50'>
							{ads}
						</div>
						<button
							onClick={deleteAdsHandler}
							className=' w-28 py-3 my-4 bg-red-400 rounded-xl'
						>
							Delete
						</button>
					</div>
				) : (
					<p>No Ads</p>
				)}
			</div>
		</div>
	)
}

export default AdsPanel
