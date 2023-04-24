import React, { useState } from 'react'
import Input from '../../utils/input/Input'
import { useTranslation } from 'react-i18next'
import { BsImage } from 'react-icons/bs'
import { sendPost } from '../../actions/user'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
import ReactMapGL, { Marker, NavigationControl } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import mapboxgl from 'mapbox-gl'
// import Geocoder from 'mapbox-gl-geocoder'

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN

const AddPost = (props) => {
	const { t } = useTranslation()

	const uselocation = useLocation()
	const { number, email, name } = uselocation.state

	const [title, setTitle] = useState('')
	const [content, setContent] = useState('')
	const [rooms, setRooms] = useState(0)
	const [square, setSquare] = useState(0)
	const [price, setPrice] = useState(0)
	const [image, setImage] = useState()

	const [locationMarker, setLocationMarker] = useState({
		longitude: 69.2477,
		latitude: 41.2866,
	})

	const [viewport, setViewport] = useState({
		longitude: 69.2477,
		latitude: 41.2866,
		zoom: 11,
		width: '100%',
		height: '100%',
	})

	function handleMapClick(event) {
		setLocationMarker({
			latitude: event.lngLat.lat,
			longitude: event.lngLat.lng,
		})
	}

	// const [address, setAddress] = useState('')

	const [drag, setDrag] = useState(false)

	// status
	const optionsStatus = [
		{ value: '', text: '--Choose an option--' },
		{ value: 'New', text: 'New1' },
		{ value: 'Development', text: 'Development' },
		{ value: 'Old', text: 'Old' },
		{ value: 'Commerical', text: 'Commerical' },
		{ value: 'Residential', text: 'Residential' },
	]
	const [status, setStatus] = useState(optionsStatus[1].value)
	const handleStatusChange = (event) => {
		setStatus(event.target.value)
	}

	// type
	const optionsType = [
		{ value: '', text: '--Choose an option--' },
		{ value: 'House', text: 'House' },
		{ value: 'Land', text: 'Land' },
		{ value: 'Appartament', text: 'Appartament' },
	]
	const [type, setType] = useState(optionsType[1].value)
	const handleTypeChange = (event) => {
		setType(event.target.value)
	}

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
		if (
			title.trim() === '' ||
			content.trim() === '' ||
			rooms.trim() === '' ||
			square.trim() === '' ||
			price.trim() === '' ||
			content.trim() === '' ||
			status.trim() === '' ||
			type.trim() === ''
		) {
			alert('ur data is empty')
		} else {
			console.log(
				name,
				email,
				number,
				title,
				status,
				type,
				rooms,
				square,
				locationMarker,
				price,
				content
			)
			const formData = new FormData()
			formData.append('sender', email)
			formData.append('name', name)
			formData.append('number', number)
			formData.append('title', title)
			formData.append('status', status)
			formData.append('type', type)
			formData.append('rooms', rooms)
			formData.append('square', square)
			formData.append('location', JSON.stringify(locationMarker))
			formData.append('price', price)
			formData.append('content', content)

			formData.append('testImage', image)

			console.log(formData)
			sendPost(formData)

			setTitle('')
			setStatus('')
			setType('')
			setRooms(0)
			setSquare(0)
			setLocationMarker({ longitude: 69.2477, latitude: 41.2866 })
			setPrice(0)
			setContent('')
			setImage()
		}
	}

	return (
		<>
			<div className=' bg-white my-4 flex p-10 flex-col w-full mx-0 lg:mx-auto lg:w-3/6 border-4 dark:bg-slate-800 rounded-lg drop-shadow-xl'>
				<p className='mb-2'>{t('Title')}</p>

				<Input
					className='border-cblue rounded-xl focus:outline-none focus:border-cyellow focus:ring-cyellow'
					value={title}
					setValue={setTitle}
					type={'email'}
					placeholder={t('Title')}
				/>

				<p className='mt-4 mb-2'>{t('Status')}</p>

				<select
					value={status}
					onChange={handleStatusChange}
					className='h-12 pl-10 bg-white text-slate-400 border-2 border-cblue rounded-xl placeholder-slate-400 focus:outline-none focus:border-cyellow focus:ring-cyellow block sm:text-sm focus:ring-1'
				>
					{optionsStatus.map((option) => (
						<option key={option.value} value={option.value}>
							{option.text}
						</option>
					))}
				</select>

				<p className='mt-4 mb-2'>{t('Type')}</p>
				<select
					value={type}
					onChange={handleTypeChange}
					className='h-12 pl-10 bg-white text-slate-400 border-2 border-cblue rounded-xl placeholder-slate-400 focus:outline-none focus:border-cyellow focus:ring-cyellow block sm:text-sm focus:ring-1'
				>
					{optionsType.map((option) => (
						<option key={option.value} value={option.value}>
							{option.text}
						</option>
					))}
				</select>

				<p className='mt-4 mb-2'>{t('Number of rooms')}</p>
				<Input
					value={rooms}
					setValue={setRooms}
					type={'number'}
					min={0}
					max={100}
					className='border-cblue rounded-xl focus:outline-none focus:border-cyellow focus:ring-cyellow block sm:text-sm focus:ring-1'
					placeholder={t('Number of rooms')}
					required
				/>

				<p className='mt-4 mb-2'>{t('Square')}</p>
				<Input
					value={square}
					setValue={setSquare}
					type={'number'}
					min={0}
					className='border-cblue rounded-xl focus:outline-none focus:border-cyellow focus:ring-cyellow block sm:text-sm focus:ring-1'
					placeholder={'Square'}
					required
				/>

				<p className='mt-4 mb-2'>{t('Price')}</p>
				<Input
					value={price}
					setValue={setPrice}
					type={'number'}
					min={0}
					className='border-cblue rounded-xl focus:outline-none focus:border-cyellow focus:ring-cyellow block sm:text-sm focus:ring-1'
					placeholder={'Price'}
					required
				/>

				<p className='mt-4 mb-2'>{t('Description')}</p>
				<textarea
					value={content}
					onChange={(e) => setContent(e.target.value)}
					type='text'
					className='px-3 py-2 bg-white h-44 border shadow-sm border-cblue rounded-xl placeholder-slate-400 focus:outline-none focus:border-cyellow focus:ring-cyellow block sm:text-sm focus:ring-1'
					placeholder={t('Description')}
					required
				/>

				<p className='mt-4 mb-2'>
					{t('Location')}: Longitude:{' '}
					{locationMarker.longitude.toFixed(4)} | Latitude:
					{locationMarker.latitude.toFixed(4)}
				</p>
				<p>{t('LocTxt')}</p>
				<div className='h-96 relative border shadow-sm border-cblue'>
					<ReactMapGL
						{...viewport}
						mapStyle='mapbox://styles/mapbox/streets-v11'
						mapboxApiAccessToken={
							process.env.REACT_APP_MAPBOX_TOKEN
						}
						onMove={(newViewport) => setViewport(newViewport)}
						onClick={handleMapClick}
					>
						{locationMarker.latitude &&
							locationMarker.longitude && (
								<>
									<Marker
										latitude={locationMarker.latitude}
										longitude={locationMarker.longitude}
										draggable
										onDragEnd={(event) => {
											setLocationMarker({
												latitude: event.lngLat.lat,
												longitude: event.lngLat.lng,
											})
										}}
									/>

									<NavigationControl position='bottom-right' />
								</>
							)}
					</ReactMapGL>
				</div>

				<p className='mt-4 mb-2'>{t('Image')}</p>
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

				<div className=' flex w-full mt-8'>
					<Link to={'/user'}>
						<button className=' w-28 py-3 bg-red-300 rounded-xl'>
							Back
						</button>
					</Link>

					<button
						onClick={sendMessage}
						className=' w-28 py-3 mx-4 bg-cyellow rounded-xl'
					>
						Send
					</button>
				</div>
			</div>
		</>
	)
}

export default AddPost
