import { Column, PrimaryKey, Table } from "sequelize-typescript";
import { DBModel } from "../../packages/database/DBModel";


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
    

    
    release(){
        return {
            id: this.id,
            name: this.name,
        }
    }
}