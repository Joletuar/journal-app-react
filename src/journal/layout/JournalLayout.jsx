import { Box, Toolbar } from '@mui/material';
import { Navbar } from '../components/Navbar';
import { SideBar } from '../components/SideBar';

const drawerWidth = 240;

export const JournalLayout = ({ children }) => {
  return (
    <Box
      sx={{ display: 'flex' }}
      className='animate__animated animate__fadeIn animate__faster'
    >
      <Navbar drawerWidth={drawerWidth}></Navbar>
      <SideBar drawerWidth={drawerWidth}></SideBar>

      <Box component='main' sx={{ flexGrow: 1, p: 2 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};
