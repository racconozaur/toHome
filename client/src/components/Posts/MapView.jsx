import React from 'react'
import MapLocal from '../Map/MapLocal'
import PostsList from './PostsList'

const MapView = () => {
	return (
		<div className='w-full flex relative overflow-hidden'>
			<div className='flex flex-col w-4/12 relative  overflow-scroll'>
				<div className='flex flex-col absolute mx-2'>
					<PostsList />
				</div>
			</div>
			<div className='flex flex-col mx-2 w-8/12  '>
				{/* <div className='fixed h-screen w-[1114px]'>
					
				</div> */}
				<MapLocal />
			</div>
		</div>
	)
}

export default MapView
