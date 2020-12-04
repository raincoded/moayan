import { Type } from "class-transformer";
import { IsNotEmpty, ArrayMinSize, ArrayMaxSize, Min, Max, IsArray, validate } from "class-validator";

export class Movie {
    @IsNotEmpty({ message: "电影名称不能为空" })
    @Type(() => String)// 这个是会被带到js中的约束
    public name: string;

    @IsNotEmpty({ message: "电影类型不能为空" }) // 下面约束了，这个可以不要
    @ArrayMinSize(1, { message: "电影类型至少有1个" })
    @ArrayMaxSize(5, { message: "电影类型最多为5个" })
    @IsArray({ message: "电影类型必须是数组" }) // 字符串数组用 IsArray 和 Type 为String合作来约束
    @Type(() => String)
    public types: string[];

    @IsNotEmpty({ message: "上映地区不能为空" })
    @ArrayMinSize(1, { message: "上映地区至少有1个" })
    @IsArray({ message: "上映地区必须是数组" })
    @Type(() => String)
    public areas: string[];

    @IsNotEmpty({ message: "电影时长不能为空" })
    @Min(60, { message: "电影时长需大于1分钟" })
    @Max(14400, { message: "电影时长不能超过4个小时" })
    @Type(() => Number)
    public timeLong: number;

    @IsNotEmpty({ message: "是否正在热映" })
    @Type(() => Boolean)
    public isHot: boolean = false;

    @IsNotEmpty({ message: "是否是即将上映" })
    @Type(() => Boolean)
    public isComing: boolean = false;

    @IsNotEmpty({ message: "是否为经典影片不能为空" })
    @Type(() => Boolean)
    public isClassic: boolean = false;

    // 电影简介
    @Type(() => String)
    public description?: string;

    // 海报图
    @Type(() => String)
    public poster?: string;
}

// /**
//  * 转换为movie类的对象，因为validate验证的是类是否符合条件
//  */
// public static transform(object: object): Movie {
//     return Movie.ComTransform(Movie, object)
// }
// /**
//  * 验证movie
//  */
// public async validatorMovie(skipMissingProperties: boolean = false): Promise<string[]> {
//     const errors = await validate(this, { skipMissingProperties });
//     const newArr: string[] = [];
//     if (errors.length > 0) {
//         errors.forEach(e => {
//             if (e.constraints) {
//                 newArr.push(...Object.values(e.constraints))
//             }
//         })
//     }
//     return newArr
// }