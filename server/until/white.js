



module.exports = [
    // 管理员
    {
        method: "GET",
        path: "/api/admin/"
    },
    {
        method: "POST",
        path: "/api/admin"
    },
    {
        method: "PUT",
        path: "/api/admin/:id"
    },
    {
        method: "DELETE",
        path: "/api/admin/:id"
    },
    // 普通用户登录，修改，删除
    {
        method: "GET",
        path: "/api/user/"
    },
    {
        method: "PUT",
        path: "/api/user/:id"
    },
    {
        method: "DELETE",
        path: "/api/user/:id"
    },
    {
        method: "POST",
        path: "/api/user/login"
    },
    {
        method: "POST",
        path: "/api/user/register"
    },
    // 随笔
    {
        method: "POST",
        path: "/api/essays"
    },
    {
        method: "DELETE",
        path: "/api/essays/:id"
    },
    // 回复留言
    {
        method: "PUT",
        path: "/api/message",
    },
     // 删除留言
     {
        method: "DELETE",
        path: "/api/message/:id",
    },
]