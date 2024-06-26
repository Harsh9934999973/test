import React, {useEffect, useState} from 'react'
import { useParams, useNavigate } from "react-router-dom";
import {laravel_api} from '../configuration';
import { errorActions } from '../store/errorSlice';
// import {getSchemesData,updateSchemeData,deleteSchemeData} from '../store/schemes-action';
// import {schemesActions} from '../store/schemesSlice';
// import {divisionsActions} from '../store/divisionsSlice';
import { useSelector, useDispatch } from 'react-redux';
import SchemeEditButton from './Utilities/SchemeEditButton';
import SchemeDeleteButton from './Utilities/SchemeDeleteButton';
import { DataGrid, GridToolbar,GridActionsCellItem } from '@mui/x-data-grid';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from '@mui/material/Modal';
import Snackbar from '@mui/material/Snackbar';
import PageviewIcon from '@mui/icons-material/Pageview';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MuiAlert from '@mui/material/Alert';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function isOverflown(element) {
  return (
    element.scrollHeight > element.clientHeight ||
    element.scrollWidth > element.clientWidth
  );
}

const GridCellExpand = React.memo(function GridCellExpand(props) {
  const { width, value } = props;
  const wrapper = React.useRef(null);
  const cellDiv = React.useRef(null);
  const cellValue = React.useRef(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [showFullCell, setShowFullCell] = React.useState(false);
  const [showPopper, setShowPopper] = React.useState(false);

  const handleMouseEnter = () => {
    const isCurrentlyOverflown = isOverflown(cellValue.current);
    setShowPopper(isCurrentlyOverflown);
    setAnchorEl(cellDiv.current);
    setShowFullCell(true);
  };

  const handleMouseLeave = () => {
    setShowFullCell(false);
  };

  React.useEffect(() => {
    if (!showFullCell) {
      return undefined;
    }

    function handleKeyDown(nativeEvent) {
      // IE11, Edge (prior to using Bink?) use 'Esc'
      if (nativeEvent.key === 'Escape' || nativeEvent.key === 'Esc') {
        setShowFullCell(false);
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [setShowFullCell, showFullCell]);

  return (
    <Box
      ref={wrapper}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      sx={{
        alignItems: 'center',
        lineHeight: '24px',
        width: 1,
        height: 1,
        position: 'relative',
        display: 'flex'
      }}
    >
      <Box
        ref={cellDiv}
        sx={{
          height: 1,
          width,
          display: 'block',
          position: 'absolute',
          top: 0,
        }}
      />
      <Box
        ref={cellValue}
        sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
      >
        {value}
      </Box>
      {showPopper && (
        <Popper
          open={showFullCell && anchorEl !== null}
          anchorEl={anchorEl}
          style={{ width, marginLeft: -17 }}
        >
          <Paper
            elevation={1}
            style={{ minHeight: wrapper.current.offsetHeight - 3 }}
          >
            <Typography variant="body2" style={{ padding: 8 }}>
              {value}
            </Typography>
          </Paper>
        </Popper>
      )}
    </Box>
  );
});

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: '#fff',
  border: '0px solid #000',
  boxShadow: 24,
  borderRadius: 5,
  p: 4,
};

GridCellExpand.propTypes = {
  value: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
};

function renderCellExpand(params) {
  return (
    <GridCellExpand value={params.value || ''} width={params.colDef.computedWidth} />
  );
}

renderCellExpand.propTypes = {
  /**
   * The column of the row that the current cell belongs to.
   */
  colDef: PropTypes.object.isRequired,
  /**
   * The cell value, but if the column has valueGetter, use getValue.
   */
  value: PropTypes.string.isRequired,
};

const VISIBLE_FIELDS = ['Type ', 'Year', 'Category', 'Sub Category Name', 'Document No', 'Document Date', 'Reference No', 'Reference Date', 'Title', 'New Tag', 'Show New Tag in Days'];

function ManagePosting() {

    let params = useParams();
    let navigate = useNavigate();
    const dispatch = useDispatch();
    // const schemes = useSelector((state) => state.schemes.schemes);
    // const editSchemeId = useSelector((state) => state.schemes.editSchemeId);
    // const deleteSchemeId = useSelector((state) => state.schemes.deleteSchemeId);
    // const editSchemeStateName = useSelector((state) => state.schemes.editSchemeStateName);
    // const editSchemeCenterName = useSelector((state) => state.schemes.editSchemeCenterName);
    // const editSchemeCenterCode = useSelector((state) => state.schemes.editSchemeCenterCode);
    // const editSchemeStateCode = useSelector((state) => state.schemes.editSchemeStateCode);
    // const editmessage = useSelector((state) => state.schemes.editmessage);
    // const editNotificationSuccess = useSelector((state) => state.schemes.editNotificationSuccess);
    // const deleteNotificationSuccess = useSelector((state) => state.schemes.deleteNotificationSuccess);
    // const updateScheme = useSelector((state) => state.schemes.updateScheme);
    // const finYear = useSelector((state) => state.finYear.finYear);

    const [schemes, setSchemes] = useState([])
    const [editSchemeId, setEditSchemeId] = useState('')
    const [deleteSchemeId, setDeleteSchemeId] = useState('')
    const [editmessage, setEditmessage] = useState('')
    const [editNotificationSuccess, setEditNotificationSuccess] = useState(false)
    const [deleteNotificationSuccess, setDeleteNotificationSuccess] = useState(false)
    const [updateScheme, setUpdateScheme] = useState(false)
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
        attachment: '',
        new_tag: 'Y',
        new_tag_day: '',
      });
    

    const { data } = {
      dataSet: schemes,
      visibleFields: VISIBLE_FIELDS,
      rowLength: 100
    };

    useEffect(() => {
        setUpdateScheme(false)
        fetchDocuments();   
        return () => {
        //   dispatch(schemesActions.setSchemes({schemes: []})) 
        //   dispatch(divisionsActions.setDivisions({divisions: []})) 
        //   dispatch(schemesActions.setEditNotificationSuccess({editNotificationSuccess:false}))  
        //   dispatch(schemesActions.setDeleteNotificationSuccess({deleteNotificationSuccess:false}))
        }
        }, []);

    useEffect(() => {
        if(updateScheme){
        setUpdateScheme(false)
        fetchDocuments(); 
        }
        }, [updateScheme]);

        const fetchDocuments = () => {
            const token = sessionStorage.getItem('hjhgj');
          
            fetch(`${laravel_api}documents`, {
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
                setSchemes(res.documents);
                return 
              } else {
                dispatch(errorActions.setError({error:true}))
              }
            })
            .catch(error => {
              dispatch(errorActions.setError({error:true}))
            });
          };

        const handleActionClick = (params) => {
            console.log(params)
            const pdfUrl = `${laravel_api}documents/${params.row.id}`;
            window.open(pdfUrl, '_blank');
            // const selectedScheme = schemes.filter(scheme => scheme.id === id)
            // dispatch(schemesActions.setSchemeSearch({schemeSearch: selectedScheme[0]})) 
            return 
      }

  const handleCreateScheme = () => {
    return navigate(`/dashboard/createscheme`);
  }

  const [open1, setOpen1] = React.useState(false);

  const handleOpen1 = (scheme) => {
    setOpen1(true);
    setEditSchemeId(scheme.id)
    setFormData({
        type: scheme.type,
        sessionYearPost: '',
        financialYearPost: '',
        yearValue:scheme.yearValue,
        category: scheme.category,
        subCategory: scheme.subCategory,
        doc_nos: scheme.doc_nos,
        doc_date: scheme.doc_date,
        ref_nos: scheme.ref_nos,
        ref_date: scheme.ref_date,
        title: scheme.title,
        attachment: scheme.attachment,
        new_tag: scheme.new_tag,
        new_tag_day: scheme.new_tag_day,
      })
    // dispatch(schemesActions.setEditSchemeId({editSchemeId: scheme.id})) 
    // dispatch(schemesActions.setEditSchemeStateName({editSchemeStateName: scheme.state_name})) 
    // dispatch(schemesActions.setEditSchemeCenterName({editSchemeCenterName: scheme.center_name})) 
    // dispatch(schemesActions.setEditSchemeCenterCode({editSchemeCenterCode: scheme.center_code})) 
    // dispatch(schemesActions.setEditSchemeStateCode({editSchemeStateCode: scheme.state_code})) 
  };

  const handleClose1 = () => {
    setOpen1(false);
    setEditSchemeId('')
    setFormData({
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
        attachment: '',
        file:null,
        new_tag: '',
        new_tag_day: '',
      })
      setEditmessage('')
  };

  const handleEditScheme = (scheme) => {
    handleOpen1(scheme)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditmessage('')
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAttachmentChange = (e) => {
    setFormData({
      ...formData,
      file: e.target.files[0],
    });
  };

//   const handleEditSchemeStateNameChange = (event) => {
//     dispatch(schemesActions.setEditMessage({editmessage: ''}))
//     dispatch(schemesActions.setEditSchemeStateName({editSchemeStateName:event.target.value}))
//   }

//   const handleEditSchemeCenterNameChange = (event) => {
   
//     dispatch(schemesActions.setEditMessage({editmessage: ''}))
//     dispatch(schemesActions.setEditSchemeCenterName({editSchemeCenterName:event.target.value}))
//   }

//   const handleEditSchemeStateCodeChange = (event) => {
    
//     dispatch(schemesActions.setEditMessage({editmessage: ''}))
//     dispatch(schemesActions.setEditSchemeStateCode({editSchemeStateCode:event.target.value}))
//   }

//   const handleEditSchemeCenterCodeChange = (event) => {
//     dispatch(schemesActions.setEditMessage({editmessage: ''}))
//     dispatch(schemesActions.setEditSchemeCenterCode({editSchemeCenterCode:event.target.value}))
//   }

  const onSubmitUpdateScheme = async (e) => {
    e.preventDefault();

    const token = sessionStorage.getItem('hjhgj');
    const formDataToSend = new FormData();
    for (const key in formData) {
        formDataToSend.append(key, formData[key]);
    }

    try {
        const response = await fetch(`${laravel_api}documents/${editSchemeId}`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formDataToSend,
        });
        if (!response.ok) {
            throw new Error('Failed to upload document');
        }
        handleClose1()
        setUpdateScheme(true)
        setEditNotificationSuccess(true)
        // if(res.status === 200){
        //     handleClose1()
        // setEditNotificationSuccess(true)
        //     return
        // } else {
        //     handleClose1()
        // }
    } catch (error) {
        console.error('Error uploading document:', error);
        // Handle error message
    }
};

  const handleDeleteScheme = (id) => {
    handleOpen18(id)
  }

  const [open18, setOpen18] = React.useState(false);
    const [allowDeleteScheme, setAllowDeleteScheme] = React.useState(false);

    const handleOpen18 = (id) => {
      setOpen18(true)
      setAllowDeleteScheme(true)
      setDeleteSchemeId(id)
    };
    const handleClose18 = () => {
      setOpen18(false)
      setDeleteSchemeId('')
      setAllowDeleteScheme(false)
    };

    const handleSchemeDelete = async () => {
        try {
          const response = await fetch(`${laravel_api}document/${deleteSchemeId}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
      
          if (!response.ok) {
            throw new Error('Failed to delete document');
          }
          handleClose18()
          setUpdateScheme(true)
          setDeleteNotificationSuccess(true) 
        } catch (error) {
          console.error('Error deleting document:', error);
        }
      };
      
    
      const columns = React.useMemo(
        () => [
            { field: 'type', hideable: false, headerName: 'Type', headerAlign: 'left', headerClassName: 'themeheader', cellClassName: 'themecell', width: 150 },
  { field: 'yearValue', hideable: false, headerName: 'Year', headerAlign: 'left', headerClassName: 'themeheader', cellClassName: 'themecell', width: 150 },
  { field: 'category', hideable: false, headerName: 'Category', headerAlign: 'left', headerClassName: 'themeheader', cellClassName: 'themecell', width: 150 },
  { field: 'subCategory', hideable: false, headerName: 'Sub-Category', headerAlign: 'left', headerClassName: 'themeheader', cellClassName: 'themecell', width: 150 },
  { field: 'doc_nos', hideable: false, headerName: 'Document Number', headerAlign: 'left', headerClassName: 'themeheader', cellClassName: 'themecell', width: 150 },
  { field: 'doc_date', hideable: false, headerName: 'Document Date', headerAlign: 'left', headerClassName: 'themeheader', cellClassName: 'themecell', width: 150 },
  { field: 'ref_nos', hideable: false, headerName: 'Reference Number', headerAlign: 'left', headerClassName: 'themeheader', cellClassName: 'themecell', width: 150 },
  { field: 'ref_date', hideable: false, headerName: 'Reference Date', headerAlign: 'left', headerClassName: 'themeheader', cellClassName: 'themecell', width: 150 },
  { field: 'title', hideable: false, headerName: 'Title', headerAlign: 'left', headerClassName: 'themeheader', cellClassName: 'themecell', renderCell: renderCellExpand, width: 200  },
//   { field: 'attachment', hideable: false, headerName: 'Attachment', headerAlign: 'center', headerClassName: 'themeheader', cellClassName: 'themecell', flex: 1 },
  { field: 'new_tag', hideable: false, headerName: 'New Tag', headerAlign: 'left', headerClassName: 'themeheader', cellClassName: 'themecell', width: 100 },
  { field: 'new_tag_day', hideable: false, headerName: 'New Tag Day', headerAlign: 'left', headerClassName: 'themeheader', cellClassName: 'themecell', width: 120 },
        // { field: 'center_name', headerName: 'Center Scheme Name',flex: 2, headerClassName: 'themeheader',headerAlign: 'center',cellClassName: 'themecell1',renderCell: renderCellExpand },
        {
          field: 'edit',
          headerName: 'Edit',
          width: 75,
          headerClassName: 'themeheader',
          cellClassName: 'themecell1',
          renderCell: (params) => <SchemeEditButton status={params} handleEditScheme={handleEditScheme}/>
        },
        {
          field: 'delete',
          headerName: 'Delete',
          width: 75,
          headerClassName: 'themeheader',
          cellClassName: 'themecell1',
          renderCell: (params) => <SchemeDeleteButton status={params} handleDeleteScheme={handleDeleteScheme}/>
        },
        {
          field: 'actions',
          type: 'actions',
          width: 90,
          headerName: 'View Document',
          headerAlign: 'center', 
          headerClassName: 'themeheader',
          cellClassName: 'themecell',
          getActions: (params) => [
            <GridActionsCellItem
              icon={<div className='f6'><PageviewIcon color="actions"/></div>}
              label="Delete"
              onClick={() => handleActionClick(params)}
            />,
          ],
        },
      ],
      [handleActionClick],
      );

      const handleEditSchemeNotificationSuccess = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setEditNotificationSuccess(false) 
      };

      const handleDeleteSchemeNotificationSuccess = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setDeleteNotificationSuccess(false)  
      };

  return (<>
    {/* <h1>{`${division[0].name} Division`}</h1> */}
    <Snackbar open={editNotificationSuccess} autoHideDuration={4000} onClose={handleEditSchemeNotificationSuccess}>
        <Alert onClose={handleEditSchemeNotificationSuccess} severity="success" sx={{ width: '100%' }}>
          Document updated successfully!
        </Alert>
      </Snackbar>
      <Snackbar open={deleteNotificationSuccess} autoHideDuration={4000} onClose={handleDeleteSchemeNotificationSuccess}>
        <Alert onClose={handleDeleteSchemeNotificationSuccess} severity="success" sx={{ width: '100%' }}>
          Document deleted successfully!
        </Alert>
      </Snackbar>
      <Dialog
        open={open18}
        onClose={handleClose18}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirm Document Delete"}
        </DialogTitle>
        {allowDeleteScheme ? <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this document?
          </DialogContentText>
        </DialogContent> : <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Please edit the Scheme as Schemes cannot be empty!!
          </DialogContentText>
        </DialogContent>}
        {allowDeleteScheme && <DialogActions>
          <Button onClick={handleClose18}>Disagree</Button>
          <Button onClick={handleSchemeDelete} autoFocus>
            Agree
          </Button>
        </DialogActions>}
      </Dialog>
    <Modal
        open={open1}
        onClose={handleClose1}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
          <span className="b nunito">Edit Document</span>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {/* <div className="pa4 black-80">
    <label htmlFor="name" className="f6 b db mb2 nunito">Edit Scheme State Code</label>
    <input id="name" className="ba b--black-80 pa2 mb2 db w-100 bg-transparent" type="text" aria-describedby="name-desc" onChange={handleEditSchemeStateCodeChange} value={editSchemeStateCode}/>
    <label htmlFor="name" className="f6 b db mb2 nunito">Edit Scheme State Name</label>
    <input id="name" className="ba b--black-80 pa2 mb2 db w-100 bg-transparent" type="text" aria-describedby="name-desc" onChange={handleEditSchemeStateNameChange} value={editSchemeStateName}/>
    <label htmlFor="name" className="f6 b db mb2 nunito">Edit Scheme Center Code</label>
    <input id="name" className="ba b--black-80 pa2 mb2 db w-100 bg-transparent" type="text" aria-describedby="name-desc" onChange={handleEditSchemeCenterCodeChange} value={editSchemeCenterCode}/>
    <label htmlFor="name" className="f6 b db mb2 nunito">Edit Scheme Center Name</label>
    <input id="name" className="ba b--black-80 pa2 mb2 db w-100 bg-transparent" type="text" aria-describedby="name-desc" onChange={handleEditSchemeCenterNameChange} value={editSchemeCenterName}/>
    {(editmessage !== '') && <p className="f6 ph3 pv2 mb2 mt2 red w-100 tc pointer b ba b--dark-red nunito">{editmessage}</p>} 
    <div className='flex justify-center'>
    <p className="f6 link dim br3 ph3 pv2 mb2 mt2 white bg-dark-green w5 tc pointer" onClick={onSubmitUpdateScheme}>Update</p>
    </div>
    </div>*/}
    <div className="container-fluid">
      <div className="card">
        <div className="card-body">
          <div className="col-md-12">
            {/* <h5 className="card-title fw-semibold mb-4">Edit Document</h5> */}

            <form onSubmit={onSubmitUpdateScheme} encType="multipart/form-data">

              {/* <div className="row">
                <div className="mb-3 col-md-6">
                  <label htmlFor="type" className="form-label">Type </label>
                  <select name="type" id="type" className="form-control" 
                //   onChange={handleInputChange} 
                  value={formData.type}>
                    <option value="">Choose Type</option>
                    {types.map(type => <option key={type.id} value={type.id}>{type.name}</option>
                    )}
                  </select>
                </div>
                <div className="mb-3 col-md-6" id="syField">
                  <label htmlFor="yearValue" className="form-label">Year </label>
                  <select name="yearValue" id="yearValue" className="form-control" 
                //   onChange={handleInputChange} 
                  value={formData.yearValue} required>
                  <option value="">Choose Year</option>
                    {yearValues.map(type => <option key={type.id} value={type.id}>{type.value}</option>
                    )}
                  </select>
                </div>
              </div> */}

              <div className="row">
                {/* <div className="mb-3 col-md-6">
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
                </div> */}

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
                <div className="">
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

              <button type="submit" className="btn btn-primary">Update</button>
            </form>
          </div>
        </div>
      </div>
    </div>
          </Typography>
        </Box>
      </Modal>
      {/* <p className="f6 link dim br3 ph3 pv2 ml2 mb2 dib mt2 white bg-dark-green w5 tc pointer" onClick={handleCreateScheme}>+ Create New Scheme</p>   */}
    <div style={{ display: 'flex', height: '100%', width: '100%' }}>
    {/* <div style={{ flexGrow: 1 }}> */}
      <DataGrid 
    //   nonce={NWEBPV}
      columns={columns}
      rows={schemes} 
      components={{ Toolbar: GridToolbar }} />
    {/* </div> */}
    </div> 
    </>
  )
}

export default ManagePosting