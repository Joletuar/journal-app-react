import { fileUpload } from '../../src/helpers/fileUpload';

describe('Prueba sobre la subida de archivos', () => {
    test('Debería de subir los archivos', async () => {
        const urlImage =
            'https://www.adorama.com/alc/wp-content/uploads/2018/11/landscape-photography-tips-yosemite-valley-feature.jpg';
        const resp = await fetch(urlImage);
        const blob = await resp.blob();
        const file = new File([blob], 'foto.jpg');
        const url = await fileUpload(file);
        expect(typeof url).toBe('string');
    });
});
