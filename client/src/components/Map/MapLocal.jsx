import React, { useRef, useEffect, useState } from 'react'
import mapboxgl from 'mapbox-gl'

mapboxgl.accessToken =
	'pk.eyJ1IjoiYnlqYXNhIiwiYSI6ImNsOXB1ZTI2NjBhczQzbnA1cDJ3bm4xMXkifQ.qOlKEri6fcPTKGGOEUt5Jw'

const MapLocal = () => {
	const mapContainerRef = useRef(null)

	const [lng, setLng] = useState(69.2477)
	const [lat, setLat] = useState(41.2866)
	const [zoom, setZoom] = useState(11)

	useEffect(() => {
		const map = new mapboxgl.Map({
			container: mapContainerRef.current,
			style: 'mapbox://styles/mapbox/streets-v11',
			center: [lng, lat],
			zoom: zoom,
		})

		map.addControl(new mapboxgl.NavigationControl(), 'top-right')

		map.on('move', () => {
			setLng(map.getCenter().lng.toFixed(4))
			setLat(map.getCenter().lat.toFixed(4))
			setZoom(map.getZoom().toFixed(2))
		})

		// Clean up on unmount
		return () => map.remove()
	}, []) // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<>
			<div className=''>
				<div>
					Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
				</div>
			</div>
			<div className=' h-screen w-full' ref={mapContainerRef} />
		</>
	)
}

export default MapLocal
