# Typing

**Typing** is a website to learn to type with keyboard whitout watching fingers. **Typing** is french-language oriented considering language interface and websites from the program get texts to type for training. However, you can easily add new sources for getting texts by adding a **Fetcher**.
  
  
  

## Usage

Clone this repo to your local machine using
```
git clone https://github.com/lysiaan/typing
```

Install the packages using npm
```
npm install
```

Compile the sources
```
npm run build-prod
```

Run ***dist/index.html*** in a web browser

### Development
This project uses webpack for sources compilation. For dynamic compilation during development, use :
```
npm run watch-dev
```
  
  

## Code documentation

A complete documentation of code can be found in :  
***jsdoc/index.html***

Generates a new documentation manually using :  
(need jsdoc installed locally, see https://www.npmjs.com/package/jsdoc) :
```
npm run build-doc
```
  
  

## Fetchers

The main purpose of **Typing** is to fetch some articles from various websites in order to training.
To add a new fetcher, do the following (assuming my-fetcher-name is the name you desire for your fetcher) :

**1 - create a new file named** ***my-fetcher-name.js*** **in :**  
```
src/javascript/modules/fetchers/my-fetcher-name.js
```
This file must contains the code returning the text for training, from a specific word search. Name a constant function returning a promise representing the fetch result, and taking the word as parameter. Example :
```
export const my-fetcher-name = function(word) {
  return new Promise( (resolve, reject) => {  

    ** Code fetching text from other website **  

    resolve(text_fetch);
  }
}
```
You can take as an example existing fetchers. 

**2 - Reference your fetcher by adding following line :**
```
export * from './my-fetcher-name';
```
to the ***index.js*** in :
```
src/javascript/modules/fetchers/index.js
```
This will automatically generates a new button menu in order the user to access your new fetcher. Search box for word submitting is also automatically generated.
  
  

## Color Themes
In order to add a color theme, add the following with your own hexa / rgb color values in the file ***config/color-themes.json***
```
{"color": "your-color-theme-name", "main": "#0ABDD2", "mainlight": "#8FF3FF", "maindark": "#0D7F8B", "mainreallydark": "#0D7F8B", "modalbox": "#070916", "modalborder": "rgba(10, 190, 210, 0.3)", "success": "#BAF5FC", "gradient": "#171E33"},
```
This will automatically generates a new button in colors menu in order the user to switch to your new color theme.
  
  

## Contributing

This repository is more a showcase for the author than a project requiring participation. However, feel free to take and modify it as you need.  
This project is licensed under the MIT License.
