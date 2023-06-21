import { useEffect, useMemo, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  DeleteOutline,
  SaveOutlined,
  UploadOutlined,
} from '@mui/icons-material';
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material';
import { ImageGalery } from '../components';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

import { useForm } from '../../hook';
import {
  setActiveNote,
  startDeletingNote,
  startSaveNote,
  startUploadingFiles,
} from '../../store/journal';

const OPTIONS = { year: 'numeric', month: 'long', day: 'numeric' };

export const NoteWiew = () => {
  const dispatch = useDispatch();
  const {
    active: note,
    messageSaved,
    isSaving,
  } = useSelector((state) => state.journal);

  const { title, body, date: fecha, onInputChange, formState } = useForm(note);

  const fechaFormateada = useMemo(() => {
    return new Date(fecha).toLocaleDateString('es-ES', OPTIONS);
  }, [fecha]);

  useEffect(() => {
    dispatch(setActiveNote(formState));
  }, [formState]);

  useEffect(() => {
    if (messageSaved.length) {
      Swal.fire('Nota actualizada', messageSaved, 'success');
    }
  }, [messageSaved]);

  // Aqui vamos a mantener la referencia html de nuestro input
  const fileInputRef = useRef();

  const onSaveNote = () => {
    dispatch(startSaveNote());
  };

  const onFileInputChange = ({ target }) => {
    if (!target.files.length) return;
    dispatch(startUploadingFiles(target.files));
  };

  const onDelete = () => {
    dispatch(startDeletingNote());
  };

  return (
    <Grid
      className='animate__animated animate__fadeIn animate__faster'
      container
      direction='row'
      justifyContent='space-between'
      sx={{ mb: 1 }}
    >
      <Grid item>
        <Typography fontSize={39} fontWeight='ligth'>
          {fechaFormateada}
        </Typography>
      </Grid>
      <Grid item>
        {/* Con esta propiedad podemos seleccionar varios elementos a la vez */}
        {/* Damos la referencia */}
        <input
          type='file'
          multiple
          onChange={onFileInputChange}
          style={{ display: 'none' }}
          ref={fileInputRef}
        />

        <IconButton
          color='primary'
          disabled={isSaving}
          onClick={() => fileInputRef.current.click()}
        >
          <UploadOutlined />
        </IconButton>

        <Button
          color='primary'
          sx={{ padding: 2 }}
          onClick={onSaveNote}
          disabled={isSaving}
        >
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
          Guardar
        </Button>
      </Grid>
      <Grid container>
        <TextField
          type='text'
          variant='filled'
          placeholder='Ingrese un título'
          fullWidth
          label='Título'
          sx={{ border: 'none', mb: 1 }}
          name='title'
          value={title}
          onChange={onInputChange}
        />
        <TextField
          type='text'
          variant='filled'
          multiline
          placeholder='¿Que pasó hoy?'
          fullWidth
          sx={{ border: 'none', mb: 1 }}
          minRows={5}
          name='body'
          value={body}
          onChange={onInputChange}
        />
      </Grid>

      <Grid container justifyContent='end'>
        <Button onClick={onDelete} sx={{ mt: 2 }} color='error'>
          <DeleteOutline />
          Borrar
        </Button>
      </Grid>

      {/* Galería de imágenes */}
      <ImageGalery imageUrls={note?.imageUrls} />
    </Grid>
  );
};
