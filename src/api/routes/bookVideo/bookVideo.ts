import { Router } from 'express';
import { BookModel } from '../../../models/book/Book';
import { ChapterModel } from '../../../models/chapter/Chapter';
import { LessonModel } from '../../../models/lesson/Lesson';
import { VideoModel } from '../../../models/video/Video';
import BaseError from '../../../packages/baseError/BaseError';

export default (router: Router) => {
    router.post("/bookVideo",  
        async(req, res)=>{
            const {name} = req.body;

            if(!name){
                return res.status(200).send(new BaseError("Name empty!", BaseError.Code.ERROR).release());
            }

            const books = await BookModel.findAll();
            const bookIds = books.map(book => book.id);
            const chapters = await ChapterModel.findAll({
                where:{
                    id: bookIds
                }
            })

            const lessons = await LessonModel.findAll({
                where:{
                    id: chapters.map(chapter => chapter.id)
                }
            })

            

            const videos = await VideoModel.find(['name','id']);
            
            try {
                return res.status(200).send({
                    video: videos.map(video => video.release()),
                    code: BaseError.Code.SUCCESS
                });
            } catch (error) {
                console.log("ERROR",error);
                return res.status(502).send(new BaseError("Some errors occurred!", BaseError.Code.ERROR).release());
            }
        }
    )
};