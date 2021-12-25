const debug = require('debug')('app:startup');
const express = require('express');  // return function
const Joi = require('joi'); // return Class
const app = express();
const helmet = require('helmet');
const morgan = require('morgan');

//中间件
app.use(express.json());  //开启express获取请求体中JSON对象的功能
app.use(express.urlencoded({ extended : true }));  // 通过urlencoded格式传递数组或者复杂的表达数据
app.use(express.static('public')); //向外提供静态内容，如图片，css、html等等  static 方法是从根目录开始起作用的。

//自定义中间件
app.use(function(req, res, next) {
    console.log("Logging....");
    next();
})

// console.log(process.env.NODE_ENV);
// console.log(app.get('env'));

//第三方中间件
app.use(helmet());
//只在开发环境中使用该日志功能
if (app.get('env') === 'development') {
    debug('morgan enable...');
    app.use(morgan('short'));   // 记录 http 请求日志
}

const courses = [
    {id: 1, name : '数据结构'},
    {id: 2, name : '软件工程'},
    {id: 3, name : '操作系统'}
];

app.get('/', (req, res) => {
    res.send('Hello World!!!');
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course)
        return res.status(404).send('没有该ID对应的课程号');
    res.send(course);
});


const validateCourse = function(course) {
    const schema = Joi.object({
        name : Joi.string().min(2).required()
    });
    return schema.validate(course, [abortEarly = false]);
}

app.post('/api/courses', (req, res) => {
    //校验用户输入合法性
    const { error } = validateCourse(req.body)  //使用对象析构，当声明一个变量或常量时，使用 {}，添加目标对象属性

    if(error){
        return res.status(400).send(error.details[0].message);
    }
    const course = {
        id : courses.length + 1,
        name : req.body.name
    };
    courses.push(course); //将新的课程加入到courses数组中去
    res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course)
        return res.status(404).send('没有该ID对应的课程号');

    const { error } = validateCourse(req.body)

    if(error){
        return res.status(400).send(error.details[0].message);
    }

    course.name = req.body.name; // update course name
    res.send(course);

});

app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course)
        return res.status(404).send('没有该ID对应的课程号');
    // 删除课程
    const index = courses.indexOf(course);
    courses.slice(index, 1);

    res.send(course);
})






const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`))

for (let i of courses)
    console.log(i);