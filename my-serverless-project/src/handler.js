'use strict';
const MongoClient = require('mongodb').MongoClient;
/*
module.exports.hello = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go Serverless v1.0! Your function executed successfully!',
        input: event,
      },
      null,
      2
    ),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
*/

module.exports.putData = async (event) => {
  const client = new MongoClient('mongodb://localhost:27017', {useUnifiedTopology: true});
  await client.connect();

  const db = client.db('mydb');
  const collection = db.collection('mycollection');

  const data = JSON.parse(event.body);
  await collection.insertOne(data);

  await client.close();

  return {
    statuscode: 200,
    body: JSON.stringify({ message: 'Sucessfull' })
  }
}