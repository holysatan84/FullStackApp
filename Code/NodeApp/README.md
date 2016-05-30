# FullStackApp

### Commads to Insatall node, npm and expressjs.

```sh
$ sudo apt-get install nodejs

$ sudo ln -s /usr/bin/nodejs /usr/bin/node

```

```sh
$ sudo apt-get install npm

$ sudo apt-get install -g express-generator

```

### Example to create express project

```sh
$ express rechargeApp
$ cd rechargeApp
$ npm install
```

Here first you create new folder called rechargeApp. Inside it you will see 2 files called app.js and package.json and 5 directories
called bin, node_modules, public, routes, and views. This will also install Express for your project. You can now run 
```sh
$ npm start
```
to start your Express server. If everthing is setup correctly you will see following,
```sh
> rechargeApp@0.0.0 start /home/mahesh/node/FullStackApp/Code/NodeApp/rechargeApp
> node ./bin/www
```
In your browser, navigate to the IP address of you VPS at port 3000.
