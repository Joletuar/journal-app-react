import { useEffect, useMemo, useState } from 'react';

export const useForm = (initialForm = {}, formValidations = {}) => {
    const [formState, setFormState] = useState(initialForm);
    const [formValidation, setFormValidation] = useState({}); // Objeto con los estados de las validaciones de los campos de nuestro formulario

    // Volvemos a crear los validadores en caso de que el estado cambie
    useEffect(() => {
        createValidators();
    }, [formState]);

    useEffect(() => {
        setFormState(initialForm);
    }, [initialForm]);

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const isFormValid = useMemo(() => {
        for (const formValue of Object.values(formValidation)) {
            if (formValue) return false;
        }
        return true;
    }, [formValidation]);

    const createValidators = () => {
        const formCheckValues = {}; // Objeto que va a tener las validaciones
        for (const formField of Object.keys(formValidations)) {
            const [fn, errorMessage] = formValidations[formField]; // Desestructuramos
            const validation = fn(formState[formField]); // Valor de la validación
            formCheckValues[`${formField}Valid`] = validation // Creamos una nueva propiedad con el valor del campo + Valid y el valor de la validacion
                ? null
                : errorMessage;
        }
        setFormValidation(formCheckValues); // Cambiamos el estado de las validaciones del form
    };

    const onResetForm = () => {
        setFormState(initialForm);
    };

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,
        ...formValidation,
        isFormValid,
    };
};
