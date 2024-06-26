import React from 'react'
import PageviewIcon from '@mui/icons-material/Pageview';

const SchemeEditButton = (params) => {
    return <div className='f6 pointer' onClick={() => params.handleEditScheme(params.status.row)}><PageviewIcon color="actions"/><span className='ml2 b'>Edit</span></div>
    }

export default SchemeEditButton