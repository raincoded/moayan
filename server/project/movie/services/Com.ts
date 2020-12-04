import { Type, plainToClass } from "class-transformer";
import { ClassType } from "class-transformer/ClassTransformer";
import { IsInt, Min, validate } from "class-validator";
import { MovieModel } from "../db/db";
import { IId, IValue } from "./MovieService";

/**
 * 分页的公共类
 */
export class ComPage {
    @Type(() => Number)
    @IsInt({ message: '页码必须是整数' })
    @Min(1, { message: '最小为1页' })
    public page: number = 1;

    @Type(() => Number)
    @IsInt({ message: '页容量必须是整数' })
    @Min(1, { message: '页容量最小为1页' })
    public limit: number = 10;

    @Type(() => String)
    public keyword: string = '';
}

/**
 * 转换为movie类的对象，因为validate验证的是类是否符合条件
 * @param cls 要转换的类型
 */
export function ComTransform<T>(cls: ClassType<T>) {// 外层装饰器调用的函数
    return function (target: any, propertyName: string, descriptor: PropertyDescriptor) {// 这个函数代表的是装饰的类
        const oldFunc = descriptor.value;
        descriptor.value = function (obj: IValue<T>) {// 这个函数就是装饰的这个方法的函数
            if (obj.value instanceof cls) {// 是实体类直接返回
                return oldFunc!.apply(this, [obj])
            } else {// 不是则转成实体类
                // console.log('转换前', obj.value)
                obj.newValue = plainToClass<T, object>(cls, obj.value as object)
                // console.log('转换后', obj.value)
                return oldFunc!.apply(this, [obj]) // 通过apply将参数传递回装饰的函数
            }
        }
    }
}

/**
 * 验证movie
 * @param skipMissingProperties 是否模糊验证
 */
export function validatorClass<T>(cls: ClassType<T>, skipMissingProperties: boolean = false) {
    return function (target: any, propertyName: string, descriptor: PropertyDescriptor) {
        const oldFunc = descriptor.value;
        descriptor.value = async function (obj: IValue<T>) {
            const errors = await validate(obj.newValue!, { skipMissingProperties });
            const newArr: string[] = [];
            if (errors.length > 0) {
                errors.forEach(e => {
                    if (e.constraints) {
                        newArr.push(...Object.values(e.constraints))
                    }
                })
                throw newArr
            }
            return oldFunc!.apply(this, [obj])
        }
    }
}
/**
 * 验证id是否合法
 */

export function IsObjectId(target: any, propertyName: string, descriptor: PropertyDescriptor) {
    const oldFunc = descriptor.value;
    descriptor.value = async function (i: string | IId) {
        if (!i) {
            throw new Error('id不能为空!')
        } else {
            let id: string;
            if (typeof i !== 'string') {
                if (!i.id) {
                    throw new Error('id不能为空!')
                }
                id = i.id
            } else {
                id = i;
            }
            if (!/^[a-fA-F0-9]{24}$/.test(id)) {
                throw new Error('不是有效的id!')
            }
            // 查看id是否存在
            const idResult = await MovieModel.findById(id)
            if (!idResult) {
                throw new Error('不是有效的id!')
            }
            return oldFunc.apply(this, [i])
        }
    }
}






// /**
//  * 将对象转成实例
//  */
// function tansform<T>(cls: ClassType<T>) {
//     return function (target: any, propertyName: string, descriptor: PropertyDescriptor) {
//         const oldFunc = descriptor.value;
//         descriptor.value = function (obj: ITest<T>) {
//             obj.newValue = ComService.ComTransform<T>(cls, obj)
//             return oldFunc!.apply(this, [obj])
//             // obj.newValue = cls.transform(obj.value!);
//         }
//     }
// }

// /**
//  * 验证属性是否合法
//  * @param skipMissingProperties
//  */
// function validate<T>(cls: ClassType<T>, skipMissingProperties: boolean = false) {
//     return function (target: any, propertyName: string, descriptor: PropertyDescriptor) {
//         const oldFunc = descriptor.value;
//         descriptor.value = async function (obj: ITest<T>) {
//             const errors = await ComService.validatorClass<T>(cls, skipMissingProperties)
//             // const errors = await obj.newMovie!.validatorClass(skipMissingProperties)
//             if (errors.length > 0) {
//                 return errors
//             }
//             return oldFunc!.apply(this, [obj])
//         }
//     }
// }




/**
 * 服务类公共方法
 */
// export abstract class ComService {
//     /**
//      * 验证movie
//      * @param skipMissingProperties 是否模糊验证
//      */
//     public static async validatorClass<T>(cls: ClassType<T>,skipMissingProperties: boolean = false): Promise<string[]> {
//         const errors = await validate(cls, { skipMissingProperties });
//         const newArr: string[] = [];
//         if (errors.length > 0) {
//             errors.forEach(e => {
//                 if (e.constraints) {
//                     newArr.push(...Object.values(e.constraints))
//                 }
//             })
//         }
//         return newArr
//     }
//     /**
//      * 转换为movie类的对象，因为validate验证的是类是否符合条件
//      * @param cls 转换的类型
//      * @param object 转换值
//      */
//     public static ComTransform<T>(cls: ClassType<T>, object: object): T {
//         if (object instanceof cls) {
//             return object
//         } else {
//             return plainToClass<T, object>(cls, object)
//         }
//     }
// }