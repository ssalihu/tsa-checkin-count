'use strict';
const AWS = require('aws-sdk');
//const request = require('axios');
const request = require('request')
const { extractListingsFromHTML } = require('./helpers');
const { sendSNS } = require('./sns');

module.exports.gettsacount = (event, context, callback) => {
  const URL =  process.env.URL;

  let options = {
      url: URL,
      headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36'
      }
  };

  request(options,function(err,resp,data) {
  //request(options,function(err,resp,html))
   // .then(({ data }) => {
      // get reference to S3 client
      const s3 = new AWS.S3();
      try {
        var buffer = extractListingsFromHTML(data);
        const destparams = {
          Bucket: process.env.S3_BUCKET,
          Key: process.env.DATA_FILE,
          Body: JSON.stringify(buffer),
          ContentType: "text"
        };

        var count = buffer.counts.length;
        var msg = 'TSA info parsed and processed [' + count + '] entries. data: '+ JSON.stringify(buffer);
        console.log("Count is " + count);
        if(count && count > 0) {
           const putResult = s3.putObject(destparams).promise();
        } else {
           msg = 'Unable to parse TSA covid data';
        }
        sendSNS(msg);
        return { message: 'Go Serverless v1.0! Your function executed successfully!', event };

      } catch (error) {
        console.log(error);
        var msg = 'Error processing TSA data: ' + error;
        sendSNS(msg);
        return { message: 'Something went wrong: '+ error, event};
      }
      //callback(null, {buffer});
    })
   // .catch(callback);
};
