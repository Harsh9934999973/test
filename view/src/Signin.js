import React,{useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { signinActions } from './store/signinSlice';
import { sendSigninData } from './store/signin-action';
import { useNavigate } from "react-router-dom";
// import Header from './Home/Component/Header';
// import Footer from './Home/Component/Footer';
import {errorActions} from './store/errorSlice';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


const Signin = () => {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const email = useSelector((state) => state.signin.email);
    const password = useSelector((state) => state.signin.password);
    const message = useSelector((state) => state.signin.message);
    const loading = useSelector((state) => state.signin.loading);
    const role = useSelector((state) => state.user.role);
    const isSignedIn = useSelector((state) => state.user.isSignedIn);
    const error = useSelector((state) => state.error.error);

    const onEmailChangeHandler = (event) => {
      dispatch(signinActions.setMessage({message:''}))
      dispatch(signinActions.setEmail({email:event.target.value}))
    }  

    const onPasswordChangeHandler = (event) => {
      dispatch(signinActions.setMessage({message:''}))
      dispatch(signinActions.setPassword({password:event.target.value}))
      
    } 

    const onSubmitHandler = () => {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if(email === ""){
        dispatch(signinActions.setMessage({message:'Enter valid e-mail'}))
        return ;
      }

      if(!re.test(String(email).toLowerCase())){
        dispatch(signinActions.setMessage({message:'Enter valid e-mail'}))
        return ;
      }

      if(password.trim() === ""){
        dispatch(signinActions.setMessage({message:'Enter valid password'}))
        return ;
      }

      if(password.length < 6){
        dispatch(signinActions.setMessage({message:'Password should be atleast 6 characters'}))
        return ;
      }

      
      dispatch(signinActions.setLoading({loading:true}))
     dispatch(sendSigninData(email,password))
     }  

     useEffect(() => {
      return () => {
        dispatch(signinActions.setEmail({email:''}))
        dispatch(signinActions.setPassword({password:''}))
        dispatch(signinActions.setMessage({message:''}))
        dispatch(signinActions.setLoading({loading:false}))
      }
    }, []);

     useEffect(() => {
       if(isSignedIn === true){
        if(role === 'admin'){
           return navigate(`/dashboard/main`);
       } 
       if(role === 'user'){
        return navigate(`/dashboarddeptuser/main`);
       }   
      }
  }, [isSignedIn]);

  useEffect(() => {
    if(error){
        return navigate(`/errorpage`);
    }  
    return () => {
        dispatch(errorActions.setError({error:false}))
    }
}, [error]);
    

    return (
        <>
        <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full" data-sidebar-position="fixed" data-header-position="fixed">
    <div className="position-relative overflow-hidden radial-gradient min-vh-100 d-flex align-items-center justify-content-center">
      <div className="d-flex align-items-center justify-content-center w-100">
        <div className="row justify-content-center w-100">
          <div className="col-md-8 col-lg-6 col-xxl-3">
            <div className="card mb-0">
              <div className="card-body">
                <div className="text-nowrap logo-img text-center d-block py-3 w-100">
                  <img src="/logos/rims_logo.jpg" width="120" alt="" />
                </div>

                 {message && <div className='alert alert-danger' role='alert'>
                      {message}
                      </div>}

                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Username</label>
                    <input type="email" name="email" className="form-control" id="email" aria-describedby="emailHelp" value={email} onChange={onEmailChangeHandler}/>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" name="password" className="form-control" id="password"  value={password} onChange={onPasswordChangeHandler} />
                  </div>
                  
                  {loading ?  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <CircularProgress />
    </Box> : <button type="submit" className="btn btn-primary w-100 py-8 fs-4 mb-4 rounded-2" onClick={onSubmitHandler}>Login</button>}
                  <div className="d-flex align-items-center justify-content-center">
					  Technology Partner <img src="/logos/insta-logo.jpg" width='50px' alt="ComputerEd"/> <b>ComputerEd</b>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
        
        
</>
    );
}

export default Signin;