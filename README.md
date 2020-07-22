## READ ME OVERVIEW
## PLEASE CD INTO THE APP DIRECTORY IN ORDER TO RUN THE APPLICATION

To start client side:
npm run start

To start server:
npm run server


I kick started this prject using create-react-app. The main directory is 'app'.
I also wrote a simple Express server, located in app/src/server/

The server simply responds back with the request body in console

## Check list:
1. Password validation:  The 2 criteria for the password: length / contains number are both working.
2. Colors/logo change as password validation is passed
3. Form's submit button will not be enabled unless all fields are filled , checked for agreement & password validations are passed
4. Styling done with scss,Flexbox. I did the best I could by eye-balling and looking at the design provided. Could be alot better if I was given the actual dimensions
5. Form can submit data via axios, a response is sent back via console.log / confirmation via pop up modal
7. Unit test for disabling/ enabling button

## Notes / Areas of Improvement

* I did not set up a databse with the Express server because I believe it is not the goal of this assignment.
* It was my first time using Flow & Jest. So i am sure there are alot of improvements for the unit tests and also writing better type covered code.


## Image

![Sign Up Page](/app/public/screenshot.png)


## Resource Provided:
https://www.figma.com/file/WJW4Eb8cFSJgOgOK6lZgOl/USM-Sign-up-Engineering-Assignment?node-id=0%3A1

Hover & Button Prototype: https://www.figma.com/proto/zZczN3OAd5WIomNzxei8k5/Engineering-Assignment-Sign-up?node-id=107%3A673&viewport=723%2C968%2C0.12644416093826294&scaling=min-zoom




