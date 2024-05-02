import React, {useState} from 'react'
import { AiFillEyeInvisible, AiFillEye  } from "react-icons/ai";
import { Link } from 'react-router-dom';
import OAuth from '../components/OAuth';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { db } from "../firebase";
import { serverTimestamp, setDoc, doc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import { toast  } from 'react-toastify';
export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const {name, email, password} = formData;
  const navigate = useNavigate();
  function onChange(event) {
    // console.log(event.target.value);
    // setFormData({...formData, [event.target.name]: event.target.value})
    setFormData((prevState)=>({
      ...prevState,
      [event.target.id] : event.target.value,
    }))
  }
  async function onSubmit(e){
    e.preventDefault();
    try {
      const auth = getAuth()
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      updateProfile(auth.currentUser, {
        displayName: name
      });
      const user = userCredential.user;
      const formDataCopy = {...formData};
      delete formDataCopy.password; 
      formDataCopy.timestamp = serverTimestamp();

      await setDoc(doc(db, "users", user.uid), formDataCopy);
      toast.success("Sign up was successful");
      navigate("/");
    } catch (error) {
      console.log('error: ',error);
      if(error.code === 'auth/email-already-in-use'){
        toast.error("This email is already in use");
      } else if(error.code === 'auth/missing-email'){
        toast.error("Please enter an email");
      } else if(error.code === 'auth/invalid-email'){
        toast.error("Invalid email");
      } else if(error.code === 'auth/weak-password'){
        toast.error("Weak password");
      } else {
        toast.error("Something went wrong with the registration");
      }
      // toast.error("Something went wrong with the registration");
    }
  }
  return (
    <section>
      <h1 className='text-3xl text-center m-t-6 font-bold'>Sign Up</h1>
    <div className='flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto'>
      <div className='md:w-[67%] lg:w-[50%] mb-12 md:mb-6'>
        <img src="https://images.unsplash.com/flagged/photo-1564767609342-620cb19b2357?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="key"
        className='w-full rounded-2xl' />
      </div>
      <div className='w-full md:w-[67%] lg:w-[40%] lg:ml-20'>
        <form onSubmit={onSubmit}>
        <input type="text" id='name' value={name} 
          onChange={onChange} placeholder='Full name' 
          className='w-full px-4 py-2 tex-xl text-gray-700 bg-white border-gray-300
          rounded transition ease-in-out mb-6'/>

          <input type="email" id='email' value={email} 
          onChange={onChange} placeholder='Email address' 
          className='w-full px-4 py-2 tex-xl text-gray-700 bg-white border-gray-300
          rounded transition ease-in-out mb-6'/>
          <div className='relative mb-6'>
          <input type={showPassword ? "text" : "password"} id='password' value={password} 
          onChange={onChange} placeholder='Password' 
          className='w-full px-4 py-2 tex-xl text-gray-700 bg-white border-gray-300
          rounded transition ease-in-out' />
          {showPassword ? (<AiFillEyeInvisible 
           className='absolute right-3 top-3 text-xl cursor-pointer'
           onClick={()=>setShowPassword((prevState)=>!prevState)}/>
          ) : (
           <AiFillEye className='absolute right-3 top-3 text-xl cursor-pointer' 
           onClick={()=>setShowPassword((prevState)=>!prevState)}/>)}
          </div>
          <div className="flex justify-between white-space-nowrap text-sm sm:text-lg">
            <p className="mb-6 ">
              Have an account? 
              <Link to="/sign-in" className="text-red-600 hover:text-red-700 
              transition duration-200 ease-in-out ml-1">Sign in</Link>
              </p>
              <p>
                <Link to="/forgot-password"
                className="text-blue-600 hover:text-blue-800 
                transition duration-200 ease-in-out"
                >Forgot password?</Link>
              </p>
          </div>
          <button className="w-full bg-blue-600 text-white px-7 py-3 text-sm font-medium uppercase
        rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg
        active:bg-blue-800" 
        type="submit">Sign up</button>
        <div className="my-4 flex items-center
        before:border-t before:flex-1 before:border-gray-300
        after:border-t after:flex-1 after:border-gray-300">
          <p className="text-center font-semibold mx-4">OR</p>
        </div>
        <OAuth />
        </form>
 
      </div>
    </div>
    </section>
  )
}
