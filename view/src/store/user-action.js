import { userActions } from './userSlice';
import { divisionsActions } from './divisionsSlice';
import { departmentActions } from './departmentSlice';
import {laravel_api} from '../configuration';
import { errorActions } from './errorSlice';



export const getUserData = () => {
  
  return (dispatch) => {
    fetch(`${laravel_api}user`, {
      method: 'post',
      headers: {
        // 'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
      })
    })
    .then(response => response.json())
    .then(res => {
        if (res.status === 200) {
          
          dispatch(userActions.setEmail({email:res.user.email}))
          dispatch(userActions.setName({name:res.user.name}))
          dispatch(userActions.setDepartmentId({departmentId:res.user.department_id}))
          dispatch(userActions.setDivisionId({divisionId:res.user.division_id}))
          dispatch(departmentActions.setDepartmentId({departmentId:res.user.department_id}))
          dispatch(divisionsActions.setDivisionId({divisionId:res.user.division_id}))
          dispatch(userActions.setRole({role:res.user.role}))
          dispatch(userActions.setId({id:res.user.id}))
          dispatch(userActions.setSignedIn({isSignedIn:true}))
        }else{
          dispatch(errorActions.setError({error:true}))
        }
      }).catch((err) => {
        dispatch(errorActions.setError({error:true}))
      })
  };
};