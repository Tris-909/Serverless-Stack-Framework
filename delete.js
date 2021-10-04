import handler from './libs/handler-libs';
import dynamoDB from './libs/dynamo-lib';

export const main = handler(async (event, context) => {
    const params = {
        TableName: process.env.tableName,
        Key: {
            userId: "123",
            noteId: event.pathParameters.id 
        }
    };

    await dynamoDB.delete(params);

    return { status: true }
});