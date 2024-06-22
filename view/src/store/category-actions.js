import { categoryActions } from './categorySlice';
import {laravel_api} from '../configuration';
import { errorActions } from './errorSlice';


export const createCategoryData = (name,hindiName) => {
  
  return (dispatch) => {
      fetch(`${laravel_api}createcategory`, {
      method: 'post',
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('hjhgj')}`,
        'Content-Type': 'application/json'
    },
      body: JSON.stringify({
        name:name,
        hn_name:hindiName
      })
    })
      .then(response => response.json())
      .then(res => {
        if (res.status === 200) {
          dispatch(categoryActions.setMessage({message:'Category created successfully'})) 
          dispatch(categoryActions.setCategories({categories: res.categories}))
          dispatch(categoryActions.setLoading({loading:false}))
          dispatch(categoryActions.setSuccess({success:true}))
        } else {
          dispatch(categoryActions.setLoading({loading:false}))
          dispatch(categoryActions.setFailed({failed:true}))
          dispatch(categoryActions.setMessage({message:res.message}))
        }
      }).catch((err) => {
        dispatch(categoryActions.setLoading({loading:false}))
        dispatch(errorActions.setError({error:true}))
        dispatch(categoryActions.setMessage({message:""}))
      })
  };
};

export const getCategoriesData = () => {
  
  return (dispatch) => {
      fetch(`${laravel_api}categories`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('hjhgj')}`,
        }
      })
      .then(response => response.json())
      .then(res => {
        if (res.status === 200) {
          dispatch(categoryActions.setLoading({loading:false}))
          dispatch(categoryActions.setCategories({categories: res.categories}))
        } else {
          dispatch(errorActions.setError({error:true}))
          dispatch(categoryActions.setMessage({message:'Sorry something went wrong!!'}))
        }
      }).catch((err) => {
        dispatch(errorActions.setError({error:true}))
        dispatch(categoryActions.setMessage({message:'Sorry something went wrong!!'}))
      })
  };
};

export const updateCategoryData = (id,name,hindiName) => {
  
  return (dispatch) => {
      fetch(`${laravel_api}categories/${id}`, {
      method: 'put',
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('hjhgj')}`,
        'Content-Type': 'application/json'
    },
      body: JSON.stringify({
        name:name,
        hn_name:hindiName
      })
    })
      .then(response => response.json())
      .then(res => {
        if (res.status === 200) {
          dispatch(categoryActions.setMessage({message:'Category updated successfully'})) 
          dispatch(categoryActions.setCategories({categories: res.categories}))
          dispatch(categoryActions.setLoading({loading:false}))
          dispatch(categoryActions.setSuccess({success:true}))
        } else {
          dispatch(categoryActions.setLoading({loading:false}))
          dispatch(categoryActions.setFailed({failed:true}))
          dispatch(categoryActions.setMessage({message:res.message}))
        }
      }).catch((err) => {
        dispatch(categoryActions.setLoading({loading:false}))
        dispatch(errorActions.setError({error:true}))
        dispatch(categoryActions.setMessage({message:""}))
      })
  };
};
       
