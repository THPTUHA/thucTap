import { Column, PrimaryKey, Table } from "sequelize-typescript";
import { DBModel } from "../../packages/database/DBModel";


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
    

    release(){
        return {
            id: this.id,
            name: this.name,
        }
    }
}