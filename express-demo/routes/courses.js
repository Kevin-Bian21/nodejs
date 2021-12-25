const express = require('express');
const router = express.Router();

const courses = [
    {id: 1, name : '数据结构'},
    {id: 2, name : '软件工程'},
    {id: 3, name : '操作系统'}
];

router.get('/', (req, res) => {
    res.send(courses);
});

router.get('/:id', (req, res) => {
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

router.post('/', (req, res) => {
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

router.put('/:id', (req, res) => {
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

router.delete('/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course)
        return res.status(404).send('没有该ID对应的课程号');
    // 删除课程
    const index = courses.indexOf(course);
    courses.slice(index, 1);

    res.send(course);
});

module.exports = router;