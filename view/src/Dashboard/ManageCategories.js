import * as React from 'react';
import {useEffect} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { categoryActions } from '../store/categorySlice';
import { createCategoryData, getCategoriesData, updateCategoryData } from '../store/category-actions';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
// import {
//   randomCreatedDate,
//   randomTraderName,
//   randomId,
//   randomArrayItem,
// } from '@mui/x-data-grid-generator';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const roles = ['Market', 'Finance', 'Development'];
const randomRole = () => {
  return roles[1];
};

const initialRows = [
  {
    id: 1,
    name: "Test1",
    hn_name: ''
  },
  {
    id: 2,
    name: "Test2",
    hn_name: ''
  },
  {
    id: 3,
    name: "Test3",
    hn_name: ''
  },
  {
    id: 4,
    name: "Test4",
    hn_name: ''
  }
];

function EditToolbar(props) {
  const { dispatch, setRowModesModel, rows } = props;

  const handleClick = () => {
    const id = Math.random() * 100;
    const updatedRow = [...rows, { id, name: '', hn_name: '', isNew: true }]
    dispatch(categoryActions.setCategories({categories: updatedRow}));
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add category
      </Button>
    </GridToolbarContainer>
  );
}

export default function FullFeaturedCrudGrid() {

    const dispatch = useDispatch();

    const rows = useSelector((state) => state.category.categories);
    const message = useSelector((state) => state.category.message);
    const loading = useSelector((state) => state.category.loading);
    const success = useSelector((state) => state.category.success);
    const failed = useSelector((state) => state.category.failed);

  // const [rows, setRows] = React.useState(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState({});

  useEffect(() => {
    dispatch(getCategoriesData())
    return () => {
      dispatch(categoryActions.setMessage({message:''})) 
          dispatch(categoryActions.setCategories({categories: []}))
          dispatch(categoryActions.setLoading({loading:false}))
          dispatch(categoryActions.setSuccess({success:false}))
          dispatch(categoryActions.setFailed({failed:false}))
    }
  }, [])

  useEffect(() => {
    if(failed){
      dispatch(getCategoriesData())
      dispatch(categoryActions.setFailed({failed:false}))
    }
  }, [failed])

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    // setRows(rows.filter((row) => row.id !== id));
    dispatch(categoryActions.setCategories({categories: rows.filter((row) => row.id !== id)}))
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      dispatch(categoryActions.setCategories({categories: rows.filter((row) => row.id !== id)}))
      // setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    // dispatch(categoryActions.setCategories({categories:(rows.map((row) => (row.id === newRow.id ? updatedRow : row)))}));
    console.log(newRow)
    if(newRow.isNew){
        dispatch(createCategoryData(newRow.name,newRow.hn_name))
        return updatedRow;
    }

    dispatch(updateCategoryData(newRow.id, newRow.name,newRow.hn_name))
    
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    { field: 'name', headerName: 'Name', width: 180, editable: true },
    { field: 'hn_name', headerName: 'Hindi Name', width: 180, editable: true },
    // {
    //   field: 'age',
    //   headerName: 'Age',
    //   type: 'number',
    //   width: 80,
    //   align: 'left',
    //   headerAlign: 'left',
    //   editable: true,
    // },
    // {
    //   field: 'joinDate',
    //   headerName: 'Join date',
    //   type: 'date',
    //   width: 180,
    //   editable: true,
    // },
    // {
    //   field: 'role',
    //   headerName: 'Department',
    //   width: 220,
    //   editable: true,
    //   type: 'singleSelect',
    //   valueOptions: ['Market', 'Finance', 'Development'],
    // },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: 'primary.main',
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          // <GridActionsCellItem
          //   icon={<DeleteIcon />}
          //   label="Delete"
          //   onClick={handleDeleteClick(id)}
          //   color="inherit"
          // />,
        ];
      },
    },
  ];

  const handleCloseSuccess = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(categoryActions.setMessage({message:''})) 
    dispatch(categoryActions.setSuccess({success:false}))

  };

  const handleCloseFailed = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(categoryActions.setMessage({message:''})) 
    dispatch(categoryActions.setFailed({failed:false}))

  };

  return (
    <><Snackbar open={success} autoHideDuration={5000} onClose={handleCloseSuccess}>
    <Alert onClose={handleCloseSuccess} severity="success" sx={{ width: '100%' }}>
      {message}
    </Alert>
  </Snackbar>
  <Snackbar open={failed} autoHideDuration={5000} onClose={handleCloseFailed}>
    <Alert onClose={handleCloseFailed} severity="error" sx={{ width: '100%' }}>
    {message}
    </Alert>
  </Snackbar>
  <Box
      sx={{
        height: 500,
        width: '100%',
        '& .actions': {
          color: 'text.secondary',
        },
        '& .textPrimary': {
          color: 'text.primary',
        },
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{
          toolbar: EditToolbar,
        }}
        slotProps={{
          toolbar: { dispatch, setRowModesModel, rows },
        }}
      />
    </Box>
    </>
    
  );
}