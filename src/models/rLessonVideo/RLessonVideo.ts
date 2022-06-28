import { Column, PrimaryKey, Table } from "sequelize-typescript";
import { DBModel } from "../../packages/database/DBModel";


@Table({
    tableName: 'rLessonVideo',
    timestamps: false
})

export class RLessonVideo extends DBModel{
    @PrimaryKey
    @Column
    id: number;
    @Column
    name: string;
    @Column
    videoId: number;
    @Column
    lessonId: number;
    @Column
    position: number;


    release(){
        return {
            id: this.id,
            name: this.name,
            videoId: this.videoId,
            position: this.position,
            lessonId: this.lessonId
        }
    }
}