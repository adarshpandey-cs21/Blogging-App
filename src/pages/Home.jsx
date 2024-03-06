import React, {useEffect, useState} from 'react'
import appwriteService from "../appwrite/appWriteConfig";
import {Container, PostCard} from '../components'
import { useSelector } from 'react-redux';

function Home() {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
            appwriteService.getPosts().then((posts) => {
                if (posts) {
                    setPosts(posts.documents)
                }
            })
        
        
    }, [])
  
    if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                            Currently there are no posts available
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home