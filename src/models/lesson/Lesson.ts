import { Column, PrimaryKey, Table } from "sequelize-typescript";
import { DBModel } from "../../packages/database/DBModel";


@Table({
    tableName: 'lessons',
    timestamps: false
})

export class LessonModel extends DBModel{
    @PrimaryKey
    @Column
    id: number;
    @Column
    name: string;
    @Column
    chapterId: number;

    release(){
        return {
            id: this.id,
            name: this.name,
            chapterId: this.chapterId
        }
    }
}