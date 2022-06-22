import * as React from 'react';
import {
  Box,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Link,
  Divider,
  TextField,
} from '@mui/material'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Image from 'mui-image'

export const ConceptInfoPage = () => {

    let { id }= useParams();
    const concept_id = "https://openalex.org/" + id;
    const [conceptInfo, setConceptInfo] = useState(false);

    useEffect(() => {
        getConceptInfo();
    }, []);

    const getConceptInfo = () => {
        fetch( `http://localhost:3001/concepts_info?id=${concept_id}`)
          .then(response => {
            return response.text();
          })
          .then(data => {
            setConceptInfo(JSON.parse("[" + data + "]")[0][0]);
          });
    }

    return (
        <Box sx={{ display: 'flex'}} >
        <CssBaseline />
        <AppBar
            position="fixed"
            sx={{ width: "84vw", ml: "16vw", bgcolor: "background.default"}}
        >
            <Toolbar>
            <Typography variant="h6" noWrap component="div" color="black" fontFamily="monospace">
                Concept Info
            </Typography>
            </Toolbar>
        </AppBar>
        <Box
              display="flex"
              flexDirection="column"
              minHeight="100vh"
              width="84vw"
              marginTop={15}
              marginBottom={10}
          > 
        { conceptInfo ? (
            <Box
                display="flex"
                flexDirection="column"
                minHeight="100vh"
                width="60vw"
                mx="auto"
                > 
                <Typography variant="h5" fontFamily="monospace">{conceptInfo.display_name}</Typography>
                <Box display="flex"
                     width="60vw"
                     mx="auto"
                     marginTop={5}>
                    <Box display="flex"
                     width="60vw"
                     mx="auto"
                     flexDirection="column">
                        <Typography variant="h7" fontFamily="monospace"  marginBottom={3}>{conceptInfo.description}</Typography>
                        <Typography variant="h7" fontFamily="monospace"  marginBottom={3}>works count: {conceptInfo.works_count}</Typography>
                        <Typography variant="h7" fontFamily="monospace"  marginBottom={3}>updated date: {conceptInfo.updated_date}</Typography>
                    </ Box>
                    <Image duration={0} height="20vw" fit="contain" marginTop={5}  src={conceptInfo.image_url}/>
                </Box>
            </ Box>
        ) 
        : 
        (<Typography mx="auto" fontFamily="monospace">Loading</Typography>)
         }
         </Box>
        </ Box>
    )
}