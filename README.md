npm install -g serverless

serverless create --template aws-nodejs --path tsa-count

serverless invoke local --function gettsacount

npm init -y

serverless deploy

serverless deploy --force
