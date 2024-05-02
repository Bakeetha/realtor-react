import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import OAuth from '../components/OAuth';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { toast  } from 'react-toastify';
export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  // const [emailMessage, setEmailMessage] = useState(false)
  // Function to handle input change
  function onChange(event) {
    setEmail(event.target.value);
  }
   // onSubmit is async bcoz sendPasswordResetEmail returns promise so we need to use await
  async function onSubmit(e){
    e.preventDefault(); //to prevent the refreshing the page
    
    const auth = getAuth();
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email was sent");
    } catch (error) {
      toast.error("Could not send reset password");
    }

    // try {
    //   // Check if the email exists in Firebase authentication
    //   const methods = await fetchSignInMethodsForEmail(auth, email);
    //   console.log(methods);
    //   if (methods && methods.length > 0) {
    //     // Email exists, now check if the user is verified
    //     const user = auth.currentUser;
        
    //     if (user && user.emailVerified) {
    //       // User is verified, proceed with sending password reset email
    //       await sendPasswordResetEmail(auth, email);
    //       toast.success("Password reset email was sent");
    //     } else {
    //       // User is not verified, display an error message
    //       toast.error("Please verify your email before resetting your password");
    //     }
    //   } else {
    //     // Email does not exist in authentication
    //     toast.error("Email does not exist in our database");
    //   }
    // } catch (error) {
    //   toast.error("Could not send reset password");
    // }



    // try {
    //   // Check if the email exists in Firebase authentication
    //   console.log('email current: ', email);
    //   const methods = await fetchSignInMethodsForEmail(auth, email);
    //   console.log('email: ', methods, methods.length);
    //   if (methods && methods.length > 0) {
    //     // Email exists, proceed with sending password reset email


    //     await sendPasswordResetEmail(auth, email);
    //     toast.success("Password reset email was sent");
    //   } else {
    //     // Email does not exist in authentication
    //     toast.error("Email does not exist in our database");
    //   }
    // } catch (error) {
    //   toast.error("Could not send reset password");
    // }



    // try {
    //   await sendPasswordResetEmail(auth, email)
    //   setEmailMessage(true);
    //   alert('sent')
    // } catch (error) {    
    //   if (error.code === 'auth/user-not-found') {
    //     alert('User not found, try again!')
    //     setEmail('')
    //     console.log(error, 'User not found')
    //   }
    // }


  }

  // const onSubmit = async (e) => {
  //   e.preventDefault();
  //   const auth = getAuth();
  //   try {

  //     await sendPasswordResetEmail(auth, email)
      
  //     toast.success("Password reset email was sent");
  //   } catch (error) {    
  //     if (error.code === 'auth/user-not-found') {
  //       alert('User not found, try again!')
  //       setEmail('')
  //     }
  //   }
  // };


  // const auth = getAuth();
  // const onSubmit = async (email) => {
  //   // event.preventDefault(); // Prevent default form submission
  //   try {
  //     await sendPasswordResetEmail(auth, email);
  //     // alert("Password reset link sent!");
  //     toast.success("Password reset email was sent");
  //   } catch (err) {
  //     console.error(err);
  //     // alert(err.message);
  //     toast.error("Could not send reset password");
  //   }
  // };

    // Async function to handle form submission
    // const auth = getAuth();
    // const onSubmit = async (e) => {
    //   e.preventDefault(); // Prevent default form submission
    //   const formData = new FormData(e.target);
    // const currentEmail = formData.get('email'); // Get email from form data
    //   console.log(currentEmail);
    //   try {
    //     await sendPasswordResetEmail(auth, currentEmail); // Access email from state
    //     toast.success('Password reset email was sent');
    //   } catch (err) {
    //     console.error(err);
    //     toast.error('Could not send reset password');
    //   }
    // };

  return (
    <section>
      <h1 className='text-3xl text-center m-t-6 font-bold'>Forgot Password</h1>
    <div className='flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto'>
      <div className='md:w-[67%] lg:w-[50%] mb-12 md:mb-6'>
        <img src="https://images.unsplash.com/flagged/photo-1564767609342-620cb19b2357?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="key"
        className='w-full rounded-2xl' />
      </div>
      <div className='w-full md:w-[67%] lg:w-[40%] lg:ml-20'>
        <form onSubmit={onSubmit}>
          <input type="email" id='email' value={email}  name="email"
          onChange={onChange} placeholder='Email address' 
          className='w-full px-4 py-2 tex-xl text-gray-700 bg-white border-gray-300
          rounded transition ease-in-out mb-6'/>
          <div className="flex justify-between white-space-nowrap text-sm sm:text-lg">
            <p className="mb-6 ">Don't have a account? 
              <Link to="/sign-up" className="text-red-600 hover:text-red-700 
              transition duration-200 ease-in-out ml-1">Register</Link>
              </p>
              <p>
                <Link to="/sign-in"
                className="text-blue-600 hover:text-blue-800 
                transition duration-200 ease-in-out"
                >Sign in</Link>
              </p>
          </div>
          <button className="w-full bg-blue-600 text-white px-7 py-3 text-sm font-medium uppercase
        rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg
        active:bg-blue-800" 
        type="submit">Send reset password</button>
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
