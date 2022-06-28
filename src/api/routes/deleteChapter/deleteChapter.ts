import { Router } from 'express';
import { ChapterModel } from '../../../models/chapter/Chapter';
import { VideoModel } from '../../../models/video/Video';
import BaseError from '../../../packages/baseError/BaseError';

export default (router: Router) => {
    router.post("/deleteChapter",  
        async(req, res)=>{     
            let {chapterId} = req.body;

            try {
                
                chapterId = chapterId ? parseInt(chapterId) : ""; 

                if(!chapterId || chapterId == NaN){
                    return res.status(502).send(new BaseError("Chapter Id invalid!", BaseError.Code.ERROR).release());
                }

                const chapter = await ChapterModel.findByPk(chapterId);

                if(!chapter){
                    return res.status(502).send(new BaseError("Chapter not found!", BaseError.Code.ERROR).release());
                }

                console.time('test');
                const result = await VideoModel.videoInChapterUseOne(chapter.id);
                await chapter.destroy();
                await VideoModel.destroy({
                    where:{
                        id: result.map(item => item.videoId)
                    }
                })

                console.timeEnd('test');

                return res.status(200).send({
                    code: BaseError.Code.SUCCESS
                });
            } catch (error) {
                console.log("ERROR",error);
                return res.status(502).send(new BaseError("Some errors occurred!", BaseError.Code.ERROR).release());
            }
        }
    )
};