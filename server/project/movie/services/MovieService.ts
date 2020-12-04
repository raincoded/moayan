import { MovieModel } from "../db/db"
import { IMovie } from "../db/MovieSchema"
import { Movie } from "../model/Movie"
import { ComPage, ComTransform, IsObjectId, validatorClass } from "./Com"
import { ISearchResult } from "./Types"

export interface IId {
    id: string
}
/**
 * 添加参数接口
 */
export interface IValue<T> {
    value: T | object;
    newValue?: T;
}
/**
 * 修改参数接口
 */
export interface IUpdate<T> extends IValue<T> {
    id: string;
}

export class MovieService {
    @ComTransform<Movie>(Movie) // 1. 转换类型
    @validatorClass<Movie>(Movie) // 2. 数据验证
    public static async add(obj: IValue<Movie>): Promise<IMovie | string[]> {
        // 3. 添加到数据库
        return await MovieModel.create(obj.newValue!)
    }

    @IsObjectId
    @ComTransform<Movie>(Movie) // 1. 转换类型
    @validatorClass<Movie>(Movie, true) // 2. 数据验证
    public static async update(obj: IUpdate<Movie>) {
        return await MovieModel.updateOne({
            _id: obj.id
        }, obj.value!)
    }

    @IsObjectId
    public static async findById(id: string): Promise<IMovie | null> {
        return await MovieModel.findById(id)
    }

    @IsObjectId
    public static async delete(id: string) {
        return await MovieModel.deleteOne({ _id: id })
    }

    @ComTransform<ComPage>(ComPage) // 1. 转换类型
    @validatorClass<ComPage>(ComPage) // 2. 数据验证
    public static async findByPage(obj: IValue<ComPage>): Promise<ISearchResult<Movie>> {
        const filter = {
            name: new RegExp(obj.newValue!.keyword!)
        }
        const skip = obj.newValue!.page;
        const limit = obj.newValue!.limit;
        const count = await MovieModel.find(filter).countDocuments()
        const data = await MovieModel.find(filter).skip(skip!).limit(limit!)
        const result: ISearchResult<Movie> = {
            count,
            data
        }
        return result
    }

}