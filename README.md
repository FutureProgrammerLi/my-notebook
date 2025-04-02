This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).  
用CRA创建并跟做的Next项目,想接入免费的文本分析聊天接口,结果没找到,就先注释掉了.  
B站原地址:https://www.bilibili.com/video/BV18HX6YvEPh/  
技术栈是Next/shadcn/tailwindcss, prisma/supabase.  
* Next 15: api/route.ts + server action处理用户授权注册登录,笔记的增删改查;
* shadcn + tailwindcss: 前端页面的样式编写; 
* supabase + prisma: 数据库数据管理 + 注册邮箱认证 + 登录授权.

## Takeaway
1. 简单了解Next15中如何同时用server actions和 app/api,处理网络请求;
2. 利用Next的中间件和supabase,实现真实邮箱校验,账号的注册和登录.
3. 利用prisma,本地定义,并在远程生成可用的数据库tables,并利用server actions,成功向远程增删改查数据.(actions里主要是prisma提供的api)

## Regrets
1. 当然是没接入AI进行笔记分析了.是区别于其它笔记本的一大功能我居然没找到能连的AI接口
2. prisma+supabase的数据库组合还是不太明白.Relational和Document based(之前用的Mongo)数据库感觉前者好难理解.
3. 做着做着有点忘记了初衷,没能很好理解编写的意图就写出来了,导致后续再写,再看甚至都不知道是为了什么.算是后续一个本项目的方向?
4. 笔记切换很慢,可能是请求到远端时的延迟较高,后续应利用缓存提高性能.

