import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as LinkRouter } from 'react-router-dom';
import {
    Grid,
    TextField,
    Button,
    Typography,
    Link,
    Alert,
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hook/';
import {
    startGoogleSignIn,
    startLoginWithEmailPassword,
} from '../../store/auth/';

const CHECKING = 'checking';

export const LoginPage = () => {
    const { status, errorMessage } = useSelector((state) => state.auth); // Accedemos al status dentro del state de auth

    const { email, password, onInputChange, formState } = useForm(formData);
    const isAuthenticating = useMemo(() => status === CHECKING, [status]);

    const dispatch = useDispatch();

    // Esto corresponde a tareas asíncronas
    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(startLoginWithEmailPassword(formState));
    };

    // Esto corresponde a tareas asíncronas
    const onGoogleSignIn = () => {
        dispatch(startGoogleSignIn());
    };

    return (
        <AuthLayout title={'Login'}>
            <form
                onSubmit={onSubmit}
                className='animate__animated animate__fadeIn animate__faster'
            >
                <Grid container>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label='Correo'
                            type='email'
                            placeholder='ejemplo@ejemplo.com'
                            fullWidth
                            name='email'
                            value={email}
                            onChange={onInputChange}
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label='Contraseña'
                            type='password'
                            placeholder='Contraseña'
                            fullWidth
                            name='password'
                            value={password}
                            onChange={onInputChange}
                        />
                    </Grid>

                    <Grid container spacing={2} sx={{ mt: 1, mb: 1 }}>
                        <Grid
                            item
                            xs={12}
                            display={!!errorMessage ? '' : 'none'}
                        >
                            <Alert severity='error'>{errorMessage}</Alert>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Button
                                disabled={isAuthenticating}
                                variant='contained'
                                fullWidth
                                sx={{ mb: 1 }}
                                type='submit'
                            >
                                <Typography>Login</Typography>
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Button
                                disabled={isAuthenticating}
                                variant='contained'
                                fullWidth
                                onClick={onGoogleSignIn}
                            >
                                <GoogleIcon />
                                <Typography sx={{ ml: 1 }}>Google</Typography>
                            </Button>
                        </Grid>
                        <Grid
                            container
                            direction='row'
                            justifyContent='end'
                            sx={{ mt: 2, fontSize: 13 }}
                        >
                            ¿No tienes cuenta?
                            <Link
                                component={LinkRouter}
                                color='inherit'
                                to='/auth/register'
                                sx={{ ml: 1, fontSize: 13 }}
                            >
                                Crear cuenta
                            </Link>
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        </AuthLayout>
    );
};
