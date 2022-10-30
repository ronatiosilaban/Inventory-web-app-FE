import { Box } from '@mui/material';
import React from 'react';
import cssModules from  "../../styles/login.module.css"

const Logo = () => {
    return (
        <Box className={cssModules.body}  flex={6} p={5} sx={{ display :{ xs:'none' ,sm:"block"}}}>
        <img src="https://www.wgs.co.id/assets/logo_wgs_full.svg" alt="WGS"  className={cssModules.image}/>
       </Box>
    );
}


export default Logo;
