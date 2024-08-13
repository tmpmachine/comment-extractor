const fs = require('fs');
const path = require('path');

function restoreComments(jsonFilePath) {
  // Read the JSON file
  const data = JSON.parse(fs.readFileSync(jsonFilePath, 'utf-8'));

  data.forEach(fileData => {
    const { filepath, comments } = fileData;

    // Read the target file's content
    let lines = fs.readFileSync(filepath, 'utf-8').split('\n');

    // Insert each comment back at the correct line number
    comments.forEach(comment => {
      const { line, content } = comment;

      // Adjust for 0-based index in array
      lines.splice(line - 1, 0, content);
    });

    // Write the updated content back to the file
    fs.writeFileSync(filepath, lines.join('\n'));

    console.log(`Comments restored in ${filepath}`);
  });
}

// Usage example:
const jsonFilePath = 'extracted_comments.json'; // Replace with your JSON file path

restoreComments(jsonFilePath);

fs.rm(jsonFilePath, {}, () => {});