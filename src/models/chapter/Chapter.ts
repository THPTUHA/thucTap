import { Column, PrimaryKey, Table } from "sequelize-typescript";
import { DBModel } from "../../packages/database/DBModel";


@Table({
    tableName: 'chapters',
    timestamps: false
})

export class ChapterModel extends DBModel{
    @PrimaryKey
    @Column
    id: number;
    @Column
    name: string;
    @Column
    bookId: number;

    release(){
        return {
            id: this.id,
            name: this.name,
            bookId: this.bookId
        }
    }
}