import React, { useEffect, useState } from 'react'
import {getDocs,collection} from "firebase/firestore";
import {db} from '../../config/firebase'
import Post from './post';


function Main() {
  const [postList,setPostList] = useState(null);


  const postRef = collection(db,"post");

  const getPost = async () => {
     const data = await  getDocs(postRef);
     setPostList(data.docs.map((doc) =>({...doc.data(),id: doc.id})));
  }

  useEffect(() => {
    getPost();
  }, []);

  return (
    <div>{postList?.map((post) => {
      return <Post post={post}/>
    })}</div>
  )
}

export default Main