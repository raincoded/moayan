import mongoose from 'mongoose'
// 27017 默认端口，会自动加，如果用远程的话更改地址就行
// {useNewUrlParser: true} 这个在新版本中必须要加，以前是可以不用加的

// const { Schema, model } = mongoose;
// 使用Schema来创建
// 1. 定义 Schema
// 需要一些配置
const options: any = {
    useNewUrlParser: true,// 指定用新的地址解析方式
    useUnifiedTopology: true,// 指定用新的数据库监视引擎
    useCreateIndex: true,// mongo更改了创建所以的函数，mongoose要考虑兼容问题，这里留了 接口，表示是否启用新的函数 
    useFindAndModify: false,
    autoIndex: false, // Don't build indexes
    poolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity //
    family: 4 // Use IPv4, skip trying IPv6
}
// 'mongodb://localhost/movie'
mongoose.connect('mongodb://localhost/abc', options).then(() => {
    console.log('连接数据库成功！')
}).catch(e=>{
    console.log('发生错误',e)
})
import MovieModel from './MovieSchema'
export { MovieModel }