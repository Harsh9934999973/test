import React,{useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { subCategoryActions } from '../store/subCategorySlice';
import { createSubCategoryData } from '../store/subCategory-actions';
import { getYearTypeData, getYearValuesData } from '../store/year-actions';
import { categoryActions } from '../store/categorySlice';
import { yearActions } from '../store/yearSlice';
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
    const yearTypes = useSelector((state) => state.year.yearTypes);
    const yearTypeId = useSelector((state) => state.year.yearTypeId);
    const yearValues = useSelector((state) => state.year.yearValues);
    const yearValueId = useSelector((state) => state.year.yearValueId);

    const [validation, setValidation] = useState(false)

    useEffect(() => {
        dispatch(subCategoryActions.setLoading({loading:false}))
        dispatch(getCategoriesData())
        dispatch(getYearTypeData())
        return () => {
            dispatch(subCategoryActions.setName({name:''}))
          dispatch(subCategoryActions.setHindiName({hindiName:''}))
          dispatch(subCategoryActions.setCategoryId({categoryId: ''}))
          setValidation(false)
          dispatch(categoryActions.setCategories({categories: []}))
          dispatch(subCategoryActions.setFailed({failed:false}))
          dispatch(subCategoryActions.setLoading({loading:true}))
          dispatch(yearActions.setYearTypeId({yearTypeId:''}))
          dispatch(yearActions.setYearValueId({yearValueId:''}))
          dispatch(yearActions.setYearTypes({yearTypes: []}))
          dispatch(yearActions.setyearValues({yearValues: []}))
        }
    }, []);

    useEffect(() => {
        if(success){
            return navigate(`/dashboard/managesubcategory`);
        }
    }, [success])

    useEffect(() => {
        if(yearTypeId !== ''){
            dispatch(getYearValuesData(yearTypeId))
        }
    },[yearTypeId])

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
        dispatch(createSubCategoryData(subCatName, hnSubCatName, categoryId, yearValueId))
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
                                <label htmlFor="categoryId" className="form-label">Select Category<span className="text-danger">*</span></label>
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
                                <label htmlFor="categoryId" className="form-label">Select Year Type<span className="text-danger">*</span></label>
                                <select name="yearTypeId" id="yearTypeId" className="form-control" value={yearTypeId} onChange={(e) => {
                                    dispatch(subCategoryActions.setMessage({message:''})) 
                                    setValidation(false)
                                    dispatch(yearActions.setYearTypeId({yearTypeId:e.target.value}))}} required>
                                    <option value="">Choose Year Type...</option>
                                    {yearTypes.map(category => (
                                        <option key={category.id} value={category.id}>{category.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="categoryId" className="form-label">Select Year Value<span className="text-danger">*</span></label>
                                <select name="yearValueId" id="yearValueId" className="form-control" value={yearValueId} onChange={(e) => {
                                    dispatch(subCategoryActions.setMessage({message:''})) 
                                    setValidation(false)
                                    dispatch(yearActions.setYearValueId({yearValueId:e.target.value}))}} required>
                                    <option value="">Choose Year Value...</option>
                                    {yearValues.map(category => (
                                        <option key={category.id} value={category.id}>{category.value}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="subCatName" className="form-label">Sub-Category Name <span className="text-danger">*</span></label>
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

{loading ? <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <CircularProgress />
    </Box> : <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>}
                        
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default CreateSubCategory;
