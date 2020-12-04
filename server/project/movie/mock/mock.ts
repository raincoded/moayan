import Mock, { Random } from 'mockjs'
import { MovieService } from '../services/MovieService'
function suiji(min: number, max: number) {
    return Math.round(Math.random() * (max - min) + min)
}

// function () {
//     const index = suiji(0, areas.length)
//     return movieType[index]
// }


const areas = ["中国大陆", "日本", "韩国", "朝鲜", "美国", "英国", "德国", "菲律宾", "俄罗斯", "中国台湾", "印度"]
const movieType = ["动作电影", "奇幻电影", "喜剧电影", "恐怖电影", "冒险电影", "爱情电影", "警匪电影", "科幻电影", "战争电影", "灾难电影", "温情电影", "史诗电影", "实验电影", "微电影", "微动画电影", "悬疑电影", "音乐电影", "黑帮电影", "纪录电影", "公路电影", "意识流电影", "动画电影", "惊悚电影", "西部电影", "人物电影", "飞车电影", "家庭电影", "超级英雄电影"]
const obj = {
    "list|100": {
        "areas": function () {
            const num = suiji(1, 4)
            const index = suiji(0, areas.length);
            if (index > areas.length - 3) {
                return areas.slice(index)
            } else {
                return areas.slice(index, index + num)
            }
        },
        "name": function(){
            return Random.cname()
        },
        "timeLong|60-14400": 1,
        "type|1-3": function () {
            const num = suiji(1, 4)
            const index = suiji(0, movieType.length);
            if (index > movieType.length - 3) {
                return movieType.slice(index)
            } else {
                return movieType.slice(index, index + 3)
            }
        },
        "isHot": 1,
        "isComing": 1,
        "isClassic": 1,
        "description": Random.sentence,
        "poster": function(){
            return Random.url()
        }
    }
}

for (let i = 0; i < 100; i++) {
    const data = Mock.mock(obj)
    console.log(data.list)
    MovieService.add({ value: data.list })
}
// const m: any = {
//     areas: ['中国'],
//     name: '海妖杀手',
//     timeLong: 60,
//     type: ['科幻'],
//     age: 100
// }

  // "timeLong": function () {
        //     return suiji(60, 14400)
        // },
        // "type|1-3": function () {
        //     const index = suiji(0, movieType.length)
        //     return movieType[index]
        // },