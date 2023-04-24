import React, { useEffect, useState } from 'react'
import MapLocal from '../Map/MapLocal'
import PostsList from './PostsList'
import { getAllActivePosts } from '../../actions/user'

const MapView = (props) => {
	const [postData, setPostData] = useState([])

	useEffect(() => {
		getAllActivePosts().then((res) => setPostData(res))
		return () => {
			setPostData([])
		}
	}, [])

	return (
		<div className='w-full flex relative overflow-hidden'>
			<div className='flex flex-col w-4/12 relative  overflow-scroll'>
				<div className='flex flex-col absolute mx-2'>
					<PostsList postData={postData} value={props.value}/>
				</div>
			</div>
			<div className='flex flex-col mx-2 w-8/12 h-screen  '>
				<MapLocal postData={postData} />
			</div>
		</div>
	)
}

export default MapView
