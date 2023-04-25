import React, { useState } from 'react'
import ReactMapGL, { Marker, NavigationControl } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

const MapCard = (props) => {
	const [viewport, setViewport] = useState({
		longitude: props.location.longitude,
		latitude: props.location.latitude,
		zoom: 18,
		width: '100%',
		height: '100%',
	})

	return (
		<div className='h-96 relative border shadow-sm border-cblue'>
			<ReactMapGL
				{...viewport}
				mapStyle='mapbox://styles/mapbox/streets-v11'
				mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
				onMove={(newViewport) => setViewport(newViewport)}
			>
				{props.location.latitude && props.location.longitude && (
					<>
						<Marker
							latitude={props.location.latitude}
							longitude={props.location.longitude}
						/>
						<NavigationControl position='bottom-right' />
					</>
				)}
			</ReactMapGL>
		</div>
	)
}

export default MapCard
