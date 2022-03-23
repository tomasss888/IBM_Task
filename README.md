## About the project
A project to showcase Watson Natural Language Understanding. This project uses  Watson Natural Language Understanding API to simplify chunks of text into few words, which then are used to search for related GIFs. 

<a href="http://demo.therejoice.co.uk/"><strong>Can see Live Demo here</strong></a>
<br />
<br />


## Tech/framework used

* **Server-Side**: Node.js/Express.js
* **Client-Side**: React.js

## Installation

* Clone the repository.
```
git clone https://github.com/tomasss888/IBM_Task.git 
```
- Create [dotenv](#file-structure) and [config.json](#file-structure) files with required data. 

For a next step you can either run it locally or host it to a web server.

### Local Preview

* Use `npm run start` command in both [server](https://github.com/tomasss888/IBM_Task/tree/master/server) and [client](https://github.com/tomasss888/IBM_Task/tree/master/client) folders

### Web Server

* Start the docker using shell script.
```
./start.sh
```
## File structure

* server/.env
```
GIPHY_APIKEY='giphy api key'
WATSON_APIKEY='watson api key'
WATSON_URL='watson api cloud URL'
WATSON_VERSION='watson api version'
FRONT_END_URL='ip of your frontend server'
```
* client/config.json
```
{
    "SERVER_URL": "ip of your backend server"
}