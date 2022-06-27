import { Column, PrimaryKey, Table } from "sequelize-typescript";
import { DBModel } from "../../packages/database/DBModel";


@Table({
    tableName: 'rLessonVideo',
    timestamps: false
})

export class LessonModel extends DBModel{
    @PrimaryKey
    @Column
    id: number;
    @Column
    name: string;
    @Column
    videoId: number;
    @Column
    lessonId: number;


    release(){
        return {
            id: this.id,
            name: this.name,
            videoId: this.videoId,
            lessonId: this.lessonId
        }
    }
}