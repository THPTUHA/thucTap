import { Column, PrimaryKey, Table } from "sequelize-typescript";
import { DBModel } from "../../packages/database/DBModel";
import {Op, QueryTypes} from 'sequelize';
import { RLessonVideo } from "../rLessonVideo/RLessonVideo";


interface VideoUseOne{
    videoId: number
}

interface VideoRepeat{
    name: number,
    numberRepeat: number
}

@Table({
    tableName: 'videos',
    timestamps: false
})

export class VideoModel extends DBModel{
    @PrimaryKey
    @Column
    id: number;
    @Column
    name: string;
    
    static async videoInChapterUseOne(chapterId: number) {
        const result = await this.sequelize.query(`select r.videoId , count(r.videoId) as number_use from 
        (select r.videoId as videoId from RLessonVideo r, lessons l 
        where l.chapterId = ${chapterId} and r.lessonId = l.id) as x, RLessonVideo r
        where x.videoId = r.videoId group by(r.videoId) having number_use = 1;`,{ type: QueryTypes.SELECT }) as VideoUseOne[];

        return result;
    }


    static async repeat() {
        const result = await this.sequelize.query(`select v.name ,count(r.videoId) as numberRepeat from RLessonVideo r, videos v where r.videoId = v.id
        group by (r.videoId) having numberRepeat >1;`,{ type: QueryTypes.SELECT }) as VideoRepeat[];

        const answer = {};
        for(const item of result){
            answer[item.name] =  item.numberRepeat;
        }

        return answer;
    }

    static async repeatOther() {
        const videos = await VideoModel.find(["id","name"]);
        const result = {};
        for(const video of videos){
            const num = await RLessonVideo.count({
                where: {
                    hashKey: {
                        [Op.like]: `${video.id}#%`
                    }
                }
            })
            if(num > 1){
                result[video.name] =  num;
            }
        }
        return result;
        
    }

    release(){
        return {
            id: this.id,
            name: this.name,
        }
    }
}