import React, { useEffect, useState } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { deletePost, getLocatoinPlace, getOnePost } from '../../actions/user'
import {
	AiOutlineEdit,
	AiOutlineCheck,
	AiOutlineDelete,
	AiOutlineFilePdf,
} from 'react-icons/ai'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Comments from './Comments/Comments'
import { updatePost } from '../../actions/user'
import 'mapbox-gl/dist/mapbox-gl.css'
import MapCard from '../Map/MapCard'
import JsPDF from 'jspdf'

const PostDescription = (props) => {
	const isAuth = useSelector((state) => state.user.isAuth)
	const userEmail = localStorage.getItem('user')

	const { t } = useTranslation()
	const history = useHistory()
	const locationStste = useLocation()
	const { postId, location } = locationStste.state

	const [onePost, setOnePost] = useState({})

	const [edit, setEdit] = useState(false)
	const [newTitle, setNewTitle] = useState('')
	const [newPrice, setNewPrice] = useState(0)
	const [newRooms, setNewRooms] = useState(0)
	const [newSquare, setNewSquare] = useState(0)
	const [newLocation, setNewLocation] = useState('')
	const [newDescription, setNewDescription] = useState('')

	const [place, setPlace] = useState('')

	// status
	const optionsStatus = [
		{ value: '', text: '--Choose an option--' },
		{ value: 'New', text: 'New' },
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

	useEffect(() => {
		getOnePost(postId).then((res) => setOnePost(res))
		getLocatoinPlace(
			location.longitude.toFixed(4),
			location.latitude.toFixed(4),
			process.env.REACT_APP_MAPBOX_TOKEN
		).then((res) => setPlace(res))
		return () => {
			setOnePost([])
		}
	}, [location.latitude, location.longitude, postId])

	const directplace = place.features

	console.log(directplace)

	const editHandler = () => {
		setEdit(!edit)
	}

	const saveHandler = async () => {
		if (
			newTitle.trim() === '' ||
			newPrice.trim() === null ||
			newRooms.trim() === null ||
			newSquare.trim() === null ||
			newDescription.trim() === '' ||
			status.trim() === '' ||
			type.trim() === ''
		) {
			setEdit(!edit)
		} else {
			updatePost(
				postId,
				newTitle,
				status,
				type,
				newRooms,
				newSquare,
				newPrice,
				newDescription
			)
			setNewTitle('')
			setNewPrice(0)
			setNewRooms(0)
			setNewSquare(0)
			setType(optionsType[1].value)
			setStatus(optionsStatus[1].value)
			setNewLocation('')
			setNewDescription('')
			setEdit(!edit)
			window.location.reload()
		}
	}

	const deleteHandler = async () => {
		console.log(onePost._id)
		deletePost(onePost._id)
		setTimeout(() => {
			history.push('/all')
		}, 500)
	}

	const generatePDF = async () => {
		const pdf = new JsPDF('portrait', 'pt', 'a4')
		let img = new Image()
		img.src = `${onePost.image}`
		img.onload = () => {
			pdf.text(`Author: ${onePost.sender}`, 10, 20)
			pdf.text(`Name: ${onePost.name}`, 10, 40)
			pdf.text(`Number: ${onePost.number}`, 10, 60)
			pdf.text(`Title: ${onePost.title}`, 10, 80)
			pdf.text(`Status: ${onePost.status}`, 10, 100)
			pdf.text(`Type: ${onePost.type}`, 10, 120)
			pdf.text(`Rooms: ${onePost.rooms}`, 10, 140)
			pdf.text(`Square: ${onePost.square}`, 10, 160)
			pdf.text(`Location: ${onePost.location}`, 10, 180)
			pdf.text(`Price: ${onePost.price}`, 10, 200)
			pdf.text(`Description: ${props.content}`, 10, 220)
			pdf.addImage(img, 'png', 10, 260, 0, 400)

			pdf.save(`${onePost.title}.pdf`)
		}
	}

	console.log(onePost);

	return (
		<div className=' container mx-auto'>
			<div className='w-full  mx-0 text-cblue lg:mx-auto lg:w-7/12  my-4'>
				<div className='p-4 bg-white border-2 border-black rounded-lg dark:border-white dark:bg-slate-800'>
					<img src={onePost.image} alt={onePost.image} />
				</div>

				<div className=' p-4 my-8 bg-white border-2 border-black rounded-lg dark:border-white dark:bg-slate-800 dark:text-slate-50'>
					<p className=' font-bold text-2xl my-4'>
						{t('Title')}:{' '}
						{edit === false ? (
							onePost.title
						) : (
							<>
								{onePost.title}
								<input
									value={newTitle}
									onChange={(e) =>
										setNewTitle(e.target.value)
									}
									type='text'
									className='px-3 py-2 text-black bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block  rounded-md sm:text-sm focus:ring-1'
									placeholder={t('Title')}
									required
								/>
							</>
						)}
					</p>
					<p className=' font-semibold text-2xl'>
						{t('Price')}: USD $
						{edit === false ? (
							onePost.price
						) : (
							<>
								{onePost.price}
								<input
									value={newPrice}
									onChange={(e) =>
										setNewPrice(e.target.value)
									}
									type='number'
									className='px-3 py-2 text-black bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block  rounded-md sm:text-sm focus:ring-1'
									placeholder={t('Price')}
									required
								/>
							</>
						)}
					</p>
					<p className=' text-xl my-4'>
						{t('Type')}: {onePost.type}
						{edit === false ? null : (
							<>
								<select
									value={type}
									onChange={handleTypeChange}
									className='px-3 py-2 text-black bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1'
								>
									{optionsType.map((option) => (
										<option
											key={option.value}
											value={option.value}
										>
											{option.text}
										</option>
									))}
								</select>
							</>
						)}
					</p>
					<p>
						{t('Status')}: {onePost.status}
						{edit === false ? null : (
							<>
								<select
									value={status}
									onChange={handleStatusChange}
									className='px-3 py-2 text-black bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1'
								>
									{optionsStatus.map((option) => (
										<option
											key={option.value}
											value={option.value}
										>
											{option.text}
										</option>
									))}
								</select>
							</>
						)}
					</p>
					<p>
						{t('Number of rooms')}:{' '}
						{edit === false ? (
							onePost.rooms
						) : (
							<>
								{onePost.rooms}
								<input
									value={newRooms}
									onChange={(e) =>
										setNewRooms(e.target.value)
									}
									type='number'
									className='px-3 py-2 text-black bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block  rounded-md sm:text-sm focus:ring-1'
									placeholder={t('Number of rooms')}
									required
								/>
							</>
						)}
					</p>
					<p>
						{t('Square')}:{' '}
						{edit === false ? (
							<>
								{onePost.square}m<sup>2</sup>
							</>
						) : (
							<>
								{onePost.square}
								<input
									value={newSquare}
									onChange={(e) =>
										setNewSquare(e.target.value)
									}
									type='number'
									className='px-3 py-2 text-black bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block  rounded-md sm:text-sm focus:ring-1'
									placeholder={t('Square')}
									required
								/>
							</>
						)}
					</p>
					<div>
						{t('Description')}:{' '}
						{edit === false ? (
							<ReactMarkdown
								className=' font-normal'
								children={onePost.content}
								remarkPlugins={[remarkGfm]}
							/>
						) : (
							<>
								<div className=' w-3/5'>{props.content}</div>
								<textarea
									value={newDescription}
									onChange={(e) =>
										setNewDescription(e.target.value)
									}
									type='text'
									className='px-3 py-2 my-2 text-black bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block  rounded-md sm:text-sm focus:ring-1'
									placeholder={t('Description')}
									required
								/>
							</>
						)}
					</div>

					<div>
						{t('Location')}:Latitude: {location.latitude.toFixed(4)}{' '}
						| Longitude: {location.longitude.toFixed(4)} | Place: {}
						<MapCard location={location} />
					</div>
				</div>

				<div className=' p-4 my-4 bg-white border-2 border-blac rounded-lg text-lg dark:border-white dark:bg-slate-800 dark:text-slate-50'>
					<p className='font-bold mb-4'>{t('Contact Details')}: </p>
					<p>
						{t('Name')}: {onePost.name}
					</p>
					<p>Email: {onePost.sender}</p>
					<p>
						{t('Number')}: {onePost.number}
					</p>
				</div>

				<div className='flex'>
					{userEmail === onePost.sender && (
						<>
							{edit === true ? (
								<div
									className={
										' m-1 p-4 w-min rounded-lg bg-green-300 hover:bg-green-400 hover:cursor-pointer'
									}
									onClick={saveHandler}
								>
									<AiOutlineCheck />
								</div>
							) : (
								<div
									className={
										' m-1 p-4 w-min rounded-lg bg-amber-100 hover:bg-amber-200 hover:cursor-pointer'
									}
									onClick={editHandler}
								>
									<AiOutlineEdit />
								</div>
							)}
							<div
								className={
									' m-1 p-4 w-min rounded-lg bg-red-300 hover:bg-red-400 hover:cursor-pointer'
								}
								onClick={deleteHandler}
							>
								<AiOutlineDelete />
							</div>
						</>
					)}
					<div
						className={
							' m-1 p-4 w-min rounded-lg bg-orange-300 hover:bg-orange-400 hover:cursor-pointer'
						}
						onClick={generatePDF}
					>
						<AiOutlineFilePdf />
					</div>
				</div>
			</div>

			{onePost.moderated && <Comments postId={postId} isAuth={isAuth} userEmail={userEmail} />}
		</div>
	)
}

export default PostDescription
