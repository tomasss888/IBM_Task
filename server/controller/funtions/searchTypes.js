

const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
const { IamAuthenticator } = require('ibm-watson/auth');

const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
    version: '2021-08-01',
    authenticator: new IamAuthenticator({
        apikey: process.env.WATSON_APIKEY,
    }),
    serviceUrl: 'https://api.eu-de.natural-language-understanding.watson.cloud.ibm.com/instances/6c94ff95-22cc-4c85-bfb7-d6f55e1f3522'
});



function searchTypes(text, method) {


    return new Promise(function (res, rej) {

        var analyzeParams = {}

        console.log("method type is : " + method)

        // Default search
        if (method === undefined || method == "None" || method == "") {

            console.log("nothing")
            res({ 0: { 'text': text } })

        }

        // Concepts option
        if (method == "Concepts") {

            analyzeParams = {
                'text': text,
                'features': {
                    'concepts': {
                        'limit': 3
                    }
                }
            };

            var results = [];

            getResults(analyzeParams)
                .then(data => {

                    //console.log(data)
                    if (data.status > 400)
                        res(data)
                    res(data.result.concepts)
                })
                .catch(function (err) {
                    res(err)
                });

        }

        // Emotions option <Not Implemented> :)
        if (method == "Emotions") {

            analyzeParams = {
                'text': text,
                'features': {
                    'emotion': {
                    }
                }
            };

            getResults(analyzeParams)
                .then(data => {
                    //console.log(results)
                    res(data.result.emotion.targets)
                })
                .catch(function (err) {
                    res(err)
                });

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

            getResults(analyzeParams)
                .then(data => {
                    //console.log(data)
                    if (data.status > 400)
                        res(data)
                    res(data.result.keywords)
                })
                .catch(function (err) {
                    res(err)
                });

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

            getResults(analyzeParams)
                .then(data => {
                    //console.log(data)
                    if (data.status > 400)
                        res(data)
                    res(data.result.entities)
                })
                .catch(function (err) {
                    res(err)
                });

        }



    })


}

// call to api with chosen options
function getResults(analyzeParams) {

    return naturalLanguageUnderstanding.analyze(analyzeParams)
        .then(analysisResults => {
            return analysisResults;
        })
        .catch(err => {
            //console.log('error:', err);
            return err;
        });

}


module.exports = {
    searchTypes
}