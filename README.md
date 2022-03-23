## About the project
A project to showcase Watson Natural Language Understanding. This project uses watson Watson Natural Language Understanding API to simplify chunks of text into few words, which then are used to search for related GIFs. 

<a href="http://demo.therejoice.co.uk/"><strong>Can see Live Demo here</strong></a>
<br />
<br />


## Tech/framework used

* **Server-Side**: Node.js/Express.js
* **Client-Side**: React.js
* **Style Library**: Bootstrap

## Installation

1. Clone the repository
```
git clone https://github.com/tomasss888/IBM_Task.git 
```
2. Add GIPHY and Watson API keys  to .env for server side
```
GIPHY_APIKEY='giphy api key'
WATSON_APIKEY='watson api key'
WATSON_URL='watson api cloud URL'
WATSON_VERSION='watson api version'
FRONT_END_URL='ip of your frontend server'
```

3. And do the same for config.json in client side
```
{
    "SERVER_URL": "ip of your backend server"
}
```

4. Start the docker using shell script
```
./start.sh
```
