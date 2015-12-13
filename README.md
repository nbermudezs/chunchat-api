## Chunchat API.

LoopBack app to be used as the backend for apps that need interactions with TokBox.

### About it

This app is a Node.js app but it is built on top of [LoopBack](http://loopback.io/). Therefore you need to have Node.js and StrongLoop installed.

The app also uses [nconf](https://github.com/indexzero/nconf) to handle global configurations.
Once you have installed the dependencies and run `npm install` you will have to copy the settings sample file with the name `settings.json`.

```bash
cp ./conf/settings.sample.json ./conf/settings.json
```

After copying the file you will have to set the appropriate values for [TokBox](http://tokbox.com) and [SendGrid](https://sendgrid.com) APIs credentials.


### Deployment

At the moment of writing this, the app is being deployed to Heroku. You will need to set the right buildpack for your Heroku app to make it work. [This](https://docs.strongloop.com/display/SL/Heroku) link offers details on how to do it.

The most important piece is running
```bash
heroku apps:create --buildpack https://github.com/strongloop/strongloop-buildpacks.git
```

or

```
heroku buildpack:set https://github.com/strongloop/strongloop-buildpacks.git
```
if the app already exists.

Also remember to set `NODE_ENV` to `production` so things like the API Explorer is not available.
