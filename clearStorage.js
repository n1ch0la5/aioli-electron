// clearStorage-simple.js - Direct filesystem approach with ES modules
import fs from 'fs';
import path from 'path';
import os from 'os';

// Function to get the Electron app's user data directory based on OS
function getUserDataPath() {
  const homePath = os.homedir();
  // Hardcode your app name here
  const appName = 'dashboard'; // Update this to match your app name
  
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
  
  console.log('Storage clearing completed');
} catch (error) {
  console.error(`Error clearing storage: ${error.message}`);
}