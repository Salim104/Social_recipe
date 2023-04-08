import {useForm} from 'react-hook-form'
import  * as yup from 'yup';
import { auth } from '../../config/firebase';
import { useAuthState} from "react-firebase-hooks/auth"
import {yupResolver} from '@hookform/resolvers/yup'
// addDoc function for creating/ref a doc in firestore and for adding a new collection
import {addDoc,collection} from "firebase/firestore"
import {db} from "../../config/firebase"
import { useNavigate } from 'react-router-dom';


export const Createform = () => {
    const [user] = useAuthState(auth);
    const navigate = useNavigate();

    const schema = yup.object().shape({
         title : yup.string().required("You must add a title..."),
         description: yup.string().required("You must have a description..."),
    })

    const {register,handleSubmit,formState :{errors}} = useForm({
        resolver: yupResolver(schema),
    });

    const postRef = collection(db,"post");

    const onCreatePost = async (data) => {
        await addDoc(postRef,{
             title : data.title,
             description: data.description,
             username: user.displayName,
             userId:user.uid,
        })
        navigate("/")
    }

    return (
            <form onSubmit={handleSubmit(onCreatePost)}>
                <input placeholder='Title...'  {...register("title")}></input>
                <p style={{color:"red"}}>{errors.title?.message}</p>
                <textarea placeholder='Description...'  {...register("description")}></textarea>
                <p style={{color:"red"}}>{errors.description?.message}</p>
                <input type='submit' className='btn-submit'></input>
            </form>
    )
}