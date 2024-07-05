# MENstack_blogapp_without_auth
This project was developed on day 4 of my bootcamp. The application includes a basic blog system and user management. It handles database operations using MongoDB and Mongoose and manages the server side with Express.js.


## Features

- Create users
- Create blogs
- List blogs
- List users
- Navigate between blogs and user profiles

## Project Structure

```plaintext
.
├── models
│   ├── user.js
│   ├── blog.js
├── controllers
│   ├── userController.js
│   ├── blogController.js
├── views
│   ├── index.ejs
│   ├── user.ejs
│   ├── blog.ejs
├── routes
│   ├── userRoutes.js
│   ├── blogRoutes.js
├── app.js
├── package.json
├── package-lock.json
