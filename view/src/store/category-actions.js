import { categoryActions } from './categorySlice';
import {laravel_api} from '../configuration';
import { errorActions } from './errorSlice';


export const createCategoryData = (name,hindiName) => {
  
  return (dispatch) => {
      fetch(`${laravel_api}createcategory`, {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        name:name,
        hn_name:hindiName
      })
    })
      .then(response => response.json())
      .then(res => {
        if (res.status === 200) {
          dispatch(categoryActions.setMessage({message:'Category created successfully'})) 
          dispatch(categoryActions.setLoading({loading:false}))
          dispatch(categoryActions.setName({name:''}))
          dispatch(categoryActions.setHindiName({hindiName:''}))
          dispatch(categoryActions.setSuccess({success:true}))
        } else {
          dispatch(categoryActions.setLoading({loading:false}))
          dispatch(categoryActions.setName({name:''}))
          dispatch(categoryActions.setHindiName({hindiName:''}))
          dispatch(categoryActions.setMessage({message:res.message}))
        }
      }).catch((err) => {
        dispatch(categoryActions.setLoading({loading:false}))
        dispatch(errorActions.setError({error:true}))
        dispatch(categoryActions.setName({name:''}))
          dispatch(categoryActions.setHindiName({hindiName:''}))
        dispatch(categoryActions.setMessage({message:""}))
      })
  };
};
