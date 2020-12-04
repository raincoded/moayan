import express, { Request, Response } from 'express'
import { MovieService } from '../../services/MovieService';
const router = express.Router()
const baseUrl = '/api/movie';// 基础路径
const runPath = process.cwd()// 获取当前的运行路径
const path = require('path');
const getMsg = require(path.resolve(runPath, './server/until/getSendResult')); // 辅助函数

router.get(baseUrl, getMsg.asyncHandler(async (req: Request, res: Response) => {
    const reuslt = await MovieService.findByPage({
        value: req.query
    })
    return {
        msg: '获取成功！',
        data: reuslt
    }
}))

router.get(baseUrl + '/:id', getMsg.asyncHandler(async (req: Request, res: Response) => {
    const reuslt = await MovieService.findById(req.params.id)
    return {
        msg: '获取成功！',
        data: reuslt
    }
}))
export default router