import { Router } from 'express';
import { VideoModel } from '../../../models/video/Video';
import BaseError from '../../../packages/baseError/BaseError';

export default (router: Router) => {
    router.get("/repeatVideo",  
        async(req, res)=>{            
            try {
                console.time('test');
                // const result = await VideoModel.repeat();
                const result = await VideoModel.repeatOther2();
                // const result = await VideoModel.repeatOther();
                console.timeEnd('test');

                return res.status(200).send({
                    result: result,
                    code: BaseError.Code.SUCCESS
                });
            } catch (error) {
                console.log("ERROR",error);
                return res.status(502).send(new BaseError("Some errors occurred!", BaseError.Code.ERROR).release());
            }
        }
    )
};