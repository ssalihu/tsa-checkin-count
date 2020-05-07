var AWS = require('aws-sdk');

function sendSNS (msg) {
 // Create publish parameters
var params = {
  Message: msg, /* required */
  TopicArn: process.env.TOPIC_ARN
};
var publishTextPromise = new AWS.SNS({apiVersion: '2010-03-31'}).publish(params).promise();
// Handle promise's fulfilled/rejected states
publishTextPromise.then(
  function(data) {
    //console.log(`Message ${params.Message} send sent to the topic ${params.TopicArn}`);
    //console.log("MessageID is " + data.MessageId);
  }).catch(
    function(err) {
    console.error(err, err.stack);
  });
}

module.exports = {
  sendSNS
};
