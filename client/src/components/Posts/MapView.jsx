import React from 'react';
import PostsList from './PostsList';

const MapView = () => {
    return (
        <div className='w-full flex relative'>
            <div className='flex flex-col w-4/12 '>
              <PostsList/>  
            </div>
            <div className='flex ml-5 h-screen w-8/12  relative'>
                
                <div className='fixed bg-slate-400 h-screen w-[1114px]'>
                    asd
                </div>
                
                
                    
              
            </div>
        </div>
    );
};

export default MapView;