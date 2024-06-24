import { yearActions } from './yearSlice';
import {laravel_api} from '../configuration';
import { errorActions } from './errorSlice';

export const getYearTypeData = () => {
  
    return (dispatch) => {
        fetch(`${laravel_api}year-types`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('hjhgj')}`,
          }
        })
        .then(response => response.json())
        .then(res => {
          if (res.status === 200) {
            dispatch(yearActions.setLoading({loading:false}))
            dispatch(yearActions.setYearTypes({yearTypes: res.years}))
          } else {
            dispatch(errorActions.setError({error:true}))
            dispatch(yearActions.setMessage({message:'Sorry something went wrong!!'}))
          }
        }).catch((err) => {
          dispatch(errorActions.setError({error:true}))
          dispatch(yearActions.setMessage({message:'Sorry something went wrong!!'}))
        })
    };
  };

  export const getYearValuesData = (id) => {
  
    return (dispatch) => {
        fetch(`${laravel_api}year-values/${id}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('hjhgj')}`,
          }
        })
        .then(response => response.json())
        .then(res => {
          if (res.status === 200) {
            dispatch(yearActions.setLoading({loading:false}))
            dispatch(yearActions.setyearValues({yearValues: res.years}))
          } else {
            dispatch(errorActions.setError({error:true}))
            dispatch(yearActions.setMessage({message:'Sorry something went wrong!!'}))
          }
        }).catch((err) => {
          dispatch(errorActions.setError({error:true}))
          dispatch(yearActions.setMessage({message:'Sorry something went wrong!!'}))
        })
    };
  };