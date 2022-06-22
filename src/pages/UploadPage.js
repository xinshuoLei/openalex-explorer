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
import { vs2015, CopyBlock, Code, nord } from 'react-code-blocks';
import { ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/system';

export const UploadPage = () => {
  const [filename, setFilename] = useState("");
  const [canRun, setCanRun] = useState(false);
  const [scriptOutput, setScriptOutput] = useState(["No script running..."])


  const example = 
    `from database_connection.connect import cursor, conn

if __name__ == "__main__":
    cursor.execute("SELECT * FROM openalex.concepts LIMIT 10")
    print(cursor.fetchone())`

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
    setScriptOutput([`Running ${filename}...`])
    setCanRun(false);
    await fetch(`http://localhost:3001/run_script?filename=${filename}`)
      .then(response => {
        return response.text();
      }).then(data => {
        console.log(data);
        setFilename("");
        setScriptOutput([`output of ${filename}:`, data])
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
              Run a data cleaning script
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
            overflow="auto"
        > 
        <Typography variant='h5' fontFamily="monospace">Instructions</Typography>
        
        <Box 
          marginTop={2}
          width="60vw"
          display="flex"
          flexDirection="column"
          >
          <Typography variant='h6' fontFamily="monospace" marginBottom={2} fontWeight="500">
            1. Writing a script
          </Typography>
          <Typography variant='h7' fontFamily="monospace" marginBottom={2}> 
            Connection to the database is already written for you with <Link href='https://www.psycopg.org/docs/'>psycopg2</Link>. 
            In order to connect to the database, import the connection module with the following code
            
          </Typography>
          <CopyBlock theme={nord} 
            text="from database_connection.connect import cursor, conn"
            language="python"
          />
          <Typography marginTop={2} fontFamily="monospace"> 
            <Code text="conn" theme={nord} /> is a 
              psycopg2 <Link href='https://www.psycopg.org/docs/connection.html#connection'>
              connection</Link> object. <Code text="cursor" theme={nord} /> is a 
              psycopg2 <Link href='https://www.psycopg.org/docs/cursor.html'>
              cursor</Link> object, which can be used to execute PostgreSQL command. These two variables are all you need to connect to and 
              interact with the database.
          </Typography>
          <Typography variant='h7' fontFamily="monospace" marginTop={2}>
            You can view the database 
            schema <Link href="https://docs.openalex.org/download-snapshot/upload-to-your-database/load-to-a-relational-database/postgres-schema-diagram">here</Link>.
          </Typography>
          <Typography variant='h7' fontFamily="monospace" marginTop={2} marginBottom={2}>
            Example script:
          </Typography>
          <CopyBlock 
            text={example}
            showLineNumbers={true}
            language="python"
            theme={nord}
          />
          <Typography variant='h7' fontFamily="monospace" marginTop={2}>
            Click <Link href="template.py" download={true}>here</Link> to download a script template.
          </Typography>
        </Box>
        <Box 
          marginTop={5}
          width="60vw"
          display="flex"
          flexDirection="column"
          >
          <Typography variant='h6' fontFamily="monospace" marginBottom={2} fontWeight="500">
            2. Running a script
          </Typography>
          <Typography variant='h7' fontFamily="monospace" marginBottom={2}> 
            After uploading a script, simply click the run script button next to the upload button to run you script.
            Your python script's stdout will be shown in the window below.
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
        <Box
          width="60vw"
          marginTop={3}
          height="50vh"
          p={3}
          overflow="auto"
          bgcolor="black">
        {scriptOutput.map(line => <Typography color="white" fontFamily="monospace" marginTop={1}>{line}</Typography>)}
        </Box>
      </Box>
    </ Box>
  )
}