# comment-extractor

## Keywords Comments
Keywords comments are comments that provide search terms for code to make it easier to search. For example, `# all` and `# list` below are search terms that you can use to locate the function instead of directly searching for the function name.
```js
// # all, # list
// a function to ... (this is regular comment)
function GetAll() {
  // ...
}
```
Despite very useful, your project manager may not allow such comment, so we can use this script for extracting comments before comitting, then restore the comments after.

## How To Use
1. Install dependencies
`npm i`
2. Update target extract path in `get.js`. The following pattern will retrieve all `.js` files in `C:/Users/SB7/Desktop/blogger-post-editor/src/js/components`.
```js
const jsfiles = await glob('C:/Users/SB7/Desktop/blogger-post-editor/src/js/components/**/*.js', { ignore: 'node_modules/**' })
```
3. Extract all keywords comments into `.json` using the following:
```
node get
```
4. Then, to restore all comments back, use the following code. This will delete the `.json` file.
```
node restore
```
