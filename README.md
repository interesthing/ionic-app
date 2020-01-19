# ionic-app
Mobile interface for interesthing app, using angular on ionic.

# App Interesthing

Interesthing is a mobile app implemented with angular on ionic[Express][express]. The goal of this app is to show the point of interest in every town in Switzerland (or in the world) like a graffity, a funny place etc. Basically, users can : 

* **log in**
* **post** some points of interest (POI)
* **see** all of the points of interest (POI)
* **rate** the other points of interest (POI)

Visit this [links][doc] for an app demo. 

## Requirements

* [Node.js][node] 12.x
* [MongoDB][mongo] 4.x

## Usage

```bash
git clone https://github.com/interesthing/api.git
cd api
npm ci
npm start
```

## Documentation


## Real-time component 

Websocket is implemented for the real-time component. An insight message is generated on every post and delete actions for ratings, points of intereste & users. The message format is generated in JSON, like this : 


[express]: https://expressjs.com
[mongo]: https://www.mongodb.com
[node]: https://nodejs.org/
[doc]: https://interesthing.herokuapp.com/
[ws]: https://msg-central.herokuapp.com/ws
