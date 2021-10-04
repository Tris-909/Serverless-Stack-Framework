import hander from './libs/handler-libs';
import dynamoDB from './libs/dynamo-lib';

export const main = handler((event, context) => {
    const params = {
        TableName: process.env.tableName,
        KeyConditionExpression: "userId = :userId",
        ExpressionAttributeValues: {
            ":userId": "123"
        },
    }

    const result = await dynamoDB.query(params);

    return result.items
}); 