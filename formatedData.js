import { readFile, writeFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

// Obtener la ruta del archivo actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Ruta del archivo JSX
const filePath = join(__dirname, 'src/services/ProductService.jsx');

// Función para convertir la fecha de DD/MM/YYYY a YYYY/MM/DD
function convertDate(dateStr) {
    const [day, month, year] = dateStr.split('/');
    return `${year}/${month}/${day}`;
}

// Función principal para actualizar las fechas
async function updateDates() {
    try {
        // Leer el archivo JSX
        let fileContent = await readFile(filePath, 'utf-8');

        // Buscar y actualizar las fechas en el formato DD/MM/YYYY a YYYY/MM/DD y encerrar entre comillas
        const dateRegex = /\bDate:\s*(\d{1,2})\/(\d{1,2})\/(\d{4})\b/g;
        fileContent = fileContent.replace(dateRegex, (match, day, month, year) => {
            const newDate = convertDate(`${day}/${month}/${year}`);
            return `Date: "${newDate}"`;
        });

        // Guardar el archivo JSX actualizado
        await writeFile(filePath, fileContent, 'utf-8');

        console.log('Fechas actualizadas y encerradas entre comillas correctamente.');
    } catch (error) {
        console.error('Error al actualizar las fechas:', error);
    }
}

// Ejecutar la función principal
updateDates();
