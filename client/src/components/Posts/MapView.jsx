import React, { useEffect, useState, useCallback } from 'react'
import MapLocal from '../Map/MapLocal'
import PostsList from './PostsList'
import axios from '../../handlers/axiosHandler'

const MapView = (props) => {




	return (
		<div className='w-full flex relative overflow-hidden'>
			<div className='flex flex-col w-4/12 relative  overflow-scroll'>
				<div className='flex flex-col absolute mx-2'>
					<PostsList postData={props.postData}/>
				</div>
			</div>
			<div className='flex flex-col mx-2 w-8/12 h-screen  '>
				<MapLocal postData={props.postData}/>
			</div>
		</div>
	)
}

export default MapView
