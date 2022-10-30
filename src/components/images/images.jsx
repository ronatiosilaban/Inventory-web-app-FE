import React from 'react';
import cssModules from '../../styles/add.module.css';
import { Box } from '@mui/material';

const Images = ({preview}) => {
    return (
        <Box flex={3} p={2} sx={{ display :{ xs:'block' ,sm:"none"}}}>
          
                <div className={cssModules.previews}>
                         {preview && (
                            <div>
                                <img
                                    src={preview}
                                    style={{
                                        width: '65%',
                                        maxHeight: '100%',
                                        objectFit: 'cover',
                                    }}
                                    alt="preview"
                                />
                            </div>
                        )}

                        </div>
                       
        </Box>
    );
}

export default Images;