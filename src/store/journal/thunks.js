import { collection, deleteDoc, doc, setDoc } from 'firebase/firestore';
import { FirebaseDB } from '../../firebase/config';
import { fileUpload } from '../../helpers/fileUpload';
import { loadNotes } from '../../helpers/loadNotes';
import {
  addNewEmptyNote,
  deleteNoteById,
  noteUpdated,
  savingNewNote,
  setActiveNote,
  setNote,
  setPhotosToActiveNote,
  setSaving,
} from './';

// Proceso que inserta una nota en la base de datos
export const startNewNote = () => {
  return async (dispatch, getState) => {
    dispatch(savingNewNote());
    // Accedemos a los estados, al estado de auth y obtenemos el id del user
    const { uid } = getState().auth;

    // Creamos un objeto con los campos de la nota a insertar
    const newNote = {
      title: '',
      body: '',
      date: new Date().getTime(),
      imageUrls: [],
    };

    // Referenciamos la ruta donde vamos almacenar la nota
    const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));

    // Insertamos la nueva nota
    await setDoc(newDoc, newNote);
    // Agreamos el id de la nota a la nota
    newNote.id = newDoc.id;

    dispatch(addNewEmptyNote(newNote));
    dispatch(setActiveNote(newNote));
  };
};

// Proceso que carga las notas del usuario que están almacenadas en la bd
export const startLoadingNotes = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    if (!uid) throw new Error('El UID del usuario no existe');
    const notes = await loadNotes(uid);
    dispatch(setNote(notes));
  };
};

// Proceso que se encarga de actualizar una nota
export const startSaveNote = () => {
  return async (dispatch, getState) => {
    dispatch(setSaving());
    const { uid } = getState().auth;
    const { active: note } = getState().journal;
    const noteToFireStore = { ...note };
    // Borramos el id de la nota
    delete noteToFireStore.id;
    // Hacemos referencia al documento al que quiero actualizar
    const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
    // Realizamos la actualizamos de la nota luego de haber obtenido su referencia
    // Pasamos las opciones con el merge en true para que fusionen los datos de la bd con los datos que se están mandando
    await setDoc(docRef, noteToFireStore, { merge: true });

    // Actualizamos la nota en el store
    dispatch(noteUpdated(note));
  };
};

// Proceso encargado de subir la imágenes en cloudinary
export const startUploadingFiles = (files = []) => {
  return async (dispatch) => {
    dispatch(setSaving());

    // Arreglo de promesas
    const fileUploadPromises = [];
    // Recorremos cada file dentro del arreglo y añadimos su promesa al arreglo
    for (const file of files) {
      fileUploadPromises.push(fileUpload(file));
    }

    // Disparamos todas las promesas dentro del arreglo
    const photoUrls = await Promise.all(fileUploadPromises);
    console.log(photoUrls);
    dispatch(setPhotosToActiveNote(photoUrls));
  };
};

// Proceso que se encarga de eliminar un nota
export const startDeletingNote = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    const { active: note } = getState().journal;
    const url = `${uid}/journal/notes/${note.id}`;

    // Referenciamos al documento
    const docRef = doc(FirebaseDB, url);
    await deleteDoc(docRef);

    dispatch(deleteNoteById(note.id));
  };
};
