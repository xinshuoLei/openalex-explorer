import * as React from 'react';
import {
  Box,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Link,
  Divider,
  TextField,
} from '@mui/material'
import { Upload, PlayArrow } from "@mui/icons-material";
import { useState, useEffect } from 'react';
import { textTransform } from '@mui/system';

export const UploadPage = () => {
  const [filename, setFilename] = useState("");
  const [canRun, setCanRun] = useState(false);

  const handleChange = async (e) => {
    const file = e.target.files[0];
    console.log(file)
    const formData = new FormData()
    formData.append('file', file)
    
    for (var key of formData.entries()) {
      console.log(key[0] + ', ' + key[1]);
    }


    await fetch('http://localhost:3001/upload', {
      mode: 'no-cors',
      method: 'POST',
      headers: {
        "Contetnt-Type":"multipart/form-data" 
      },
      body: formData
    }).then(response => {
      console.log(response)
      //console.log(response.json())
      setCanRun(true);
      setFilename(file.name);
    })
  };

  const runScript = async () => {
    setCanRun(false);
    await fetch(`http://localhost:3001/run_script?filename=${filename}`)
      .then(response => {
        return response.text();
      }).then(data => {
        console.log(data);
        setFilename("");
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
              Run data cleaning script
          </Typography>
          </Toolbar>
      </AppBar>
      <Box
            display="flex"
            flexDirection="column"
            width="84vw"
            marginTop={15}
            marginBottom={10}
            justifyContent="center"
            alignItems="center"
        > 
        <Typography variant='h5' fontFamily="monospace">Instructions</Typography>
        <Box 
          marginTop={2}
          width="60vw"
          >
          <Typography variant='h7' fontFamily="monospace" marginTop={2}> 
            Connection to the database is already written for you with psycopg2. In order to connect to the database,
            add the following line of code to the beginning of your script

          </Typography>
        </Box>
        <Box 
          marginTop={2}>
          <Button
            variant="outlined"
            component="label"
            size="small"
            style={{width: "20vw", textTransform: "none"}}
            onChange={handleChange}
            startIcon={<Upload />}
          >
            Upload script
            <input
              type="file"
              hidden
            />
          </Button>
          <Button
            variant='contained'
            component="label"
            disabled={!canRun}
            size="small"
            style={{marginLeft: "2vw", textTransform: "none"}}
            startIcon={<PlayArrow />}
            onClick={runScript}
          >
            {filename? "Run " + filename : "Upload a script first"}
          </Button>
        </Box>
      </Box>
    </ Box>
  )
}