import * as uuid from 'uuid';
import AWS from 'aws-sdk';

AWS.config.update({ region: "ap-southeast-2" });

const dynamoDB = new AWS.DynamoDB.DocumentClient();

export async function main(event, context) {
    const data = JSON.parse(event.body);

    const params = {
        TableName: process.env.tableName,
        Item: {
            userId: "123",
            noteId: uuid.v4(),
            content: data.content,
            attachment: data.attachment,
            createdAt: Date.now(),
        }
    }

    const headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true
    }

    try {
        await dynamoDB.put(params).promise();

        return {
            statusCode: 200,
            headers: headers,
            body: JSON.stringify(params.Item)
        }
    } catch(err) {
        return {
            statusCode: 500,
            headers: headers,
            body: JSON.stringify({ error: err.message })
        }
    }
}