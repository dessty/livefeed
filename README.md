# LiveFeed: Real Time Comment Feed

## TLDR;
TLDR;
Hi there! 
This application is a comment feed that displays all comments and notifies a user in real-time when new comments are added.

The application was built with Angular 16 for the frontend interface, Node/Express for the Backend Api, and Socket.io for Streaming/Websocket protocol

![Design](https://github.com/dessty/livefeed/blob/main/livefeed_design.jpg?raw=true)

## Versioning
You can pull a particular version tag to see the state of the implementation at a given time

[v0.5.0](https://github.com/dessty/livefeed/releases/tag/v0.5.0) `notification feature`

[v0.4.0](https://github.com/dessty/livefeed/releases/tag/v0.4.0) `Testing integration`

[v0.3.0](https://github.com/dessty/livefeed/releases/tag/v0.3.0) `UI style`

[v0.2.0](https://github.com/dessty/livefeed/releases/tag/v0.2.0) `streaming mechanism prototype`

[v0.1.0](https://github.com/dessty/livefeed/releases/tag/v0.1.0) `Polling mechanism prototype`


## Startup instruction
```sh
git clone git@github.com:dessty/livefeed.git
npm install 
npm run server 
```

### Testing
We would use Jest Fremework for Unit Test
```sh
npm run test
```

We would use Cypress for E2E
```sh
npm run e2e
```
