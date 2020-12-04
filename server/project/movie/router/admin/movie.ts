import express, { Request, Response } from 'express'
import { MovieService } from '../../services/MovieService';
const router = express.Router()
const baseUrl = '/api/movie';// 基础路径
const runPath = process.cwd()// 获取当前的运行路径
const path = require('path');
const getMsg = require(path.resolve(runPath, './server/until/getSendResult')); // 辅助函数

router.post(baseUrl, getMsg.asyncHandler(async (req: Request, res: Response) => {
    const reuslt = await MovieService.add({ value: req.body });
    return {
        msg: '添加成功！',
        data: reuslt
    }
}))
router.put(baseUrl + '/:id', getMsg.asyncHandler(async (req: Request, res: Response) => {
    const a = await MovieService.update({
        id: req.params.id,
        value: req.body
    })
    const reuslt = await MovieService.findById(req.params.id)
    return {
        msg: '修改成功！',
        data: reuslt
    }
}))
router.delete(baseUrl + '/:id', getMsg.asyncHandler(async (req: Request, res: Response) => {
    await MovieService.delete(req.params.id)
    return {
        msg: '删除成功！'
    }
}))
export default router