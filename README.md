hook-examples
===

A collection of [hook](https://github.com/doubleleft/hook) usage examples.

- [Simple Pool](simple-poll) ([online demo](http://doubleleft.github.io/hook-examples/simple-poll/index.html))

Running locally
---

Run local static server:

```
npm install
npm start
Starting up http-server, serving . on: http://0.0.0.0:8080
```

For you to be able to run any of the examples locally, you will need to run the
server locally, create an app, and change the credentials of the demo you want
to run.

```
# Download and install hook
curl -sSL https://raw.githubusercontent.com/doubleleft/hook/master/scripts/install.sh | bash

# Start server
hook server

# Create app
hook app:new hook-examples --endpoint http://localhost:4665/
```

License
---

MIT
