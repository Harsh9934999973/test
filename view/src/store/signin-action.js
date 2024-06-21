import { signinActions } from './signinSlice';
import { userActions } from './userSlice';
import {laravel_api} from '../configuration';
import { errorActions } from './errorSlice';


export const sendSigninData = (email,password) => {
  
  return (dispatch) => {
      fetch(`${laravel_api}login`, {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email:email,
        password:password,
        password_confirmation:password
      })
    })
      .then(response => response.json())
      .then(res => {
        if (res.status === 200) {
          sessionStorage.setItem('hjhgj', res.access_token);
          dispatch(userActions.setEmail({email:res.user.email}))
          dispatch(userActions.setName({name:res.user.name}))
          dispatch(userActions.setRole({role:res.user.role}))
          dispatch(userActions.setId({id:res.user.id}))
          dispatch(userActions.setSignedIn({isSignedIn:true}))
          dispatch(signinActions.setEmail({email:''}))
          dispatch(signinActions.setPassword({password:''}))
          dispatch(signinActions.setMessage({message:''})) 
          dispatch(signinActions.setLoading({loading:false}))
        } else {
          dispatch(signinActions.setLoading({loading:false}))
          dispatch(signinActions.setEmail({email:''}))
          dispatch(signinActions.setPassword({password:''}))
          dispatch(signinActions.setMessage({message:res.message}))
        }
      }).catch((err) => {
        dispatch(signinActions.setLoading({loading:false}))
        dispatch(errorActions.setError({error:true}))
        dispatch(signinActions.setEmail({email:''}))
        dispatch(signinActions.setPassword({password:''}))
        dispatch(signinActions.setMessage({message:""}))
      })
  };
};

export const logout = () => {
  
  return (dispatch) => {
    
          sessionStorage.setItem('hjhgj', '');
          dispatch(userActions.setEmail({email:''}))
          dispatch(userActions.setName({name:''}))
          dispatch(userActions.setRole({role:''}))
          dispatch(userActions.setId({id:''}))
          dispatch(userActions.setSignedIn({isSignedIn:false})) 
     
  };
};