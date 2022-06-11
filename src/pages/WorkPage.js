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
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";


const SearchBar = ({setSearchQuery}) => (
  <form>
    <TextField
      id="search-bar"
      className="text"
      onInput={(e) => {
        setSearchQuery(e.target.value);
      }}
      variant="outlined"
      placeholder="Search..."
      size="small"
      style = {{width: "20vw"}}
    />
    <IconButton type="submit" aria-label="search">
      <SearchIcon style={{ fill: "black" }} />
    </IconButton>
  </form>
);

const drawerWidth = "16vw";

export const WorkPage = () => {
  return (
    <Box sx={{ display: 'flex'}} >
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: "84vw", ml: "16vw", bgcolor: "background.default"}}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div" color="black" fontFamily="monospace">
            Work
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
          Start exploring works
        </Typography>
        <SearchBar/>
        <Box display="flex" flexDirection="row">
          <Box sx={{boxShadow: 4,
                    mt: 10, 
                    borderRadius: "5%", 
                    minHeight: "50vh", 
                    minWidth: "20vw", 
                    justifyContent: "center",
                    display: "flex",
                    mr: 20}}>
            <Typography marginTop={2} fontFamily="monospace">New works</Typography>
          </Box>
          <Box sx={{boxShadow: 4,
                    mt: 10, 
                    borderRadius: "5%", 
                    minHeight: "50vh", 
                    minWidth: "20vw", 
                    justifyContent: "center",
                    display: "flex"}}>
            <Typography marginTop={2} fontFamily="monospace">Popular works</Typography>
          </Box>
        </Box>
        
      </Box>
    </Box>
  );
}
