import * as React from 'react';
import {
  Box,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Divider,
  TextField,
} from '@mui/material'

export const ConceptCard = ({name, description}) => {
    return (
        <Box 
            display="flex"
            flexDirection="column"
            boxShadow={3}
            px={2}
            py={2}
            marginTop={5}
            width="50vw">
            <Typography variant="h6" fontFamily="monospace">{name}</Typography>
            <Typography fontFamily="monospace" color="gray" marginTop={1}>{description}</Typography>
        </Box>
    )
}