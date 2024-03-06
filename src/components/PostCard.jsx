import React from 'react'
import appwriteService from '../appwrite/appWriteConfig';
import {Link} from'react-router-dom';

function PostCard({$id,title,featuredImage}) {
  return (
    <Link to={`/post/${$id}`}>
              <div className='w-full h-full h-70 bg-gray-100 rounded-xl p-4 '>
            <div className='w-full justify-center mb-4'>
                <img className=" w-full min-h-40 max-h-40 rounded-xl" src={appwriteService.getFilePreview(featuredImage)} alt={title}
               />

            </div>
            <h2
            className='text-xl font-bold'
            >{title}</h2>
        </div>
    </Link>
  )
}

export default PostCard