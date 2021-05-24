# Enterprise Web Development - Castles POI Application 

Enterprise Web Development - Assignment 2, Points of Interest Web Application - Node.

## How to run this project
```
1. clone this repository: 
    $ https://github.com/Irhutchi/point-of-interest-web-app.git

2. Go to the repository
    cmd: cd pointsofinterest-webapp

3. Isntall dependencies
    cmd: npm install

4. Insert your environment variables.
    Rename .env_sample** to .env and populate with your variables

5. Start the server locally on port 4000
   cmd: node index.js

6. Login into app using dummy data provided in seed-data.json file

```
If you clone this repo you will need to open the project in an IDE and enter *npm install* into the command line. Npm install will download required dependencies defined in a package.json file and generates a node_modules folder with the installed modules. <br>

**Checkout the application deployed to heroku:** https://castles-poi.herokuapp.com/

## Features
* Sign up / Login
* View / Update user account settings
* Show all POIs on a map
* Add Castles
* Add Categories
* Organise POIs into categories
* Update existing castles information
* Delete existing castle POI
* View / add review to castle POI
* Rate POI
* Expose access to models as a REST endpoint
* Test API endpoints using unit testing (mocha) 

![](https://user-images.githubusercontent.com/54445641/119397605-49a88d80-bcce-11eb-8136-afb2bbd3b474.PNG)


### Access the application
* Use any of the two login details below

Username           | Password
-------------------| -------------
homer@simpson.com  | secret
bart@simpson.com  | secret
barney@grumble.com  | secret


### Data Model

The apps data model consists of the following entities. 

* user
* inidviInterests
* category
* db
* review
* seed-data.json


### Tools and Technologies:

**UI**: Handlebars | UIkit |  Font Awesone Icons | heroku | leaflet.js <bt>

**Components**: Handlebars | dotenv | mongoose | mais-monogoose-seeder | mocha | chai | JsonWebToken | axios <br>

**Framework**: Hapi | inert | vision | cookie | boom | Bell | Joi <br>

**Platforms**: node | mongodb  <br>



## Author

**Ian Hutchinson**  
ianhutch90@gmail.com


## Credits and Resources
* [Leaflet.js](https://joeyklee.github.io/geosandbox/hello-leaflet.html)
* [Leaflet tutorial](https://womanonrails.com/leaflet)
* [UiKit Template](https://getuikit.com/v2/docs/documentation_layouts.html) 
* [Coding train web api tutorials](https://thecodingtrain.com/Courses/data-and-apis/3.5-deployment.html)
* [Weather Widget](https://weatherwidget.io/)
* [hapi-plugins](https://hapi.dev/plugins/)
* [Handlebars guide](https://handlebarsjs.com/guide/)
