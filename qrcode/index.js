const AWS = require('aws-sdk');

const tableName = process.env.DYNAMODB_TABLE;
const docClient = new AWS.DynamoDB.DocumentClient();

module.exports.main = (event, context, callback) => {
  console.log('main');
  callback(null, {
    statusCode: 200,
    body: JSON.stringify({
      action: 'main',
      input: context,
    })
  });
};

module.exports.on = (event, context, callback) => {
  const uuid = event.pathParameters.uuid;
  let params = {
    TableName: tableName,
    Key: {
      "uuid": uuid
    },
    UpdateExpression: "set status=:s",
    ExpressionAttributeValues:{
      ":s": "1"
    },
    ReturnValues:"UPDATED_NEW"
  };

  docClient.update(params, function (err, data) {
    if (err) {
      console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));

      callback(null, {
        statusCode: 404,
        body: JSON.stringify({
          error: "Unable to update item. Error JSON:" + JSON.stringify(err, null, 2)
        })
      });
    } else {
      console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));

      callback(null, {
        statusCode: 200,
        body: JSON.stringify({
          results: "UpdateItem succeeded:" + JSON.stringify(data, null, 2),
        })
      });
    }
  });
};

module.exports.off = (event, context, callback) => {
  const uuid = event.pathParameters.uuid;
  let params = {
    TableName: tableName,
    Key: {
      "uuid": uuid
    },
    UpdateExpression: "set status=:s",
    ExpressionAttributeValues:{
      ":s": "0"
    },
    ReturnValues:"UPDATED_NEW"
  };

  docClient.update(params, function (err, data) {
    if (err) {
      console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));

      callback(null, {
        statusCode: 404,
        body: JSON.stringify({
          error: "Unable to update item. Error JSON:" + JSON.stringify(err, null, 2)
        })
      });
    } else {
      console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));

      callback(null, {
        statusCode: 200,
        body: JSON.stringify({
          results: "UpdateItem succeeded:" + JSON.stringify(data, null, 2),
        })
      });
    }
  });
};

module.exports.status = (event, context, callback) => {
  console.log('status');
  callback(null, {
    statusCode: 200,
    body: JSON.stringify({
      action: 'status',
      input: context,
    })
  });
};
