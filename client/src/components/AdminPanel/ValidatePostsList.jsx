import React, { useEffect, useState, useCallback } from 'react';
import axios from '../../handlers/axiosHandler';
import Post from '../Posts/Post';
import PostInfo from './PostInfo';

const ValidatePosts = () => {

    const [validatePosts, setValidatedPosts] = useState([])

    const getAllPosts = useCallback(async () => {
        try {
            const res = await axios.get(`allposts`,

                    {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}}
        )
            setValidatedPosts(res.data)
            return res.data
        } catch (e) {
            console.log(e);
        }
    }, [])

    useEffect(() => {
        getAllPosts()

    }, [getAllPosts])

    console.log(validatePosts);

    const  allNotModeratedPosts = validatePosts.map(e => {
        if(e.moderated === false){
            return (
                <PostInfo
                    key={e._id}
                    id={e._id}
                    name={e.name}
                    sender={e.sender}
                    title={e.title}
                    content={e.content}
                    img={e.image}
                    location={e.location}
                    price={e.price}
                    square={e.square}
                    status={e.status}
                    type={e.type}
                    likes={e.likes}
                    number={e.number}
                    rooms={e.rooms}
                    moderated={e.moderated}
                />
            )
        }
        return null 
    })

    return (
        <div className='flex flex-col w-10/12 ml-60 -z-10'>
            {allNotModeratedPosts}
        </div>
    );
};

export default ValidatePosts;