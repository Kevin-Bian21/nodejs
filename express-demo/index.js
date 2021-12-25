const debug = require('debug')('app:startup');
const express = require('express');  // return function
const Joi = require('joi'); // return Class
const app = express();
const helmet = require('helmet');
const morgan = require('morgan');
const logger = require('./middleware/logger');
const courses = require('./routes/courses');  // 导入课程模块
const home = require('./routes/home');

app.use('/api/courses', courses);  //当有请求路径为 /api/courses 时，都交由courses模块处理
app.use('/', home);

//中间件
app.use(express.json());  //开启express获取请求体中JSON对象的功能
app.use(express.urlencoded({ extended : true }));  // 通过urlencoded格式传递数组或者复杂的表达数据
app.use(express.static('public')); //向外提供静态内容，如图片，css、html等等  static 方法是从根目录开始起作用的。

//自定义中间件
app.use(logger);

// console.log(process.env.NODE_ENV);
// console.log(app.get('env'));

//第三方中间件
app.use(helmet());
//只在开发环境中使用该日志功能
if (app.get('env') === 'development') {
    debug('morgan enable...');
    app.use(morgan('short'));   // 记录 http 请求日志
}

//视图引擎/模板引擎
app.set('view engine', 'pug');
app.set('views', './views');  //默认


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`))
