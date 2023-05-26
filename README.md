# **Image Processing API**

The Image Processing API can be used in two different ways: 

* A simple placeholder
* An image Resizer

Simple placeholder - allows you to place images into your frontend with the size set via URL parameters (and additional stylization if you choose) for rapid prototyping.

Image Resizer - as a library to serve properly scaled versions of your images to the front end to reduce page load size. Rather than needing to resize and upload multiple copies of the same image to be used throughout your site, the API will handle resizing and serving stored images for you.

### DEVELOPMENT REQUIREMENTS

* Ensure that Node.js (and `npm`) is installed on your system. The project was developed with `Node version 18`
* Clone the files from this git repository
* Open a terminal, under the fullStackJavaScript (the root directory), type `npm install` to install dependencies
* Run the command `npm run serve` to start the server
* Follow the instructions on your terminal, enter on your preferred browser
* Below are acceptable query parameters in the browser address bar:
  * `http://localhost:3000/api/images?filename=yourimagefile&height=300&width=300`

  * `height` and weight value must be positive numbers
  * `image file` value must exist in the `full` folder before an image can be resized or use as a placeholder

* Currently supporting only `.jpg` or `.svg` file formats
* Example:
  * `http://localhost:3000/api/images?filename=fjord&height=250&width=250`