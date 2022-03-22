var request = require('request-promise');
const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
const { IamAuthenticator } = require('ibm-watson/auth');
var searchTypes = require("./funtions/searchTypes")


const searchController = {

    // getGIF main search api
    search(req, res) {

        var searchInput = req.query.input;
        var searchType = req.query.method;

        searchTypes.searchTypes(searchInput, searchType).then((results) => {

            console.log(results)
            
            // checks if returned with correct status code
            if (results.status > 400) {
                var errorToObj = JSON.parse(results.body)
                return res.json({
                    success: "false",
                    error: {
                        error: {
                            meta: {
                                status: errorToObj.code,
                                msg: errorToObj.error
                            }
                        }
                    }
                })
            }
            // Options for GIPHY api
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
            // Call to GIPHY API
            request(options)
                .then((parsedBody) => {
                    res.json({
                        data: parsedBody.data,
                        watson: results,
                        lookingFor: results[0].text
                    })
                })
                .catch(function (err) {
                    res.json({ success: "false", error: err });
                });

        })

    },

};

module.exports = searchController;