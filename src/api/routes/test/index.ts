import { Router } from 'express';
import { VideoModel } from '../../../models/video/Video';
import BaseError from '../../../packages/baseError/BaseError';

export default (router: Router) => {
    router.post("/test",  
        async(req, res)=>{
            const {name} = req.body;

            if(!name){
                return res.status(200).send(new BaseError("Name empty!", BaseError.Code.ERROR).release());
            }

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