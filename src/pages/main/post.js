import React, { useEffect, useState } from 'react'
import {db, auth} from "../../config/firebase";
import {addDoc,getDocs,collection, query, where, deleteDoc,doc} from "firebase/firestore"
import { Auth } from 'firebase/auth';
import { useAuthState} from "react-firebase-hooks/auth"
import { async } from '@firebase/util';

function Post({post}) {
  const {title,description,username} = post;
  const [likes,setLikes] = useState([])
  const [user] = useAuthState(auth);

  const likedRef = collection(db,"likes");

  const likesDoc = query(likedRef, where("postId","==", post.id));

  const getLikes = async () => {
     const data = await getDocs(likesDoc);
     setLikes(data.docs.map((doc) =>({userId: doc.data().userId , likeId: doc.id})));
  }

  const addLike = async (data) => {
    try{
      const newDoc =  await addDoc(likedRef,{userId: user?.uid,postId: post.id})
      if(user){
        setLikes((prev) => [...prev,{userId: user?.uid , likeId: newDoc.id}]);
      }

    }catch (err){
        console.log(err)
    }
     
   
  }

  const removeLike = async (data) => {
    try{
      const likeToDeleteQuery = query(likedRef, where("postId","==", post.id) ,where("userId", "==", user?.uid));
      const likeToDeleteData = await getDocs(likeToDeleteQuery)

      const likeId = likeToDeleteData.docs[0].id
      const likeToDelete = doc(db, "likes",likeId  )
      

      await deleteDoc(likeToDelete);
      if(user){
        setLikes((prev) => prev?.filter((like) => like.likeId !== likeId ));
      }

    }catch (err){
        console.log(err)
    }
     
   
  }

  useEffect(() => {
    getLikes()
  },[])

   const hasUserLiked = likes?.find((like) => like.userId === user?.uid );


  return (
    <div>
        <div className='title'>
            <h1>{title}</h1>
        </div>
        <div className='body'>
            <p>{description}</p>
        </div>
        <div className='footer'>
            <p>@{username}</p>
            <button onClick={hasUserLiked ? removeLike : addLike }> {hasUserLiked?<>&#128078;</> :<>&#128077;</>} </button>
            {likes && <p> Likes:{likes.length}</p>}
            
        </div>
    </div>
  )
}

export default Post