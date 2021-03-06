import * as React from 'react';
import {
  Box,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Divider,
  Link,
  TextField,
} from '@mui/material'
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';


export const ConceptPage = () => {

  const navigate = useNavigate();
  const [newConcepts, setNewConcepts] = useState(false);
  const [popularConcepts, setPopularConcepts] = useState(false)



  useEffect(() => {
    getNewConcepts();
    getPopularConcepts();
  }, []);

  const { register, handleSubmit } = useForm()

  const SearchBar = () => (
    <form onSubmit={handleSubmit(performSearch)}>
      <TextField
        id="search-bar"
        className="text"
        variant="outlined"
        placeholder="Search..."
        size="small"
        style = {{width: "20vw"}}
        {...register("key")}
      />
      <IconButton type="submit" aria-label="search">
        <SearchIcon style={{ fill: "black" }} />
      </IconButton>
    </form>
  );

  const performSearch = (data) => {
    console.log(data.key)
    const searchKey = data.key;
    navigate("/concept_result", {state:{key:searchKey}})
  }

  
  
  const getNewConcepts = () => {
    fetch('http://localhost:3001/new_concepts')
      .then(response => {
        return response.text();
      })
      .then(data => {
        setNewConcepts(data);
      });
  }

  const getPopularConcepts = () => {
    fetch('http://localhost:3001/popular_concepts')
      .then(response => {
        return response.text();
      })
      .then(data => {
        setPopularConcepts(data);
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
            Concept
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        minWidth="84vw"
      >
        <Typography variant="h4" component="div" sx={{mt:2, mb:4}} fontFamily="monospace"> 
          Start exploring concepts 
        </Typography>
        <SearchBar/>
        <Box display="flex" flexDirection="row">
          <Box sx={{boxShadow: 4,
                    mt: 10, 
                    borderRadius: "5%", 
                    minHeight: "50vh", 
                    width: "20vw", 
                    display: "flex",
                    flexDirection: "column",
                    mr: 20}}>
            <Typography marginTop={2} mx="auto" marginBottom={3} fontFamily="monospace">New concepts</Typography>
            {newConcepts? 
            JSON.parse("[" + newConcepts + "]")[0].map(x => <Link
                                                             fontFamily="monospace"
                                                             fontSize={14}
                                                             ml = "2vw"
                                                             marginBottom={1}
                                                             underline="hover"
                                                             onClick={() => navigate(`/concept_info/${x.id.replace("https://openalex.org/", "")}`)}
                                                            >	??? {x.display_name}
                                                            </Link>)
            : <Typography
                fontFamily="monospace"
                fontSize={14}
                mx="auto"
                marginBottom={1}>
                Loading
              </Typography>}
          </Box>
          <Box sx={{boxShadow: 4,
                    mt: 10, 
                    borderRadius: "5%", 
                    minHeight: "50vh", 
                    width: "20vw", 
                    display: "flex",
                    flexDirection: "column"}}>
            <Typography marginTop={2} mx="auto" marginBottom={3} fontFamily="monospace">Popular concepts</Typography>
            {popularConcepts? 
            JSON.parse("[" + popularConcepts + "]")[0].map(x => <Link
                                                                  fontFamily="monospace"
                                                                  fontSize={14}
                                                                  ml = "2vw"
                                                                  marginBottom={1}
                                                                  underline="hover"
                                                                  onClick={() => navigate(`/concept_info/${x.id.replace("https://openalex.org/", "")}`)}
                                                                >	??? {x.display_name}
                                                                </Link>)
            : <Typography
                fontFamily="monospace"
                fontSize={14}
                mx="auto"
                marginBottom={1}>
                Loading
              </Typography>}
          </Box>
        </Box>
        
      </Box>
    </Box>
  );
}
