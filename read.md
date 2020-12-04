安装tslint ，由于依赖typescript,所以teypescript也要安装

初始化tslint，使用命令 ： yarn tslint --init 或 npx tslint --init

```json
{
    "defaultSeverity": "error",
    "extends": [
        "tslint:recommended"
    ],
    "jsRules": {},
    "rules": {
        "no-console":false,// 允许输出语句
        "no-empty":true,// 不允许为空的块，就是不能有一行空着
        "interface-name":true // 接口应该一大写字母开头
    },
    "rulesDirectory": []
}
```

# 数据库
验证： class-validator
转换对象：class-transformer
元信息库：reflect-metadata

## 数据库驱动
mongodb(官方) / mongoose  

其他的数据库驱动: typeorm (完全使用ts编写，基于类)，对mongodb支持不好

修改成功 { ok: 0, n: 0, nModified: 0 }
{ n: 0, nModified: 0, ok: 1 }

findById() -> null或有值
修改 ->  { n: 1, nModified: 1, ok: 1 }
删除 ->  { n: 1, ok: 1, deletedCount: 1 }


// "dev": "nodemon src -e ts --exec ts-node src/index.ts",