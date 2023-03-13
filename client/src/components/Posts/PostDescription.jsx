import React, { useEffect, useState, useCallback } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import Button from '../../utils/button/Button';
import { sendComment } from '../../actions/user';
import Post from './Post';
import {useSelector} from "react-redux";
import { useTranslation } from 'react-i18next';
import axios from '../../handlers/axiosHandler';
import { deletePost } from '../../actions/user';
import { AiOutlineHeart, AiFillHeart, AiOutlineComment, AiOutlineEdit, AiOutlineCheck, AiOutlineDelete, AiOutlineFilePdf, AiTwotoneStar } from "react-icons/ai";

const PostDescription = (props) => {

    const [onePost, setOnePost] = useState({})
    const [comments, setComments] = useState([])

    const history = useHistory();

    const locationStste = useLocation()
    const {postId} = locationStste.state

    console.log(onePost)

    const [comment, setComment] = useState('')

    const isAuth = useSelector(state => state.user.isAuth)
    const selectorUser = useSelector(state => state.user.currentUser.email)

    const user = () =>{
        return localStorage.getItem('user') || `user: ${Math.random()}`
    }

    const {t} = useTranslation()

    const sendPostHandler = async () => {
        if(comment.trim() === '' ){
            alert('ur data is empty')
        }
        else{
            sendComment(postId, comment, user())
            setComment('')   
        }
    }

    const getOnePost = useCallback(async () => {
        try {
            const res = await axios.get(`getonepost/${postId}`)
            setOnePost(res.data)
        } catch (e) {
            alert(e.response.data.message)
        }
    }, [])

    const getCommentsFrom = useCallback(async () => {
        try {
            const res = await axios.get(`getcommentsfrom/${postId}`)
            setComments(res.data)
        } catch (e) {
            alert(e.response.data.message)
        }
    }, [])

    useEffect(() => {
        getOnePost()
        getCommentsFrom()

    }, [])

    const deleteHandler = async () => {
        console.log(onePost._id);
        deletePost(onePost._id)
        setTimeout(() => {
            history.push("/all");
        }, 500)
        
        
    }

    const commentList = comments.map( e => {
            return(
                <div 
                    key={e._id}
                    className=' rounded-lg flex w-full mx-0 lg:mx-auto lg:w-5/12 border-4 p-4 m-4 dark:bg-slate-800 dark:text-white '
                >
                    <div className='flex justify-center items-center bg-slate-50 w-10 h-10 text-slate-800 p-4 mr-2 rounded-full'>
                        {e.author === undefined ? null : e.author.slice(0, 1).toUpperCase() }
                    </div>
                    <div>
                        <h2 className=' font-bold mb-2'>{e.author}</h2>
                        <div>{e.comment}</div>
                    </div>
                    
                </div>
            )

    })

    return (
        <div className=' container mx-auto'>
            <div className='w-full  mx-0 text-cblue lg:mx-auto lg:w-5/12 my-4'>
                <div className='p-4 bg-white border-2 border-black rounded-lg'>
                    <img src={onePost.image} alt={onePost.img}/>
                </div>

                <div className=' p-4 my-8 bg-white border-2 border-black rounded-lg'>
                    <p className=' font-bold text-2xl my-4'>Title: {onePost.title}</p>
                    <p className=' font-semibold text-2xl'>Price: USD ${onePost.price}</p>
                    <p className=' text-xl my-4'>Type: {onePost.type}</p>
                    <p>Status: {onePost.status}</p>
                    <p>Number of rooms: {onePost.rooms}</p>
                    <p>Square: {onePost.square} m<sup>2</sup></p>
                    <p>Location: {onePost.location}</p>
                    <p>Description: {onePost.content}</p>

                    {/* <p>{t('Likes')}: {` ${onePost.likes.slice(0, 4)} ${onePost.likes.length > 5 ? `and ${onePost.likes.length - 5}` : ''}`}</p> */}
                </div>

                <div className=' p-4 my-4 bg-white border-2 border-blac rounded-lg text-lg'>
                    <p className='font-bold mb-4'>Contact Details: </p>
                    <p>Name: {onePost.name}</p>
                    <p>Email: {onePost.sender}</p>
                    <p>Phone Number: {onePost.number}</p>
                </div>

                {
                    selectorUser === onePost.sender
                    ?
                        <div>
                            <div
                                className={' m-1 p-4 w-min rounded-lg bg-red-300 hover:bg-red-400 hover:cursor-pointer'}
                                onClick={deleteHandler}
                            >
                                <AiOutlineDelete/>
                            </div>
                        </div>
                    :
                    null
                }
            </div>
            {
                isAuth 
                ?
                    <div className=' w-full mx-0 lg:mx-auto lg:w-5/12 my-4'>
                        <textarea 
                            value={comment} 
                            onChange={e => setComment(e.target.value)} 
                            type="text" 
                            className="px-3 py-2  text-black bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none w-full focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1" 
                            placeholder={t("Your Comment")} required
                        />

                        <div className=' flex mt-2'>
                            <Button
                                onClick={sendPostHandler}
                                className=' bg-amber-100 rounded-md  px-3 py-2  hover:bg-amber-200 '
                            >
                                {t('Send')}
                            </Button>       
                        </div>          
                    </div>
                :
                    <div className='w-full mx-0 lg:mx-auto lg:w-5/12 my-4'>
                        <div className=' dark:text-white font-bold'>
                            {t('notRegisteredComment')}
                        </div>
                    </div>
            }

            <div className=' dark:text-white font-bold text-lg w-full mx-0 lg:mx-auto lg:w-5/12 my-4'>
                {t('Comments')}:
            </div>
            {
                commentList
            }

        </div>
    );
};

export default PostDescription;