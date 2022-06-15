import * as React from 'react';
import {
  Box,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  List,
  Divider,
  TextField,
} from '@mui/material'
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'
import { ConceptCard } from '../components/ConceptCard';

export const ConceptResultPage = () => {
    const [searchResult, setSearchResult] = useState(false);
    const location = useLocation();
    const key = location.state.key;

    useEffect(() => {
        performSearch();
      }, []);
    
    const performSearch = () => {
        fetch( `http://localhost:3001/concepts_result/${encodeURIComponent(key)}`)
          .then(response => {
            return response.text();
          })
          .then(data => {
            setSearchResult(data);
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
                Concept Search Result
            </Typography>
            </Toolbar>
        </AppBar>
        <List style={{maxHeight: '100%', overflow: 'auto'}}>
          <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              minHeight="100vh"
              minWidth="84vw"
              marginTop={15}
              marginBottom={10}
          >   
                <Typography variant="h5" fontFamily="monospace">Most relevant results for "{key}"</Typography>
                {searchResult? 
                JSON.parse("[" + searchResult + "]")[0].map(x => <ConceptCard 
                                                                  name={x.display_name} 
                                                                  id={x.id}
                                                                  description={x.description? x.description : "no description available for this concept"}/>)
                : <Typography
                    fontFamily="monospace"
                    fontSize={14}
                    mx="auto"
                    marginBottom={1}>
                    Loading
                  </Typography>}
                
              
          </Box>
        </List>
        
        </ Box>
    )

}