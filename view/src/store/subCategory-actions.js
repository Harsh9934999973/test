import { subCategoryActions } from './subCategorySlice';
import {laravel_api} from '../configuration';
import { errorActions } from './errorSlice';

export const createSubCategoryData = (name,hindiName,categoryId, yearValueId) => {
  
    return (dispatch) => {
        fetch(`${laravel_api}sub-categories`, {
        method: 'post',
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('hjhgj')}`,
          'Content-Type': 'application/json'
      },
        body: JSON.stringify({
          name:name,
          hn_name:hindiName,
          category_id: categoryId,
          year_value_id: yearValueId
        })
      })
        .then(response => response.json())
        .then(res => {
          if (res.status === 200) {
            dispatch(subCategoryActions.setMessage({message:'Category created successfully'})) 
            dispatch(subCategoryActions.setSubCategories({subcategories: res.sub_categories}))
            dispatch(subCategoryActions.setLoading({loading:false}))
            dispatch(subCategoryActions.setSuccess({success:true}))
          } else {
            dispatch(subCategoryActions.setLoading({loading:false}))
            dispatch(subCategoryActions.setFailed({failed:true}))
            dispatch(subCategoryActions.setMessage({message:res.message}))
          }
        }).catch((err) => {
          dispatch(subCategoryActions.setLoading({loading:false}))
          dispatch(errorActions.setError({error:true}))
          dispatch(subCategoryActions.setMessage({message:""}))
        })
    };
  };

  export const getSubCategoriesData = () => {
  
    return (dispatch) => {
        fetch(`${laravel_api}sub-categories`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('hjhgj')}`,
          }
        })
        .then(response => response.json())
        .then(res => {
          if (res.status === 200) {
            dispatch(subCategoryActions.setLoading({loading:false}))
            dispatch(subCategoryActions.setSubCategories({subcategories: res.sub_categories}))
          } else {
            dispatch(errorActions.setError({error:true}))
            dispatch(subCategoryActions.setMessage({message:'Sorry something went wrong!!'}))
          }
        }).catch((err) => {
          dispatch(errorActions.setError({error:true}))
          dispatch(subCategoryActions.setMessage({message:'Sorry something went wrong!!'}))
        })
    };
  };

  export const updateSubCategoryData = (id,name,hindiName) => {
  
    return (dispatch) => {
        fetch(`${laravel_api}sub-categories/${id}`, {
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
            dispatch(subCategoryActions.setMessage({message:'Sub-category updated successfully'})) 
            dispatch(subCategoryActions.setSubCategories({subcategories: res.sub_categories}))
            dispatch(subCategoryActions.setLoading({loading:false}))
            dispatch(subCategoryActions.setSuccess({success:true}))
          } else {
            dispatch(subCategoryActions.setLoading({loading:false}))
            dispatch(subCategoryActions.setFailed({failed:true}))
            dispatch(subCategoryActions.setMessage({message:res.message}))
          }
        }).catch((err) => {
          dispatch(subCategoryActions.setLoading({loading:false}))
          dispatch(errorActions.setError({error:true}))
          dispatch(subCategoryActions.setMessage({message:""}))
        })
    };
  };