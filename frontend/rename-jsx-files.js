import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the directory paths where your React components are located
const componentDirs = [
    path.join(__dirname, 'src', 'components'),
    path.join(__dirname, 'src', 'context'),
    path.join(__dirname, 'src', 'pages')
];

// Function to rename .js files to .jsx if they contain JSX
function renameJsToJsx(dir) {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            // Recursively process subdirectories
            renameJsToJsx(filePath);
        } else if (file.endsWith('.js')) {
            // Read the file content
            const content = fs.readFileSync(filePath, 'utf8');

            // Check if the file contains JSX (simple heuristic)
            const hasJSX = content.includes('</') || content.includes('/>') ||
                content.includes('React.createElement') ||
                content.includes('<React');

            if (hasJSX) {
                // Rename .js to .jsx
                const newPath = filePath.replace('.js', '.jsx');
                fs.renameSync(filePath, newPath);
                console.log(`Renamed: ${filePath} -> ${newPath}`);

                // Find and update imports in all js/jsx/ts/tsx files
                updateImports(file.replace('.js', ''), '.js', '.jsx');
            }
        }
    });
}

// Function to update imports in all files
function updateImports(baseName, oldExt, newExt) {
    const allDirs = [
        path.join(__dirname, 'src'),
        ...componentDirs
    ];

    allDirs.forEach(dir => {
        updateImportsInDirectory(dir, baseName, oldExt, newExt);
    });
}

// Helper function to update imports in a directory
function updateImportsInDirectory(dir, baseName, oldExt, newExt) {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            // Recursively process subdirectories
            updateImportsInDirectory(filePath, baseName, oldExt, newExt);
        } else if (file.endsWith('.js') || file.endsWith('.jsx') ||
            file.endsWith('.ts') || file.endsWith('.tsx')) {
            // Read the file content
            let content = fs.readFileSync(filePath, 'utf8');

            // Look for import statements with the old extension
            const importRegex = new RegExp(`(from\\s+['"]\\..*?\\/${baseName})(${oldExt})?(['"])`, 'g');
            const updatedContent = content.replace(importRegex, `$1${newExt}$3`);

            // Write back if changes were made
            if (content !== updatedContent) {
                fs.writeFileSync(filePath, updatedContent, 'utf8');
                console.log(`Updated imports in: ${filePath}`);
            }
        }
    });
}

// Start the renaming process
componentDirs.forEach(dir => {
    if (fs.existsSync(dir)) {
        renameJsToJsx(dir);
    } else {
        console.log(`Directory does not exist: ${dir}`);
    }
});

// Also check App.js in the src directory
const appJsPath = path.join(__dirname, 'src', 'App.js');
if (fs.existsSync(appJsPath)) {
    const content = fs.readFileSync(appJsPath, 'utf8');

    // Check if App.js contains JSX
    const hasJSX = content.includes('</') || content.includes('/>') ||
        content.includes('React.createElement') ||
        content.includes('<React');

    if (hasJSX) {
        // Rename App.js to App.jsx
        const newPath = appJsPath.replace('.js', '.jsx');
        fs.renameSync(appJsPath, newPath);
        console.log(`Renamed: ${appJsPath} -> ${newPath}`);

        // Update imports
        updateImports('App', '.js', '.jsx');
    }
}

console.log('File renaming completed.');
