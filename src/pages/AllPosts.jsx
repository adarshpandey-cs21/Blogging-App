import React,{useState,useEffect} from 'react'
import appwriteService from '../appwrite/appWriteConfig'
import {PostCard,Container} from '../components/index'
import {useSelector} from 'react-redux'

function AllPosts() {
    const [posts,setPosts]=useState([]);
    
    const userData = useSelector((state) => state.auth.userData);

    useEffect(()=>{
        appwriteService.getPosts([])
        .then((posts)=>{
            if(posts){
                const userPosts = posts.documents.filter((post)=>post.userId === userData.$id)
                setPosts(userPosts)
            }
        })
        .catch((error)=> console.log(error))
    
    
    },[]);

    if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                            you have not created any posts yet!
                            Add a new post to get started.
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }

  return (
    <div className=' w-full py-8'>
        <Container>
            <div className=' flex flex-wrap'>
            {posts.map((post)=>(
                <div key={post.$id} className=' p-2 w-1/4'>
                    <PostCard {...post}/>
                </div>
                
            ))}
            </div>
        </Container>
    </div>
  )
}

export default AllPosts