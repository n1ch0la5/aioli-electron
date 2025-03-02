// clearStorage.js - Direct filesystem approach
const fs = require('fs');
const path = require('path');
const os = require('os');

// Function to get the Electron app's user data directory based on OS
function getUserDataPath() {
  const homePath = os.homedir();
  // Get package.json to find app name
  let appName;
  try {
    const packageJson = require('./package.json');
    appName = packageJson.name;
  } catch (err) {
    // Fallback app name if package.json can't be read
    appName = 'electron-app';
  }
  
  switch (process.platform) {
    case 'win32':
      return path.join(homePath, 'AppData', 'Roaming', appName);
    case 'darwin': // macOS
      return path.join(homePath, 'Library', 'Application Support', appName);
    case 'linux':
      return path.join(homePath, '.config', appName);
    default:
      console.log('Unsupported platform');
      return null;
  }
}

try {
  const userDataPath = getUserDataPath();
  
  if (!userDataPath) {
    console.log('Could not determine user data path for this platform');
    process.exit(0);
  }
  
  console.log(`Looking for Electron storage in: ${userDataPath}`);
  
  // Check for Local Storage
  const localStoragePath = path.join(userDataPath, 'Local Storage');
  if (fs.existsSync(localStoragePath)) {
    console.log('Found Local Storage directory');
    
    try {
      const files = fs.readdirSync(localStoragePath);
      
      if (files.length === 0) {
        console.log('No files found in Local Storage directory');
      } else {
        files.forEach(file => {
          try {
            const filePath = path.join(localStoragePath, file);
            const stats = fs.statSync(filePath);
            
            if (stats.isFile() && !file.startsWith('.')) {
              fs.unlinkSync(filePath);
              console.log(`Removed: ${file}`);
            }
          } catch (fileError) {
            console.log(`Error processing file ${file}: ${fileError.message}`);
          }
        });
        console.log('Local Storage files cleared');
      }
    } catch (readError) {
      console.log(`Error reading directory: ${readError.message}`);
    }
  } else {
    console.log('No Local Storage directory exists yet. Nothing to clear.');
  }
  
  // Also check IndexedDB
  const indexedDBPath = path.join(userDataPath, 'IndexedDB');
  if (fs.existsSync(indexedDBPath)) {
    console.log('Found IndexedDB directory');
    
    try {
      const files = fs.readdirSync(indexedDBPath);
      
      if (files.length === 0) {
        console.log('No files found in IndexedDB directory');
      } else {
        files.forEach(file => {
          try {
            const filePath = path.join(indexedDBPath, file);
            const stats = fs.statSync(filePath);
            
            if (stats.isDirectory()) {
              fs.rmdirSync(filePath, { recursive: true });
              console.log(`Removed IndexedDB: ${file}`);
            } else if (stats.isFile() && !file.startsWith('.')) {
              fs.unlinkSync(filePath);
              console.log(`Removed IndexedDB file: ${file}`);
            }
          } catch (fileError) {
            console.log(`Error processing IndexedDB file ${file}: ${fileError.message}`);
          }
        });
        console.log('IndexedDB files cleared');
      }
    } catch (readError) {
      console.log(`Error reading IndexedDB directory: ${readError.message}`);
    }
  } else {
    console.log('No IndexedDB directory exists yet. Nothing to clear.');
  }
  
  console.log('Storage clearing completed');
} catch (error) {
  console.error(`Error clearing storage: ${error.message}`);
}