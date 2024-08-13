const fs = require('fs');
const path = require('path');
// or using commonjs, that's fine, too
const {
  glob,
  globSync,
  globStream,
  globStreamSync,
  Glob,
} = require('glob')

function extractComments(filePath) {
  const data = fs.readFileSync(filePath, 'utf-8');
  const lines = data.split('\n');
  const extractedData = {
    filepath: filePath,
    comments: []
  };

  const updatedLines = lines.filter((line, index) => {
    if (line.trim().startsWith('// # ')) {
      extractedData.comments.push({
        line: index + 1,
        content: line
      });
      return false; // exclude the line from the updated file content
    }
    return true;
  });

  // Write the updated file content without the extracted comments
  fs.writeFileSync(filePath, updatedLines.join('\n'));

  return extractedData.comments.length > 0 ? extractedData : null;
}

function saveToJSON(outputPath, newData) {
  let existingData = [];

  if (fs.existsSync(outputPath)) {
    existingData = JSON.parse(fs.readFileSync(outputPath, 'utf-8'));
  }

  const fileIndex = existingData.findIndex(item => item.filepath === newData.filepath);

  if (fileIndex !== -1) {
    // Append to existing file path entry
    existingData[fileIndex].comments.push(...newData.comments);
  } else {
    // Add new entry for this file path
    existingData.push(newData);
  }

  fs.writeFileSync(outputPath, JSON.stringify(existingData, null, 2));
}



(async function() {

  // all js files, but don't look in node_modules
  const jsfiles = await glob('C:/Users/SB7/Desktop/blogger-post-editor/src/js/components/**/*.js', { ignore: 'node_modules/**' })

  for await (const file of jsfiles) {

    // Usage example:
    const inputFilePath = file; // Replace with your file path
    const outputJSONPath = 'extracted_comments.json'; // Replace with your desired output JSON file path

    const extractedData = extractComments(inputFilePath);
    if (extractedData) {
      saveToJSON(outputJSONPath, extractedData);
      console.log(`Extracted comments saved to ${outputJSONPath}`);
    } else {
      console.log('No comments found to extract.');
    }

  }

})();