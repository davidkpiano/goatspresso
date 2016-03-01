
#GoatStarted

A simple boilerplate for angular app with api running mongo.

Make sure mongo is installed and the data file is writable - or if you don't want mongo, remove the commands from `package.json`.

There are a few commands to run,

    npm install

    npm start

    #or for putting the public files on a specific port:
    PORT=5477 npm start

The `npm start` command will start mongo, start the api in silent mode and start the static file server with live reload. `npm run stop` will stop mongo when you are done, or you can just leave it running.

**Alternatively** you can can start the api and public file server separately and log output to the terminal:

    npm run serve:api

    # and
    npm run serve:public

To change the api's port do:

    API_PORT=5479 npm start

    # or
    API_PORT=5479 npm run serve:api

    # or for silent mode on a different port:
    API_PORT=5479 npm run serve:api-silent

Mongo is set to always listen on port `27017`.
