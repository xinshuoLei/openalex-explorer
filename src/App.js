import * as React from 'react';
import {
  Box,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Divider,
} from '@mui/material'
import { Sidebar } from './components/Sidebar';
import { WorkPage } from './pages/WorkPage';
import { ConceptPage } from './pages/ConceptPage';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { ConceptResultPage } from './pages/ConceptResultPage';
import { ConceptInfoPage } from './pages/ConceptInfoPage';
import { UploadPage } from './pages/UploadPage';


const drawerWidth = 240;

function App() {
  return (
    <>
    <BrowserRouter>
      <Box sx={{ display: 'flex' }}>
        <Sidebar/>
        <Routes>
              <Route path="/work" element={<WorkPage />} />
              <Route path="/concept" element={<ConceptPage />} />
              <Route path="/concept_result" element={<ConceptResultPage />}/>
              <Route path="/concept_info/:id" element={<ConceptInfoPage />}/>
              <Route path="/admin" element={<UploadPage />}/>
              <Route path="/" element={<WorkPage />} />
        </Routes>
      </Box>
    </BrowserRouter>
    </>
  );
}

export default App;
