import React,{useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { subCategoryActions } from '../store/subCategorySlice';
import { createSubCategoryData } from '../store/subCategory-actions';
import { categoryActions } from '../store/categorySlice';
import { getCategoriesData } from '../store/category-actions';
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CreateSubCategory = () => {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    
    const subCatName = useSelector((state) => state.subcategory.name);
    const hnSubCatName = useSelector((state) => state.subcategory.hindiName);
    const message = useSelector((state) => state.subcategory.message);
    const categoryId = useSelector((state) => state.subcategory.categoryId);
    const loading = useSelector((state) => state.subcategory.loading);
    const success = useSelector((state) => state.subcategory.success);
    const failed = useSelector((state) => state.subcategory.failed);
    const categories = useSelector((state) => state.category.categories);

    const [validation, setValidation] = useState(false)

    useEffect(() => {
        dispatch(getCategoriesData())
        
        return () => {
            dispatch(subCategoryActions.setName({name:''}))
          dispatch(subCategoryActions.setHindiName({hindiName:''}))
          dispatch(subCategoryActions.setCategoryId({categoryId: ''}))
          setValidation(false)
          dispatch(subCategoryActions.setFailed({failed:false}))
        }
    }, []);

    useEffect(() => {
        if(success){
            return navigate(`/dashboard/managesubcategory`);
        }
    }, [success])

    // const fetchCategories = async () => {
    //     try {
    //         const response = await fetch('/api/categories');
    //         if (!response.ok) {
    //             throw new Error('Failed to fetch categories.');
    //         }
    //         const data = await response.json();
    //         setCategories(data); // Assuming data is an array of categories
    //     } catch (error) {
    //         console.error('Error fetching categories:', error);
    //     }
    // };

    const handleSubmit = async (e) => {
        if(subCategoryActions === ''){
            dispatch(subCategoryActions.setMessage({message:'Please enter a name'}))
            setValidation(true)
            return
        }
        if(categoryId === ''){
            dispatch(subCategoryActions.setMessage({message:'Please select a category'}))
            setValidation(true)
            return
        }
        dispatch(createSubCategoryData(subCatName, hnSubCatName, categoryId))
    };

    const handleCloseFailed = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        dispatch(subCategoryActions.setMessage({message:''})) 
        dispatch(subCategoryActions.setFailed({failed:false}))
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
                        <h5 className="card-title fw-semibold mb-4">Create Sub Category</h5>

                        
                            <div className="mb-3">
                                <label htmlFor="categoryId" className="form-label">Sub Category Name<span className="text-danger">*</span></label>
                                <select name="categoryId" id="categoryId" className="form-control" value={categoryId} onChange={(e) => {
                                    dispatch(subCategoryActions.setMessage({message:''})) 
                                    setValidation(false)
                                    dispatch(subCategoryActions.setCategoryId({categoryId:e.target.value}))}} required>
                                    <option value="">Choose Category...</option>
                                    {categories.map(category => (
                                        <option key={category.id} value={category.id}>{category.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="subCatName" className="form-label">English Sub-Category Name <span className="text-danger">*</span></label>
                                <input type="text" name="subCatName" id="subCatName" className="form-control" value={subCatName} onChange={(e) => {
                                    dispatch(subCategoryActions.setMessage({message:''})) 
                                    setValidation(false)
                                    dispatch(subCategoryActions.setName({name:e.target.value}))}} 
                                    required />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="hnSubCatName" className="form-label">Hindi Sub-Category Name</label>
                                <input type="text" name="hnSubCatName" id="hnSubCatName" className="form-control" value={hnSubCatName} onChange={(e) => {
                                    dispatch(subCategoryActions.setMessage({message:''})) 
                                    setValidation(false)
                                    dispatch(subCategoryActions.setHindiName({hindiName:e.target.value}))}} 
                                    />
                            </div>

                            {/* Uncomment below if you want to add description field */}
                            {/* <div className="mb-3">
                                <label htmlFor="description" className="form-label">Description</label>
                                <textarea name="description" id="description" className="form-control" />
                            </div> */}

                            <button onClick={handleSubmit} type="submit" className="btn btn-primary">Submit</button>
                        
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default CreateSubCategory;
