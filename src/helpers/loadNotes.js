import { collection, getDocs } from 'firebase/firestore';
import { FirebaseDB } from '../firebase/config';

export const loadNotes = async (uid = '') => {
    if (!uid) throw new Error('El UID del usuario no existe');

    // Apuntamos a la colección de notes que está en la bd
    const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`);

    // Obtenemos las notas que tiene el usuario en la colección notes
    // Nos retorna una referecia a los docs, pero no la data como tal
    const docs = await getDocs(collectionRef);

    // Ahora accedemos a la información de cada note
    const notes = [];
    docs.forEach((doc) => {
        notes.push({ id: doc.id, ...doc.data() });
    });

    return notes;
};
