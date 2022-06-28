import { Router } from 'express';
import { BookModel } from '../../../models/book/Book';
import BaseError from '../../../packages/baseError/BaseError';

export default (router: Router) => {
    router.get("/bookVideo",  
        async(req, res)=>{            
            try {
                console.time('test');
                const result = await BookModel.getBookVideo();
                console.timeEnd('test');
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