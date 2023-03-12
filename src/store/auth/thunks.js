// Los thunks son acciones que se pueden dispachar, pero internamente tiene un tarea asíncronas

import {
    loginWithEmailPassword,
    registerNewUserWithEmailPassword,
    singInWithGoogle,
    logoutFirebase,
} from '../../firebase/providers';
import { clearNotesLogout } from '../journal';
import { checkingCredentials, login, logout } from './';

// export const checkingAuthentication = (email, password) => {
//     return async (dispatch) => {
//         dispatch(checkingCredentials());
//     };
// };

// Tarea asícrona que se encarga se ingresar sesión usando google
export const startGoogleSignIn = () => {
    return async (dispatch) => {
        dispatch(checkingCredentials());

        const result = await singInWithGoogle();

        if (!result.ok) return dispatch(logout(result.errorMessage));

        dispatch(login(result));
    };
};

// Tarea asíncrona que se encarga de crear/registrar un nuevo usuario usando el email y password proporcionados
export const startCreateUserWithEmailAndPassword = ({
    email,
    password,
    displayName,
}) => {
    return async (dispatch) => {
        dispatch(checkingCredentials());

        const { ok, uid, photoUrl, errorMessage } =
            await registerNewUserWithEmailPassword(
                email,
                password,
                displayName
            );

        if (!ok) return dispatch(logout(errorMessage));

        dispatch(login({ uid, displayName, email, photoUrl }));
    };
};

// Tarea asíncrona que se encarga ingresar sesión usando email y password
export const startLoginWithEmailPassword = ({ email, password }) => {
    return async (dispatch) => {
        dispatch(checkingCredentials());

        const { ok, uid, displayName, photoUrl, errorMessage } =
            await loginWithEmailPassword({ email, password });

        if (!ok) return dispatch(logout(errorMessage));

        dispatch(login({ uid, displayName, email, photoUrl }));
        // console.log(resp);
    };
};

export const startLogout = () => {
    return async (dispatch) => {
        await logoutFirebase();
        dispatch(clearNotesLogout());
        dispatch(logout(null));
    };
};
