import * as React from 'react';
import {
  Box,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Table
} from '@mui/material'
import { Upload, PlayArrow } from "@mui/icons-material";
import CodeEditor from '@uiw/react-textarea-code-editor'
import { useState, useEffect } from 'react';

export const QueryPage = () => {

    const [code, setCode] = React.useState(``);
    const [result, setResult] = useState(false);

    const executeQuery = () => {
        console.log(code)
        fetch('http://localhost:3001/query', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'code': code})
        }).then(response => {
            return response.text()
        }).then(data => {
            setResult(data)
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
                SQL query tool
            </Typography>
            </Toolbar>
        </AppBar>
        <Box
              display="flex"
              flexDirection="column"
              minHeight="100vh"
              width="84vw"
              alignItems="center"
              marginTop={15}
              marginBottom={10}
          >
            <Box
                display="flex"
                flexDirection="column"
                width="50vw">
                <Typography fontFamily="monospace" variant='h6' marginBottom={2}>
                    Query Editor
                </Typography>
                <CodeEditor
                    value=""
                    language="sql"
                    placeholder="Please enter your query here"
                    onChange={(evn) => setCode(evn.target.value)}
                    padding={15}
                    style={{
                        fontSize: 14,
                        height: "35vh",
                        backgroundColor: "#f5f5f5",
                        overflow: "auto",
                        fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                    }}
                    />
                <Button 
                    variant='contained' 
                    component="label" 
                    style={{width: "20vw", marginTop: "2vw", marginBottom: "3vw"}}
                    onClick={executeQuery}
                    startIcon={<PlayArrow />}>
                execute query
                </Button>
               {result?
               JSON.parse("[" + result + "]")[0].map(x => <Typography>{x.display_name}</Typography>) : <></>}
            </Box>
            
         </Box>
        </ Box>
    )
}