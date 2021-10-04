import handler from './libs/handler-libs';
import dynamoDB from './libs/dynamo-lib';

export const main = handler(async (event, contexts) => {
    const data = JSON.parse(event.body);

    const params = {
        TableName: process.env.tableName,
        Key: {
            userId: "123",
            noteId: event.pathParameters.id,
        },
        UpdateExpression: "SET content = :content, attachment = :attachment",
        ExpressionAttributeValues: {
            ":attachment": data.attachment || null,
            ":content": data.content || null,
        },
        ReturnValues: "ALL_NEW",
    }

    await dynamoDB.update(params)

    return { status: true }
});