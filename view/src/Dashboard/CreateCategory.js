import React,{useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { categoryActions } from '../store/categorySlice';
import { createCategoryData } from '../store/category-actions';
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const CreateCategory = () => {

    let navigate = useNavigate();
    const dispatch = useDispatch();
    
    const name = useSelector((state) => state.category.name);
    const hindiName = useSelector((state) => state.category.hindiName);
    const message = useSelector((state) => state.category.message);
    const loading = useSelector((state) => state.category.loading);
    const success = useSelector((state) => state.category.success);

    useEffect(() => {

    return () => {
        dispatch(categoryActions.setMessage({message:''})) 
          dispatch(categoryActions.setLoading({loading:false}))
          dispatch(categoryActions.setName({name:''}))
          dispatch(categoryActions.setHindiName({hindiName:''}))
          dispatch(categoryActions.setSuccess({success:false}))
    } 
    }, [])

    useEffect(() => {
        if(success){
            return navigate(`/dashboard/main`);
        }
    }, [success])

    const onNameChangeHandler = (event) => {
        dispatch(categoryActions.setMessage({message:''}))
        dispatch(categoryActions.setName({name:event.target.value}))
      }  
  
      const onHindiNameChangeHandler = (event) => {
        dispatch(categoryActions.setMessage({message:''}))
        dispatch(categoryActions.setHindiName({hindiName:event.target.value}))
        
      } 

      const handleSubmit = () => {
        dispatch(createCategoryData(name, hindiName))
      }

    return (
        <div className="container-fluid">
        <div className="card">
            <div className="card-body">
                <div className="col-md-12">
                    <h5 className="card-title fw-semibold mb-4">Create Category</h5>
                        <div className="mb-3">
                            <label htmlFor="eng_cat" className="form-label">Name</label>
                            <input type="text" name="eng_cat" id="eng_cat" className="form-control" value={name} onChange={onNameChangeHandler}/>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="hn_cat" className="form-label">Hindi Name</label>
                            <input type="text" name="hn_cat" id="hn_cat" className="form-control" value={hindiName} onChange={onHindiNameChangeHandler} />
                        </div>
                        {loading ? <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <CircularProgress />
    </Box> : <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>}
                </div>
            </div>
        </div>
    </div>
    )
}

export default CreateCategory