import React,{useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { categoryActions } from '../store/categorySlice';
import { createCategoryData } from '../store/category-actions';
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CreateCategory = () => {

    let navigate = useNavigate();
    const dispatch = useDispatch();
    
    const name = useSelector((state) => state.category.name);
    const hindiName = useSelector((state) => state.category.hindiName);
    const message = useSelector((state) => state.category.message);
    const loading = useSelector((state) => state.category.loading);
    const success = useSelector((state) => state.category.success);
    const failed = useSelector((state) => state.category.failed);

    const [validation, setValidation] = useState(false)

    useEffect(() => {
        dispatch(categoryActions.setLoading({loading:false}))
    return () => {
        // dispatch(categoryActions.setMessage({message:''})) 
        //   dispatch(categoryActions.setLoading({loading:false}))
          dispatch(categoryActions.setName({name:''}))
          dispatch(categoryActions.setHindiName({hindiName:''}))
          setValidation(false)
          dispatch(categoryActions.setFailed({failed:false}))
    } 
    }, [])

    useEffect(() => {
        if(success){
            return navigate(`/dashboard/managecategory`);
        }
    }, [success])

    const onNameChangeHandler = (event) => {
        dispatch(categoryActions.setMessage({message:''}))
        setValidation(false)
        dispatch(categoryActions.setName({name:event.target.value}))
      }  
  
      const onHindiNameChangeHandler = (event) => {
        dispatch(categoryActions.setMessage({message:''}))
        setValidation(false)
        dispatch(categoryActions.setHindiName({hindiName:event.target.value}))
        
      } 

      const handleSubmit = () => {
        if(name === ''){
            dispatch(categoryActions.setMessage({message:'Please enter a name'}))
            setValidation(true)
            return
        }
        dispatch(createCategoryData(name, hindiName))
      }

      const handleCloseFailed = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        dispatch(categoryActions.setMessage({message:''})) 
        dispatch(categoryActions.setFailed({failed:false}))
        setValidation(false)
    
      };

    return (
        <>
        <Snackbar open={failed} autoHideDuration={5000} onClose={handleCloseFailed}>
    <Alert onClose={handleCloseFailed} severity="error" sx={{ width: '100%' }}>
    {message}
    </Alert>
  </Snackbar>
        <Snackbar open={validation} autoHideDuration={5000} onClose={handleCloseFailed}>
    <Alert onClose={handleCloseFailed} severity="error" sx={{ width: '100%' }}>
    {message}
    </Alert>
  </Snackbar>
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
    </>
    )
}

export default CreateCategory