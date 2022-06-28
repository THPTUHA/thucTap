import { Sequelize } from 'sequelize-typescript';
import { BookModel } from '../models/book/Book';
import { ChapterModel } from '../models/chapter/Chapter';
import { LessonModel } from '../models/lesson/Lesson';
import { RLessonVideo } from '../models/rLessonVideo/RLessonVideo';
import { VideoModel } from '../models/video/Video';

export default () => {
    const sequelize = new Sequelize({
        database: process.env.DATABASE_NAME,
        host: process.env.DATABASE_HOST,
        dialect: 'mysql',
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        models: [
           VideoModel,
           BookModel,
           LessonModel,
           RLessonVideo,
           ChapterModel
        ]
    });
    return sequelize;
};