

const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
const { IamAuthenticator } = require('ibm-watson/auth');

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

        // Default search (doesn't need to call to Watson API)
        if (method === undefined || method == "None" || method == "") 
            res({ 0: { 'text': text } })

        // Concepts option
        if (method == "Concepts") {

            analyzeParams = {
                'text': text,
                'features': {
                    'concepts': {
                        'limit': 5
                    }
                }
            };
            res(getResults(analyzeParams, "Concepts"))

        }

        // Keywords option
        if (method == "Keywords") {

            analyzeParams = {
                'text': text,
                'features': {
                    'keywords': {
                        'sentiment': true,
                        'emotion': true,
                        'limit': 5
                    }
                }
            };
            res(getResults(analyzeParams, "Keywords"))
        }

        // Entities option
        if (method == "Entities") {

            analyzeParams = {
                'text': text,
                'features': {
                    'entities': {
                        'sentiment': true,
                        'limit': 5
                    }
                }
            };
            res(getResults(analyzeParams, "Entities"))
        }

    })

}

// call to api with chosen parameters(analyzeParams)
function getResults(analyzeParams, method) {

    return naturalLanguageUnderstanding.analyze(analyzeParams)
        .then(data => {
            if (method == "Concepts")
                return data.result.concepts;
            if (method == "Keywords")
                return data.result.keywords;
            if (method == "Entities")
                return data.result.entities;
        })
        .catch(err => {
            //console.log('error:', err);
            return err;
        });
}

module.exports = {
    searchTypes
}