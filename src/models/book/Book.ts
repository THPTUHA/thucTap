import { Column, PrimaryKey, Table ,Model} from "sequelize-typescript";
import {QueryTypes} from 'sequelize';
import { DBModel } from "../../packages/database/DBModel";


interface BookVideo{
    bookName: string,
    videoName: string
}


@Table({
    tableName: 'books',
    timestamps: false
})

export class BookModel extends DBModel{
    @PrimaryKey
    @Column
    id: number;
    @Column
    name: string;
    
    static async getBookVideo(){
        const result = await this.sequelize.query(`select b.name as bookName, v.name as videoName from books b, chapters c, videos v, lessons l , RLessonVideo r
        where b.id = c.bookId and c.id = l.chapterId and l.id = r.lessonId  and r.videoId = v.id 
        order by b.name asc,r.position asc;`,{ type: QueryTypes.SELECT }) as BookVideo[];

        const ansewrs = {};

        for(const item of result){
            if(ansewrs[item.bookName] == undefined){
                ansewrs[item.bookName] = [item.videoName];
            }else{
                ansewrs[item.bookName].push(item.videoName);
            }
        }
        return ansewrs;
    }



    release(){
        return {
            id: this.id,
            name: this.name,
        }
    }
}