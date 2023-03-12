import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false,
        messageSaved: '',
        notes: [],
        active: null,
    },
    reducers: {
        savingNewNote: (state) => {
            state.isSaving = true;
        },
        addNewEmptyNote: (state, action) => {
            state.notes.push(action.payload);
            state.isSaving = false;
        },
        setActiveNote: (state, { payload }) => {
            state.active = payload;
            state.messageSaved = '';
        },
        setNote: (state, { payload }) => {
            state.notes = payload;
        },
        setSaving: (state) => {
            state.isSaving = true;
            state.messageSaved = '';
        },
        noteUpdated: (state, { payload }) => {
            state.isSaving = false;
            state.notes = state.notes.map((note) => {
                if (note.id === payload.id) {
                    return payload;
                }
                return note;
            });

            state.messageSaved = `${payload.title}, nota actualizada correctamente`;
        },
        setPhotosToActiveNote: (state, { payload }) => {
            state.active.imageUrls = [...state.active.imageUrls, ...payload];
            state.isSaving = false;
        },

        clearNotesLogout: (state) => {
            state.isSaving = false;
            state.messageSaved = '';
            state.notes = [];
            state.active = null;
        },

        deleteNoteById: (state, { payload }) => {
            state.active = null;
            state.notes = state.notes.filter((note) => note.id != payload);
        },
    },
});

export const {
    savingNewNote,
    addNewEmptyNote,
    setActiveNote,
    setNote,
    setSaving,
    noteUpdated,
    setPhotosToActiveNote,
    clearNotesLogout,
    deleteNoteById,
} = journalSlice.actions;
