import {
    Grid,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from '@mui/material';
import { TurnedInNot } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { setActiveNote } from '../../store/journal/jorunalSlice';

export const SideBarItem = ({ id, title = '', date, body, imageUrls = [] }) => {
    const dispatch = useDispatch();

    const onClickActivenote = () => {
        dispatch(setActiveNote({ id, title, date, body, imageUrls }));
    };

    return (
        <ListItem
            onClick={onClickActivenote}
            className='animate__animated animate__fadeIn animate__faster'
        >
            <ListItemButton>
                <ListItemIcon>
                    <TurnedInNot />
                </ListItemIcon>
                <Grid container>
                    <ListItemText primary={title} />
                    <ListItemText secondary={body} />
                </Grid>
            </ListItemButton>
        </ListItem>
    );
};
