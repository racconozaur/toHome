import React, { useRef, useEffect, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import ReactMapGL, { Marker, NavigationControl } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'


const MapLocal = () => {
	const [viewport, setViewport] = useState({
		longitude: 69.2477,
		latitude: 41.2866,
		zoom: 11,
		width: '100%',
		height: '100vh',
	})
	return (

			<div className=' h-screen'>
				<div>
					Longitude: {viewport.longitude} | Latitude:{' '}
					{viewport.latitude} | Zoom: {viewport.zoom}
				</div>
				<ReactMapGL
					{...viewport}
					mapStyle='mapbox://styles/mapbox/streets-v11'
					mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
					onMove={(newViewport) => setViewport(newViewport)}
				>
					<NavigationControl position='bottom-right' />
				</ReactMapGL>
			</div>

	)
}

export default MapLocal
