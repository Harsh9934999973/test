import React, { useState, useEffect } from 'react';
import {laravel_api} from '../configuration';
import { errorActions } from '../store/errorSlice';
import { useSelector, useDispatch } from 'react-redux';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Loading from '../Loading'

const DocumentPostingForm = () => {

  const dispatch = useDispatch();

  const [types, setTypes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [yearValues, setYearValues] = useState([])
  const [formData, setFormData] = useState({
    type: '',
    sessionYearPost: '',
    financialYearPost: '',
    yearValue:'',
    category: '',
    subCategory: '',
    doc_nos: '',
    doc_date: '',
    ref_nos: '',
    ref_date: '',
    title: '',
    attachment: null,
    new_tag: 'Y',
    new_tag_day: '',
  });

  useEffect(() => {
    fetchTypes();
    fetchCategories();
  }, []);

  useEffect(() => {
    setFormData({...formData,subCategory:''})
    if(formData.category !== ''){
      fetchSubcategories();
      return
    }
    setSubcategories([])
  }, [formData.category]);

  useEffect(() => {
    setFormData({...formData,yearValue:''})
    if(formData.type !== ''){
      fetchYearValues(formData.type)
      return
    }
    setYearValues([])
},[formData.type])

  const fetchTypes = () => {
    const token = sessionStorage.getItem('hjhgj');
  
    fetch(`${laravel_api}year-types`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch year types');
      }
      return response.json();
    })
    .then(res => {
      console.log(res)
      if (res.status === 200) {
        setTypes(res.years);
        return 
      } else {
        dispatch(errorActions.setError({error:true}))
      }
    })
    .catch(error => {
      dispatch(errorActions.setError({error:true}))
    });
  };
  
  const fetchCategories = async () => {
    const token = sessionStorage.getItem('hjhgj');
  
    fetch(`${laravel_api}categories`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch year types');
      }
      return response.json();
    })
    .then(res => {
      console.log(res)
      if (res.status === 200) {
        setCategories(res.categories);
        return 
      } else {
        dispatch(errorActions.setError({error:true}))
      }
    })
    .catch(error => {
      dispatch(errorActions.setError({error:true}))
    });
  };

  const fetchSubcategories = async () => {
    const token = sessionStorage.getItem('hjhgj');
  
    fetch(`${laravel_api}sub-categories/${formData.category}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch year types');
      }
      return response.json();
    })
    .then(res => {
      if (res.status === 200) {
        setSubcategories(res.sub_category);
        return 
      } else {
        dispatch(errorActions.setError({error:true}))
      }
    })
    .catch(error => {
      dispatch(errorActions.setError({error:true}))
    });
  };

  const fetchYearValues = async () => {
    const token = sessionStorage.getItem('hjhgj');
  
    fetch(`${laravel_api}year-values/${formData.type}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch year types');
      }
      return response.json();
    })
    .then(res => {
      if (res.status === 200) {
        setYearValues(res.years);
        return 
      } else {
        dispatch(errorActions.setError({error:true}))
      }
    })
    .catch(error => {
      dispatch(errorActions.setError({error:true}))
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAttachmentChange = (e) => {
    setFormData({
      ...formData,
      attachment: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = sessionStorage.getItem('hjhgj');
    const formDataToSend = new FormData();
    for (const key in formData) {
        formDataToSend.append(key, formData[key]);
    }

    try {
        const response = await fetch(`${laravel_api}documents`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formDataToSend,
        });
        if (!response.ok) {
            throw new Error('Failed to upload document');
        }
        console.log('Document uploaded successfully');
        // Handle success message or redirect as needed
    } catch (error) {
        console.error('Error uploading document:', error);
        // Handle error message
    }
};


  return (
    <div className="container-fluid">
      <div className="card">
        <div className="card-body">
          <div className="col-md-12">
            <h5 className="card-title fw-semibold mb-4">Post Documents</h5>

            <form onSubmit={handleSubmit} encType="multipart/form-data">

              <div className="row">
                <div className="mb-3 col-md-6">
                  <label htmlFor="type" className="form-label">Type </label>
                  <select name="type" id="type" className="form-control" onChange={handleInputChange} value={formData.type}>
                    <option value="">Choose Type</option>
                    {types.map(type => <option key={type.id} value={type.id}>{type.name}</option>
                    )}
                  </select>
                </div>
                <div className="mb-3 col-md-6" id="syField">
                  <label htmlFor="yearValue" className="form-label">Year </label>
                  <select name="yearValue" id="yearValue" className="form-control" onChange={handleInputChange} value={formData.yearValue} required>
                  <option value="">Choose Year</option>
                    {yearValues.map(type => <option key={type.id} value={type.id}>{type.value}</option>
                    )}
                  </select>
                </div>
              </div>

              <div className="row">
                <div className="mb-3 col-md-6">
                  <label htmlFor="category" className="form-label">Category <span className="text-danger">*</span></label>
                  <select name="category" id="category" className="form-control" onChange={handleInputChange} value={formData.category} required>
                    <option value="">Choose Category..</option>
                    {categories.map(category =>
                      <option key={category.id} value={category.id}>{category.name}</option>
                    )}
                  </select>
                </div>
                <div className="mb-3 col-md-6">
                  <label htmlFor="subCategory" className="form-label">Sub Category Name </label>
                  <select name="subCategory" id="subCategory" className="form-control" onChange={handleInputChange} value={formData.subCategory}>
                    <option value="">Choose Sub Category..</option>
                    {subcategories.map(subcategory =>
                      <option key={subcategory.id} value={subcategory.id}>{subcategory.name}</option>
                    )}
                  </select>
                </div>

                <div className="mb-3 col-md-6">
                  <label htmlFor="doc_nos" className="form-label">Document No. <span className="text-danger">*</span></label>
                  <input type="text" name="doc_nos" id="doc_nos" className="form-control" value={formData.doc_nos} onChange={handleInputChange} required />
                </div>
                <div className="mb-3 col-md-6">
                  <label htmlFor="doc_date" className="form-label">Document Date <span className="text-danger">*</span></label>
                  <input type="date" name="doc_date" id="doc_date" className="form-control" value={formData.doc_date} max={new Date().toISOString().split('T')[0]} onChange={handleInputChange} required />
                </div>
                <div className="mb-3 col-md-6">
                  <label htmlFor="ref_nos" className="form-label">Reference No.</label>
                  <input type="text" name="ref_nos" id="ref_nos" className="form-control" value={formData.ref_nos} onChange={handleInputChange} />
                </div>
                <div className="mb-3 col-md-6">
                  <label htmlFor="ref_date" className="form-label">Reference Date </label>
                  <input type="date" name="ref_date" id="ref_date" className="form-control" value={formData.ref_date} max={new Date().toISOString().split('T')[0]} onChange={handleInputChange} />
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">Title <span className="text-danger">*</span></label>
                <input type="text" name="title" id="title" className="form-control" value={formData.title} onChange={handleInputChange} required />
              </div>
              <div className="row">
                <div className="mb-3 col-md-6">
                  <label htmlFor="attachment" className="form-label">Attachment <span className="text-danger">* (Maximum 2MB file.)</span></label>
                  <input type="file" name="attachment" id="attachment" className="form-control col-md-8" onChange={handleAttachmentChange} accept=".pdf,.doc,.docx,image/*" />
                  <small id="size_error" style={{ display: 'none' }} className="text-danger">Please check File attachment size or file type.</small>
                </div>
                <div className="mb-3 col-md-6">
                  <div className="col-md-6" id="preview-attachment"></div>
                </div>
              </div>
              <div className="row">
                <div className="mb-3 col-md-6">
                  <label htmlFor="new_tag" className="form-label">New Tag <span className="text-danger">*</span></label>
                  <select name="new_tag" id="new_tag" className="form-control" value={formData.new_tag} onChange={handleInputChange}>
                    <option value="Y">Yes</option>
                    <option value="N">No</option>
                  </select>
                </div>
                <div className="mb-3 col-md-6">
                  <label htmlFor="new_tag_day" className="form-label">Show New Tag in Days <span className="text-danger">*</span></label>
                  <input type="number" name="new_tag_day" id="new_tag_day" className="form-control" value={formData.new_tag_day} onChange={handleInputChange} />
                </div>
              </div>

              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentPostingForm;
