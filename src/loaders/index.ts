import expressLoader from '../loaders/express';
import schemaLoader from '../loaders/schema';

export default async ({expressApp}) => {
    try {
        await schemaLoader();
    } catch(err) {
        console.log(err.message);
    }
    await expressLoader({app: expressApp});
};