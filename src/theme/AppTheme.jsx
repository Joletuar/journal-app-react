import { ThemeProvider } from '@emotion/react'; // Proporciona los temas a los elementos hijos
import { CssBaseline } from '@mui/material';
import { purpleTheme } from './purpleTheme'; // Importamos el tema que nosotros creamos

export const AppTheme = ({ children }) => {
    return (
        <ThemeProvider theme={purpleTheme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
};
