import AppRouter from './router/AppRouter';
import { AppTheme } from './theme/'; // Importamos un HOC para que envuelva a todo los componentes hijos con el tema que definimos

function JournalApp() {
    return (
        <AppTheme>
            <AppRouter />
        </AppTheme>
    );
}

export default JournalApp;
