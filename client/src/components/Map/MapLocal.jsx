import React, { useState } from 'react'
// eslint-disable-next-line no-unused-vars
import ReactMapGL, { Marker, NavigationControl, Popup } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

const MapLocal = (props) => {
	const [viewport, setViewport] = useState({
		longitude: 69.2477,
		latitude: 41.2866,
		zoom: 11,
		width: '100%',
		height: '100vh',
	})

	// const [selectedHome, setSelectedHome] = useState(null)

	return (
		<div className=' h-screen'>
			<ReactMapGL
				{...viewport}
				mapStyle='mapbox://styles/mapbox/streets-v11'
				mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
				onMove={(newViewport) => setViewport(newViewport)}
			>
				{props.postData.map((post) => (
					<Marker
						className=' hover: cursor-pointer'
						key={post._id}
						latitude={post.location.latitude}
						longitude={post.location.longitude}
						// onClick={() => {
						// 	setSelectedHome(post)
						// }}
					/>
				))}
				<NavigationControl position='bottom-right' />
			</ReactMapGL>

			{/* {selectedHome ? (
				<Popup
					longitude={selectedHome.location.longitude}
					latitude={selectedHome.location.latitude}
					onClose={() => setSelectedHome(null)}
					closeOnMove={true}
				>
					<p>{selectedHome.title}</p>
				</Popup>
			) : null} */}
		</div>
	)
}

export default MapLocal
