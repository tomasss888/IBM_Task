var request = require('request-promise');
const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
const { IamAuthenticator } = require('ibm-watson/auth');
var searchTypes = require("./funtions/searchTypes")

const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
    version: '2021-08-01',
    authenticator: new IamAuthenticator({
        apikey: process.env.WATSON_APIKEY,
    }),
    serviceUrl: 'https://api.eu-de.natural-language-understanding.watson.cloud.ibm.com/instances/6c94ff95-22cc-4c85-bfb7-d6f55e1f3522'
});


const searchController = {

    search(req, res) {

        // add smth if string is empty

        var searchInput = req.query.input;
        var searchType = req.query.method;

        var dataWatson = "no"

        searchTypes.searchTypes(searchInput, searchType).then((results) => {

            console.log(results);
            console.log(results[0].text);
        

            var options = {
                url: "https://api.giphy.com/v1/gifs/search?" +
                    "api_key=" + process.env.GIPHY_APIKEY +
                    "&q=" + results[0].text +
                    "&limit=" + 8 +
                    "&offset=" + 0 +
                    "&rating=" + "g" +
                    "&lang=" + "en",
                method: 'GET',
                headers: {
                    Accept: 'application/json'
                },
                json: true
            }
            request(options)
                .then((parsedBody) => {
                    console.log("Searching GIPHY for <" + searchInput + ">")
                    res.json({
                        data: parsedBody.data,
                        watson: results
                    })
                })
                .catch(function (err) {
                    res.json({ success: "false", error: err });
                });
        
            })

    },


    watson(req, res) {





        const analyzeParams = {
            'text': "IBM is a very good company",
            'features': {
                'concepts': {
                    'limit': 3
                }
            }
        };

        naturalLanguageUnderstanding.analyze(analyzeParams)
            .then(analysisResults => {
                res.json(analysisResults);
            })
            .catch(err => {
                console.log('error:', err);
                res.json(err);
            });



    }


};

module.exports = searchController;