import React from 'react';
import cssModules from '../../styles/add.module.css';
import { Box } from '@mui/material';

const Image = ({preview}) => {
    return (
        <Box flex={6} p={2} sx={{ display :{ xs:'none' ,sm:"block"}}}>
                        {
            preview? (
                <div className={cssModules.preview}>
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
                          ):(
                            <img style={{width:'400px'}} src="https://tse4.explicit.bing.net/th?id=OIP._-sxTQ4ikrXv-tVQtf8uawAAAA&pid=Api&P=0" alt="" />
                            )
                            }
        </Box>
    );
}

export default Image;
