# ionic-app
Mobile interface for interesthing app, using angular on ionic.

# App Interesthing

Interesthing is a mobile app implemented with [Angular][angular] on [Ionic][ionic]. The goal of this app is to show the point of interest in every town in Switzerland (or in the world) like a graffity, a funny place etc. Basically, users can : 

* **log in**
* **post** some points of interest (POI)
* **see** all of the points of interest (POI)
* **rate** the other points of interest (POI)

## Requirements

* [Node.js][node] 12.x

## Usage

```bash
git clone https://github.com/interesthing/api.git
cd api
npm ci
npm start
```

## Documentation


## Real-time component 

Websocket is implemented for the real-time component. An insight message is generated on every post and delete actions for ratings, points of intereste & users.


[ionic]: https://ionicframework.com/docs
[angular]: https://angular.io/docs
[node]: https://nodejs.org/
[api]: https://interesthing.herokuapp.com/
