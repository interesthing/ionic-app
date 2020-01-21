# Interesthing app

## Description

Interesthing est une application mobile développée à l'aide des frameworks [Angular](https://angular.io/) et [Ionic](https://ionicframework.com/) dans le cadre du cours « Développement Mobile », animé par [Mathias Oberson]([https://github.com/Tazaf](https://github.com/Tazaf)) à l'[HEIG-VD](https://heig-vd.ch). L'application se présente comme un « réseau social » désireux de reconnecter les utilisateurs, en faisant entrer en contact des gens géographiquement proches et présentant un ou plusieurs centres d’intérêts commun.

En effet, la proximité ouvre tout un champ de possibilités d’interactions entre les individus que ce soit pour une recherche d’informations à propos d'un endroit, de donner un avis sur un lieu ou simplement pour créer des interactions diverses au sein d’une sous population d’individus (communes, quartiers, rassemblements, etc.). Tout ceci prend place autour d'une interface simple et intuitive proposé par l'application.

## Déploiement

Cette application est liée à [INTERESTHING API]([https://github.com/interesthing/api](https://github.com/interesthing/api)) développée dans le cadre du cours d'Architecture et déploiement d'application animé par [Simon Oulevay](https://github.com/AlphaHydrae). Ceci permet aux utilisateurs d'enregistrer ses coordonnées d'accès, les posts effectués notamment la géolocalisation des endroits, ses photos et les avis postés par la communauté.

## Comment ça marche ?

### S'enregistrer

### Se connecter

### Poster un lieu

#### Modifier un lieu

### Consulter des lieux

#### Recherche par thème

### Laisser un avis


Interesthing is a mobile app implemented with [Angular][angular] on [Ionic][ionic]. The goal of this app is to show the point of interest in every town in Switzerland (or in the world) like a graffity, a funny place etc. Basically, users can : 

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
