# Generic Auth (Hamroauth)

  

### The `dev` branch of the application is hosted [here](https://www.hamroauth.ml "Hamro Auth") (AWS S3) and the API for this application can be found [here](https://generiks.herokuapp.com/api/ "Hamro Auth") (HEROKU).

  
## Deployment Guide:

  

### For local installation, the below steps can be followed:

*Requirements : yarn/npm, java(openjdk java8), postgresql, docker (optional)*

**STEP 1**: Clone the project from github repository:

> git clone https://github.com/sawrozpdl/genericauth.git

> cd genericauth/server

**STEP 2:** Make sure java is installed and JAVA_HOME has valid jdk location

  *to install java,*
  > `sudo apt-get install openjdk-8-jre   `

**STEP 3:** Create a bootable jar :

>  `./gradlew bootJar` [this creates a executable jar application on ‘server/build/libs’]

> create a .env file with required credentials as specified in .env.example

  

*And finally,*

  

**STEP 4:**

  

*For non Docker Users ,*

>  `export $(cat .env)` [exporting all env variables globally]

>  `export PORT=9191` [exporting port where the spring app will run]

>  `java -jar build/libs/generics-1.0.0.jar` [finally creating a jar file]

  

*For Docker Users ,*

  

>  `docker-compose up`

  

*this will run the tomcat server at localhost:9191 (for docker refer to docker-compose.yml file at ‘services.web.ports’)*

  

**STEP 5:**

  

Now for App, first switch to app directory and create .env with :

  

*REACT_APP_AUTH_BASE_URL=http://localhost:9191/api*
*REACT_APP_BASE_URL=https://localhost:{RUNNING_PORT:3000}*

and then run :

  

>  `yarn` or `npm install`

>  `yarn start` or `npm run start`

  

this will then open the application to your active browser.

**Enjoy!**
***