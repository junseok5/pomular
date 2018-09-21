Pomular
=======
Link: https://pomular.com

## About
Pomular is english speaking web service.

Users can start english speaking study in this.

You would get youtube video or if you have your video file (movies, drama), you can simply add your video in this site.

This site provides section jump, section repeat, repeat, subtitle language conversion to users by videos.

## Stack
### Frontend
* vue
* vuex
* vue-router
* vue-infinite-scroll
* vue-youtube-embed
* indexedDB, localStorage
* axios
* pwa

### Backend
* Node.js Express
* MongoDB mongoose
* connect-history-api-fallback
* @google-cloud/translate

## Getting Started
## Installing
1. clone git file.
<pre>
$ git clone https://github.com/junseok5/pomular
</pre>

2. Install local dependencies.
<pre>
cd ./frontend
npm install
cd ../backend
npm install
</pre>

3. if you wanna connect with mongodb, you have to add new database name 'pomular'.

4. Default port
* Frontend: http://localhost:8000
* Backend: http://localhost:3000
* Database: http://localhost:27017/pomular

## Development
For the development environment, you have yo run two kind of scripts.

### Frontend
<pre>
$ cd ./frontend
$ npm run start
</pre>

### Backend
<pre>
$ cd ./backend
$ npm run dev
</pre>

## Build and run
To build, you have to edit config file.

Access ./frontend/config/index.js

And fixed it following code.
<pre>
...
module.exports = {
    build: {
        env: require('./prod.env'),
        index: path.resolve(__dirname, '../dist/index.html'),
        assetsRoot: path.resolve(__dirname, '../dist/'),
        ...
    },
    ...
}
</pre>

<pre>
cd ../frontend
$ npm run build
</pre>

if this work is completed, you additionally edit following code.

Maybe this code has annotation. And give prev code to annotation.
<pre>
...
module.exports = {
    build: {
        env: require('./prod.env'),
        index: path.resolve(__dirname, '../../backend/src/public/index.html'),
         assetsRoot: path.resolve(__dirname, '../../backend/src/public'),
        ...
    },
    ...
}
</pre>

enter one more build command.
<pre>
$ npm run build
</pre>

Then, run following command from this folder.
<pre>
$ cd ../backend
$ npm run dev
</pre>

## Contact
if you any questions, leave an email to <vkehrkrl82@gmail.com>