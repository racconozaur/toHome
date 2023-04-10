import React, { useState } from 'react';
import { deletePost, likePost, updatePost } from '../../actions/user';

import {Link} from "react-router-dom";
import JsPDF from 'jspdf';
import { useTranslation } from 'react-i18next';


const Post = (props) => {
    
    const {t} = useTranslation()


    // const likeHandler = () => {
    //     likePost(props.id, user)
    //     setLiked(!liked)
    // }

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

            <div className=' w-[60%] pl-8 text-cblue flex flex-col justify-between '>
                <div className='dark:text-slate-50'>
                    <div className='flex items-center justify-between'>
                        <h2 className=' text-2xl font-semibold my-6'>{t('Price')}: USD ${props.price}</h2>
                        <p>{props.validation}</p>
                    </div>
                    <h3 className=' text-lg font-medium'>{t('Square')}: {props.square} m<sup>2</sup></h3>
                    <p className=' text-lg font-normal my-3'>{t('Type')}: {props.type}</p>
                    <p className=' text-lg font-normal my-3'>{t('Rooms')}: {props.rooms}</p>
                    <p className=' text-lg font-normal my-3'>{t('Location')}: Longitude {props.location.longitude.toFixed(4)} | Latitude:
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
                        <button className=' px-12 py-3 bg-cyellow rounded-xl text-2xl font-medium '>
                            {t('View')}
                        </button>
                    </Link>
                    
                </div>
            </div>
        </div>
       
    );
};

export default Post;