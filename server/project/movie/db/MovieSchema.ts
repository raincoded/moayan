import Mongoose, { Schema } from 'mongoose'
import { Movie } from '../model/Movie'
export interface IMovie extends Movie, Mongoose.Document { }// 因为模型对象中是没有mongoose的一些属性和方法的，所以要继承它
const moveSchema = new Schema<IMovie>( // 加上泛型，方便后面获取时能够推断出获取到的是什么东西
    {
        name: String,
        types: [String],
        areas: [String],
        timeLong: Number,
        isHot: Boolean,
        isComing: Boolean,
        isClassic: Boolean,
        description: String,
        poster: String
    },
    {
        versionKey: false,
    }
)
export default Mongoose.model<IMovie>("Movie",moveSchema) // 加上泛型，方便后面获取时能够推断出获取到的是什么东西