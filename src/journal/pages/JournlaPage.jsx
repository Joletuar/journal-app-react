import { useDispatch } from 'react-redux';
import { AddOutlined } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { JournalLayout } from '../layout/JournalLayout';
import { NothingSelectedView, NoteWiew } from '../views';
import { startNewNote } from '../../store/journal';
import { useSelector } from 'react-redux';

const JournlaPage = () => {
  const { isSaving, active: activeNote } = useSelector(
    (state) => state.journal
  );
  const dispatch = useDispatch();

  const onClickNewNote = () => {
    dispatch(startNewNote());
  };

  return (
    <JournalLayout>
      {activeNote ? <NoteWiew /> : <NothingSelectedView />}

      {!activeNote && (
        <IconButton
          disabled={isSaving}
          onClick={onClickNewNote}
          size='large'
          sx={{
            color: 'white',
            backgroundColor: 'error.main',
            ':hover': {
              backgroundColor: 'error.main',
              opacity: 0.8,
            },
            position: 'fixed',
            right: 50,
            bottom: 50,
          }}
        >
          <AddOutlined sx={{ fontSize: 30 }} />
        </IconButton>
      )}
    </JournalLayout>
  );
};

export default JournlaPage;
