import { Model } from 'sequelize-typescript';

export class DBModel extends Model {

    static async saveObject<M extends Model>(
        this: { new(): M } & typeof Model,
        params): Promise<M> {
        var value = await this.create(params);

        value.id = (value as any).null;

        return (value as M);
    }

    static async paginate<M extends Model>(this: { new(): M } & typeof Model, query: any, { page, page_size }): Promise<M[]> {
        var value = await this.findAll(
            {
                ...query,
                offset: (page - 1) * page_size,
                limit: page_size
            }
        );
        return value as M[];
    }


    async edit(fields: string[]) {
        return await this.save({ fields: fields });
    }

    static async find<M extends Model>( this: { new(): M } & typeof Model,fields: string[]){
        const results = await this.findAll({
            attributes: fields
        })

        return results as M[];
    }
}

