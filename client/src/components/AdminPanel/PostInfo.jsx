import React, { useEffect, useState } from 'react'
import { acceptPostFrom, denyPostFrom } from '../../actions/user'
import Button from '../../utils/button/Button'
import io from 'socket.io-client'
import ReactMapGL, { Marker, NavigationControl } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { useTranslation } from 'react-i18next'
import MapCard from '../Map/MapCard'

// const socket = io.connect('http://localhost:5000')

const PostInfo = (props) => {
	// const [isConnected, setIsConnected] = useState(socket.connected)


	const { t } = useTranslation()

	const message = 'hello'
	const room = props.sender

	// socket.emit('join_room', props.sender)

	const acceptHandler = () => {
		// socket.emit('send_message', { message, room })
		acceptPostFrom(props.id).then(window.location.reload())
	}

	const denyHandler = () => {
		// socket.emit('send_message', { message, room })
		denyPostFrom(props.id).then(window.location.reload())
	}

	// useEffect(() => {
	// 	socket.on('connect', () => {
	// 		setIsConnected(true)
	// 	})
	// 	socket.on('disconnect', () => {
	// 		setIsConnected(false)
	// 	})

	// 	return () => {
	// 		socket.off('connect')
	// 		socket.off('disconnect')
	// 	}
	// }, [])


	

    // console.log(isConnected, socket.id)
	return (
		<div className='flex flex-col w-8/12 ml-60'>
			<div className=' bg-white border-2 border-black rounded-lg'>
				<div className='p-4 '>
					<img src={props.img} alt={props.img} />

					<p className=' font-bold text-2xl my-4'>
						Title: {props.title}
					</p>
					<p className=' font-semibold text-2xl'>
						Price: USD ${props.price}
					</p>
					<p className=' text-xl my-4'>Type: {props.type}</p>
					<p>Status: {props.status}</p>
					<p>Number of rooms: {props.rooms}</p>
					<p>
						Square: {props.square} m<sup>2</sup>
					</p>
					<p>Location: Longitude: {props.location.longitude.toFixed(4)} | Latitude:
					{props.location.latitude.toFixed(4)}</p>
					<p>Description: {props.content}</p>

					<div>
						{t('Location')}:Latitude: {props.location.latitude.toFixed(4)}{' '}
						| Longitude: {props.location.longitude.toFixed(4)}
						<MapCard location={props.location}/>
					</div>

					<p className='font-bold mb-4'>Contact Details: </p>
					<p>Name: {props.name}</p>
					<p>Email: {props.sender}</p>
					<p>Phone Number: {props.number}</p>
				</div>

				<div className=' border-t-2 border-black p-4'>
					<Button
						className=' bg-green-400 w-20 h-12'
						onClick={acceptHandler}
					>
						Accept
					</Button>
					<Button 
						className=' bg-red-400 w-20 h-12'
						onClick={denyHandler}
					>
						Deny
					</Button>
				</div>
				{/* <p>{t('Likes')}: {` ${onePost.likes.slice(0, 4)} ${onePost.likes.length > 5 ? `and ${onePost.likes.length - 5}` : ''}`}</p> */}
			</div>
		</div>
	)
}

export default PostInfo
