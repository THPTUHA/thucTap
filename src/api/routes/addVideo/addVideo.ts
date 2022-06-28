import { Router } from 'express';
import { link } from 'fs';
import { BookModel } from '../../../models/book/Book';
import { LessonModel } from '../../../models/lesson/Lesson';
import { RLessonVideo } from '../../../models/rLessonVideo/RLessonVideo';
import { VideoModel } from '../../../models/video/Video';
import BaseError from '../../../packages/baseError/BaseError';

export default (router: Router) => {
    router.post("/addVideo",  
        async(req, res)=>{
            let {lessonId,videoId,videoName, videoLink} = req.body;
            let result ;

            try {
                lessonId = lessonId ? parseInt(lessonId) : "";

                if(!lessonId || lessonId == NaN){
                    return res.status(502).send(new BaseError("Lesson Id invalid!", BaseError.Code.ERROR).release());
                }

                const lesson = await LessonModel.findByPk(lessonId);

                if(!lesson){
                    return res.status(502).send(new BaseError("Lesson not found!", BaseError.Code.ERROR).release());
                }

                videoId =  videoId ? parseInt(videoId) : "";

                if(!videoId || videoId == NaN){
                    if(!videoName){
                        return res.status(200).send(new BaseError("Must have video name!", BaseError.Code.ERROR).release());
                    }

                    if(!videoLink){
                        return res.status(200).send(new BaseError("Must have video link!", BaseError.Code.ERROR).release());
                    }

                    const videoNew = await VideoModel.saveObject({
                        name: videoName,
                        link: videoLink
                    })

                    result = await RLessonVideo.saveObject({
                        videoId:  videoNew.id,
                        lessonId: lesson.id,
                        position: 0
                    })

                }else{
                    const video = await LessonModel.findByPk(videoId);
                    result = await RLessonVideo.saveObject({
                        videoId:  video.id,
                        lessonId: lesson.id,
                        position: 0
                    })

                }
                
                return res.status(200).send({
                    result,
                    code: BaseError.Code.SUCCESS
                });
            } catch (error) {
                console.log("ERROR",error);
                return res.status(502).send(new BaseError("Some errors occurred!", BaseError.Code.ERROR).release());
            }
        }
    )
};