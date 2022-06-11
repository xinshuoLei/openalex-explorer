import * as React from 'react';
import {
  Drawer,
  List,
  Typography,
  Divider,
  ListItem,
  ListItemButton,
} from '@mui/material'
import Image from 'mui-image'
import logo from '../images/OpenAlex-logo.png'
import lightbulb from '../images/lightbulb.png'
import paper from '../images/paper.png'

const drawerWidth = 240;

export const Sidebar = () => {
    return (
        <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      > 
        <Typography variant="h5" component="div" sx={{mt:2, ml:4}} fontFamily="monospace">
            Exploring
        </Typography>
        <Image src={logo} height="10%" fit="contain"/>
        <Divider />
        <List>
            <ListItem key="Work" disablePadding>
              <ListItemButton>
                <Image src={paper} fit="contain" height="15%" width="15%" sx={{ mr:3, ml:3}}/>
                <Typography variant="h7" component="div" sx={{ mr:3, ml:4}} fontFamily="monospace">Work</Typography>
              </ListItemButton>
            </ListItem>
            <ListItem key="Work" disablePadding>
              <ListItemButton>
                <Image src={lightbulb} fit="contain" height="15%" width="15%" sx={{ mr:3, ml:3}}/>
                <Typography variant="h7" component="div" sx={{ mr:3, ml:4}} fontFamily="monospace">Concept</Typography>
              </ListItemButton>
            </ListItem>
        </List>
      </Drawer>
    );
}

