# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Scripts

Run locally through `npm`

`npm start`

Run using Docker:

`just run`

Format with prettier:

`npm run fmt`

### Deploy

1. Update version number
2. Cut new version tag and push to Docker Hub:

   `just release`

#### Mac M1

You will need to use `docker buildx` to build x86 compatible images

THe *justfile* will use buildx by default, but you will need to create a new builder instance

`docker buildx create --use --name multi-platform`
 
