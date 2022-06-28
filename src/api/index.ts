import { Router } from 'express';
import addVideo from './routes/addVideo/addVideo';
import bookVideo from './routes/bookVideo/bookVideo';
import deleteChapter from './routes/deleteChapter/deleteChapter';
import repeatVideo from './routes/repeateVideo/repeatVideo';


export default () => {
    const app = Router();
    bookVideo(app);
    addVideo(app);
    repeatVideo(app);
    deleteChapter(app);
    return app;
};