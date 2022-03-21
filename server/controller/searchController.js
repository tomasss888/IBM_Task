var request = require('request-promise');


const search = async (req, res, next) => {

    // add smth if string is empty

    var searchInput = req.query.input;



    var options = {
        url: "https://api.giphy.com/v1/gifs/search?" +
            "api_key=" + process.env.GIPHY_APIKEY +
            "&q="      + searchInput +
            "&limit="  + 5 +
            "&offset=" + 0 +
            "&rating=" + "g" +
            "&lang="   + "en",
        method: 'GET',
        headers: {
            Accept: 'application/json'
        },
        json: true
    }
    request(options)
        .then((parsedBody) => {
            console.log("Searching GIPHY for <" + searchInput + ">")
            res.json(parsedBody.data)
        })
        .catch(function (err) {
            res.json({ success: "false", error: err });
        });




};

module.exports = { search };