import { Box, Divider, Drawer, List, Toolbar, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { SideBarItem } from './SideBarItem';

export const SideBar = ({ drawerWidth = 240 }) => {
    const { displayName } = useSelector((state) => state.auth);
    const { notes } = useSelector((state) => state.journal);
    return (
        <Box
            component='nav'
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
            <Drawer
                variant='permanent' //Temporary
                open
                sx={{
                    display: { xs: 'blue' },
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box',
                        width: drawerWidth,
                    },
                }}
            >
                <Toolbar>
                    <Typography variant='h6' noWrap component='div'>
                        {displayName}
                    </Typography>
                </Toolbar>
                <Divider />
                <List>
                    {notes.length ? (
                        notes.map((note) => (
                            <SideBarItem {...note} key={note.id} />
                        ))
                    ) : (
                        <Typography variant='subtitle2'>
                            No existe notas aún
                        </Typography>
                    )}
                </List>
            </Drawer>
        </Box>
    );
};
