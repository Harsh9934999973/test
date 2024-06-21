import React from 'react'
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

function Loading({id, name}) {

      return <div>
      <Box sx={{ width: '100%' }}>
       <LinearProgress />
      </Box>
      <h2 className='tc mt2 b'>Loading...</h2>
      </div>
}

export default Loading