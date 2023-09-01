import { async } from '@firebase/util';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth';
import { FirebaseAuth } from './config';

const googleProvider = new GoogleAuthProvider(); // El proveedor por el cual queremos realizar la auth

// Función para ingresar con una cuenta de google
export const singInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(FirebaseAuth, googleProvider); // Realizamos la auth mediante google a traves de una ventana popup
    // const credentials = GoogleAuthProvider.credentialFromResult(result);
    // const user = result.user;
    const { displayName, email, photo, uid } = result.user; // Obtenemos los datos del usuario que se logeo con google

    return {
      ok: true,
      // User info
      displayName,
      email,
      photo,
      uid,
    };
  } catch (error) {
    const errorMessage = error.message;
    return {
      ok: false,
      errorMessage,
    };
  }
};

// Función para registrar un nuevo usuario con email y password
export const registerNewUserWithEmailPassword = async (
  email,
  password,
  displayName
) => {
  try {
    const resp = await createUserWithEmailAndPassword(
      FirebaseAuth, // Contiene la configuración de la autenticación
      email,
      password
    );

    const { uid, photoUrl } = resp.user;

    // Vamos a actualizar el displayName del usuario logeado actualmente
    // FirebaseAuth.currentUser: permite saber el usuario actual
    await updateProfile(FirebaseAuth.currentUser, {
      displayName,
    });

    return {
      ok: true,
      // User info
      displayName,
      email,
      photoUrl,
      uid,
    };
  } catch (error) {
    const errorMessage = error.message;
    return {
      ok: false,
      errorMessage,
    };
  }
};

// Función para ingresar con un correo y contraseña
export const loginWithEmailPassword = async ({ email, password }) => {
  //signInWithEmailAndPassword
  try {
    const resp = await signInWithEmailAndPassword(
      FirebaseAuth,
      email,
      password
    );
    const { displayName, photo, uid } = resp.user;
    return {
      ok: true,
      // User info
      displayName,
      email,
      photo,
      uid,
    };
  } catch (error) {
    const errorMessage = error.message;
    return {
      ok: false,
      errorMessage,
    };
  }
};

// Función para cerrar la sesión de un usuario
// Cierra cualquier sesión de cualquier cuenta: face,google,twitter,ect...
export const logoutFirebase = async () => {
  return await FirebaseAuth.signOut();
};
