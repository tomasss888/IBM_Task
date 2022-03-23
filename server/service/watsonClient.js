

const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
const { IamAuthenticator } = require('ibm-watson/auth');
const { debug } = require('request-promise');

const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
    version: process.env.WATSON_VERSION,
    authenticator: new IamAuthenticator({
        apikey: process.env.WATSON_APIKEY,
    }),
    serviceUrl: process.env.WATSON_URL
});


// analyzes text with selected method
function searchTypes(text, method) {

    return new Promise(function (res, rej) {

        var analyzeParams = {}
        console.log("Method type is : " + method)

        switch (method) {
            // Concepts option
            case ("Concepts"):

                analyzeParams = {
                    "text": text,
                    "features": {
                        "concepts": {
                            "limit": 5
                        }
                    }
                };
                res(getResults(analyzeParams, method))

                break;

            // Keywords option
            case ("Keywords"):

                analyzeParams = {
                    "text": text,
                    "features": {
                        "keywords": {
                            "sentiment": true,
                            "emotion": true,
                            "limit": 5
                        }
                    }
                };
                res(getResults(analyzeParams, method))
                break;

            // Entities option
            case ("Entities"):

                analyzeParams = {
                    "text": text,
                    "features": {
                        "entities": {
                            "sentiment": true,
                            "limit": 5
                        }
                    }
                };
                res(getResults(analyzeParams, method))
                break;

            // Default search (doesn't need to call to Watson API)
            default:
                res({ 0: { 'text': text } })
                break;

        }

       

    })

}

// call to api with chosen parameters(analyzeParams)
function getResults(analyzeParams, method) {

    return naturalLanguageUnderstanding.analyze(analyzeParams)
        .then(data => {
            console.log("Received data from watson API succesfully")
            if (method == "Concepts")
                return data.result.concepts;
            if (method == "Keywords")
                return data.result.keywords;
            if (method == "Entities")
                return data.result.entities;
        })  
        .catch(err => {
            console.error(err)
            return err;
        });
}

module.exports = {
    searchTypes
}