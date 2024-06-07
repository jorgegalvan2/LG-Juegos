import { readdir, writeFile } from 'fs/promises';
import { join, basename, extname } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Obteniendo la ruta del archivo actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const folderPath = join(__dirname, 'src/assets/img/Catalogue/imgDetails-PS4-PS5');
const outputFilePath = join(__dirname, 'src/imports2.js');

async function generateImports() {
  try {
    const files = await readdir(folderPath);

    const imports = files
      .filter(file => file.endsWith('.jpeg')) // Filtra solo archivos .jpeg, ajusta esto si tienes otros formatos
      .map(file => {
        const variableName = basename(file, extname(file)).toUpperCase().replace(/[^a-zA-Z0-9]/g, '_');
        return `import ${variableName} from '../assets/img/Catalogue/imgDetails-PS4-PS5/${file}';`;
      })
      .join('\n');

    await writeFile(outputFilePath, imports, 'utf-8');
    console.log('Imports generated successfully');
  } catch (err) {
    console.error('Error generating imports:', err);
  }
}

generateImports();
