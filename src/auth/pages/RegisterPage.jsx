import { Button, Grid, TextField, Link, Alert } from '@mui/material';
import { AuthLayout } from '../layout/AuthLayout';
import { Link as LinkRouter } from 'react-router-dom';
import { useForm } from '../../hook';
import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startCreateUserWithEmailAndPassword } from '../../store/auth';

const formData = {
    email: '',
    password: '',
    displayName: '',
};

const formValidations = {
    email: [(value) => value.includes('@'), 'El correo de tener un @'],
    password: [
        (value) => value.length >= 6,
        'El password debe tener más de 6 caracteres.',
    ],
    displayName: [(value) => value.length > 1, 'El nombre es obligatorio.'],
};

/* Tambien se puede usar !!displayNameValid */

const CHECKING = 'checking';

export const RegisterPage = () => {
    const { status, errorMessage } = useSelector((state) => state.auth); // Accedemos al status dentro del state de auth

    const isAuthenticating = useMemo(() => status === CHECKING, [status]);

    const dispatch = useDispatch();

    const [formSubmmited, setFormSubmmited] = useState(false);

    const {
        formState,
        displayName,
        email,
        password,
        onInputChange,
        isFormValid,
        displayNameValid,
        emailValid,
        passwordValid,
    } = useForm(formData, formValidations);

    const onSubmit = (e) => {
        e.preventDefault();
        setFormSubmmited(true);
        if (!isFormValid) return;
        dispatch(startCreateUserWithEmailAndPassword(formState));
    };

    return (
        <AuthLayout title={'Registro'}>
            <form
                onSubmit={onSubmit}
                className='animate__animated animate__fadeIn animate__faster'
            >
                <Grid container>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label='Nombre Completo'
                            type='text'
                            placeholder='Johan Tuarez'
                            fullWidth
                            name='displayName'
                            value={displayName}
                            onChange={onInputChange}
                            error={!!displayNameValid && formSubmmited}
                            helperText={displayNameValid}
                        />
                    </Grid>

                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label='Correo'
                            type='email'
                            placeholder='ejemplo@ejemplo.com'
                            fullWidth
                            name='email'
                            value={email}
                            onChange={onInputChange}
                            error={!!emailValid && formSubmmited}
                            helperText={emailValid}
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
                            error={!!passwordValid && formSubmmited}
                            helperText={passwordValid}
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
                        <Grid item xs={12}>
                            <Button
                                disabled={isAuthenticating}
                                type='submit'
                                variant='contained'
                                fullWidth
                                sx={{ mb: 1 }}
                            >
                                Registrarse
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid container direction='row' justifyContent='end'>
                        <Link
                            component={LinkRouter}
                            color='inherit'
                            to='/auth/login'
                        >
                            ¿Ya tienes cuenta?
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </AuthLayout>
    );
};
