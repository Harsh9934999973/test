import React from 'react'
import EditIcon from '@mui/icons-material/Edit';

const SchemeEditButton = (params) => {
    return <div className='f6 pointer' onClick={() => params.handleEditScheme(params.status.row)}><EditIcon color="actions"/></div>
    }

export default SchemeEditButton