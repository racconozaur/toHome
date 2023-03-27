import React, { useState } from 'react';
import { deletePost, likePost, updatePost } from '../../actions/user';
import { useSelector} from "react-redux";

import {Link} from "react-router-dom";
import JsPDF from 'jspdf';
import { AiOutlineHeart, AiFillHeart, AiOutlineComment, AiOutlineEdit, AiOutlineCheck, AiOutlineDelete, AiOutlineFilePdf, AiTwotoneStar } from "react-icons/ai";
import { useTranslation } from 'react-i18next';


const Post = (props) => {

    // const user = localStorage.getItem('user')

    // const [edit, setEdit] = useState(false)
    // const [recomendation, setRecomendation] = useState('')
    // const [desc, setDesc] = useState('')
    // const [updateRare, setUpdatedRate] = useState(0)
    // const [updateTag, setUpdatedTag] = useState('')
    // const [liked, setLiked] = useState(props.likes.includes(user))
    
    // const {t} = useTranslation()

    // const options = [
    //     {value: '', text: '--Choose an option--'},
    //     {value: 'Games', text: 'Games'},
    //     {value: 'Films', text: 'Films'},
    //     {value: 'Music', text: 'Music'},
    //     {value: 'Books', text: 'Books'},
    //   ];

    // const [selected, setSelected] = useState(options[1].value);

    // const deleteHandler = async () => {
    //     console.log(props.id);
    //     deletePost(props.id)
    //     setTimeout(() => {
    //         window.location.reload()
    //     }, 500)
        
        
    // }

    // const editHandler = () => {
    //     setEdit(!edit)
    // }

    // const saveHandler = async () => {
    //     if (recomendation.trim() === '' || 
    //         desc.trim() === '' ||
    //         updateRare.trim() === '' ||
    //         selected.trim() === '' ||
    //         updateTag.trim() === ''
    //         ){
    //         setEdit(!edit)
    //     }
    //     else{
    //         updatePost(props.id, recomendation, desc, updateRare, selected, updateTag)
    //         setRecomendation('')
    //         setDesc('')
    //         setUpdatedRate(0)
    //         setSelected(options[1].value)
    //         setUpdatedTag('')
    //         setEdit(!edit)
    //     }
        
    // }

    // const likeHandler = () => {
    //     likePost(props.id, user)
    //     setLiked(!liked)
    // }

    // const handleChange = event => {
    //     setSelected(event.target.value);
    //   };

    // const loc = window.location.pathname

    // const generatePDF = async () => {
    //     let img = new Image()
    //     img.src = `${props.img}`

    //     const pdf = new JsPDF('portrait','pt','a4')
    //     pdf.text(`Author: ${props.sender}`, 10, 20)
    //     pdf.text(`Rate: ${props.rate}`, 10, 40)
    //     pdf.text(`Category: ${props.category}`, 10, 60)
    //     pdf.text(`Likes: ${props.likes}`, 10, 80)
    //     pdf.text(`Title: ${props.title}`, 10, 100)
    //     pdf.text(`Description: ${props.category}`, 10, 120)
    //     pdf.text(`Tags: ${props.hashtags}`, 10, 140)
    //     pdf.addImage(img, 'png', 10, 160)
        
    //     await pdf.save(`${props.title}.pdf`)
    // }

    return (
        <div className=' lg:flex rounded-lg w-full mx-0 lg:mx-auto border-2 border-black drop-shadow-xl p-8 my-8 bg-white dark:bg-slate-800 dark:border-white ' id='report'>
            <div className=' w-[40%] h-full'>
                 <img src={props.img} alt={props.img}/>
            </div>

            <div className=' w-[60%] pl-8 text-cblue flex flex-col justify-between'>
                <div className=''>
                    <div className='flex items-center justify-between'>
                        <h2 className=' text-2xl font-semibold my-6'>Price: USD ${props.price}</h2>
                        <p>{props.validation}</p>
                    </div>
                    <h3 className=' text-lg font-medium'>Square: {props.square} m<sup>2</sup></h3>
                    <p className=' text-lg font-normal my-3'>Type: {props.type}</p>
                    <p className=' text-lg font-normal my-3'>Rooms: {props.rooms}</p>
                    <p className=' text-lg font-normal my-3'>Location: Longitude {props.location.longitude.toFixed(4)} | Latitude:
					{props.location.latitude.toFixed(4)}</p>
                </div>

                <div className='flex justify-end'>
                    <Link
                        to={{
                            pathname: '/postinfo',
                            state: {
                                postId: props.id,
                                location: props.location
                            }
                        }}
                    >
                        <button className=' px-12 py-3 bg-cyellow rounded-xl text-2xl font-medium'>
                            View
                        </button>
                    </Link>
                    
                </div>
            </div>
            {/* <div className='flex flex-col w-full ' >
                <div className='flex justify-between'>
                    <h2 className=' text-green-300 font-bold text-lg dark:text-sky-500'>{t('Author')}: {props.sender}</h2>
                    <div className='flex font-semibold text-lg dark:text-white'>
                        <div>{props.category} |</div>
                        <div className='flex items-center'>
                            {`| Rate: ${props.rate}`}<AiTwotoneStar className=' text-yellow-300'/>
                        </div>
                    </div>
                </div>
                
                    {props.img && 
                        <img 
                            src={props.img}
                            className='w-full h-4/5 my-4'
                            alt={props.img}
                        />
                    }
                    
                
                <div className='flex justify-between dark:text-white'>
                    <div>
                        <div className='flex items-center -ml-1 dark:text-black'>
                            {
                                isAuth
                                ?
                                <div 
                                    onClick={likeHandler}
                                    className='m-1 p-4 bg-slate-50 w-min rounded-lg text-red-500 hover:bg-slate-100 hover:cursor-pointer'
                                >
                                    {liked ? <AiFillHeart/> : <AiOutlineHeart/>}
                                </div>
                                :
                                null
                            }
                            { props.sender === user && isAuth || isAdmin
                
                                ?
                                    <>
                                        <div
                                            className={' m-1 p-4 w-min rounded-lg bg-blue-300 hover:bg-blue-400 hover:cursor-pointer'}
                                        >
                                            <Link
                                                to={{
                                                    pathname: '/postinfo',
                                                    state: {
                                                        postId: props.id,
                                                        author: props.sender,
                                                        title: props.title,
                                                        category: props.category,
                                                        rate: props.rate,
                                                        content: props.content,
                                                        hashtags: props.hashtags,
                                                        prevPath: loc,
                                                        image: props.img,
                                                        likes: props.likes
                                                    }
                                                }}
                                            >
                                                <AiOutlineComment/>
                                            </Link>
                                        </div>

                                        
                                        {
                                            edit === true 
                                            ?
                                                <div
                                                className={' m-1 p-4 w-min rounded-lg bg-green-300 hover:bg-green-400 hover:cursor-pointer'}
                                                onClick={saveHandler}
                                                >
                                                    <AiOutlineCheck/>
                                                </div>
                                            :
                                                <div
                                                className={' m-1 p-4 w-min rounded-lg bg-amber-100 hover:bg-amber-200 hover:cursor-pointer'}
                                                onClick={editHandler}
                                                >
                                                    <AiOutlineEdit/>
                                                </div>
                                        }

                                        <div
                                            className={' m-1 p-4 w-min rounded-lg bg-red-300 hover:bg-red-400 hover:cursor-pointer'}
                                            onClick={deleteHandler}
                                        >
                                            <AiOutlineDelete/>
                                        </div>

                                        <div
                                            className={' m-1 p-4 w-min rounded-lg bg-orange-300 hover:bg-orange-400 hover:cursor-pointer'}
                                            onClick={generatePDF}
                                        >
                                            <AiOutlineFilePdf/>
                                        </div>
                                    </>

                                    
                                :
                                <div
                                    className={' m-1 p-4 w-min rounded-lg bg-blue-300 hover:bg-blue-400 hover:cursor-pointer'}
                                >
                                    <Link
                                        to={{
                                            pathname: '/postinfo',
                                            state: {
                                                postId: props.id,
                                                author: props.sender,
                                                title: props.title,
                                                category: props.category,
                                                rate: props.rate,
                                                content: props.content,
                                                hashtags: props.hashtags,
                                                prevPath: loc,
                                                image: props.img,
                                                likes: props.likes
                                            }
                                        }}
                                    >
                                        <AiOutlineComment/>
                                    </Link>
                                </div>
                            }
                        </div>
                        <div className=''>
                            {t('Likes')}: {` ${props.likes.slice(0, 4)} ${props.likes.length > 5 ? `and ${props.likes.length - 5}` : ''}`}
                        </div>
                        <h3 className=' dark:text-amber-100 font-semibold text-lg mt-2'>
                                {t('Recomendation')}: { edit === false
                                            ?
                                                props.title
                                            :
                                                <>
                                                {props.title}
                                                <input 
                                                value={recomendation} 
                                                onChange={e => setRecomendation(e.target.value)} 
                                                type="text" 
                                                className="px-3 py-2 text-black bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block  rounded-md sm:text-sm focus:ring-1" 
                                                placeholder={t('Recomendation')} required/>
                                                </>
                                                
                                            }
                        </h3>

                        <div className=' font-semibold text-lg '>
                        <div> {edit === false
                                        ?
                                            null
                                        : 
                                            <>
                                            {`${t('Category')}: ${props.category}`}
                                            <select 
                                                value={selected} 
                                                onChange={handleChange}
                                                className="px-3 py-2 text-black bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1" 
                                            >
                                                
                                                    {options.map(option => (
                                                    <option key={option.value} value={option.value}>
                                                        {option.text}
                                                    </option>
                                                    ))}
                                            </select>
                                            </>
                                        
                        
                        
                        
                                        }
                        
                        </div>
                        <div className='flex items-center'>
                             {edit === false
                                        ?
                                        null
                                        : 
                                            <>
                                            {`${t('Rate')}: ${props.rate}` }
                                            
                                            <input 
                                                value={updateRare} 
                                                onChange={e => setUpdatedRate(e.target.value)} 
                                                type="number"
                                                min={0}
                                                max={10} 
                                                className="px-3 py-2 text-black w-20 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1" 
                                                placeholder="Rate" required
                                            />
                                            </>
                                        
                        
                        
                        
                                        }
                            
                        </div>
                    </div>

                        <div className=' w-full font-bold' >
                                {t('Description')}: { edit === false
                                            ?
                                                <ReactMarkdown className=' font-normal' children={props.content} remarkPlugins={[remarkGfm]}/>
                                            :
                                                <>
                                                <div className=' w-3/5'>{props.content}</div>
                                                <textarea 
                                                value={desc} 
                                                onChange={e => setDesc(e.target.value)} 
                                                type="text" 
                                                className="px-3 py-2 my-2 text-black bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block  rounded-md sm:text-sm focus:ring-1" 
                                                placeholder={t('Description')} required/>
                                                </>
                                                
                                        }
                        </div>

                        <div className='  mt-2 text-blue-500'>
                            {t('Tags')}: { edit === false
                                    ?                    
                                        props.hashtags
                                    :
                                        <>
                                        {props.hashtags}
                                        <input 
                                            value={updateTag} 
                                            onChange={e => setUpdatedTag(e.target.value)} 
                                            type="text" 
                                            className="px-3 py-2 mt-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block  rounded-md sm:text-sm focus:ring-1" 
                                            placeholder={t('Tags')} required
                                        />
                                        </> 
                                }
                        </div>
                        
                        
                        
                        
                            
                    </div>

                    
                </div>
            
            </div> */}

        </div>
       
    );
};

export default Post;