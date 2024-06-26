import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';

const SchemeDeleteButton = (params) => {
    return <div className='f6 pointer' onClick={() => params.handleDeleteScheme(params.status.row.id)}><DeleteIcon color="actions"/></div>
    }

export default SchemeDeleteButton