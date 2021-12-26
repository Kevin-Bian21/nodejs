const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB'));

const coursesSchema = new mongoose.Schema({
    name : String,
    author : String,
    tags : [ String ],
    date : { type : Date, default : Date.now },
    isPublish : Boolean
});

const Course = mongoose.model('Course', coursesSchema);

async function createCourse(){
    const course = new Course({
        name : '计算机网络',
        author : 'mosh',
        tags : ['network', 'cs'],
        isPublish : true
    });

    const result = await course.save();
    console.log(result);
}

// createCourse();

async function getCourses() {
    // eq (equal)
    // ne (not equal)
    // gt (greater than)
    // gte (greater than or equal to)
    // lt (less than)
    // lte (less than or equal to)
    // in
    // nin (not in)

    const pageNumber = 2;
    const pageSize = 10;

    const courses = await Course
        .find({ author : /^边/ })  // get all courses from mongoDB ， param ： 过滤条件 /正则表达式/
        //.find({ price : {$gte : 10, $lte : 20}}) //价格在10-20之间
        //.find({ price : {$in : [10, 15, 20]}})  //价格为10或15或20
        .or([ {name : '数据结构'}, {isPublish : true}])  // name为‘数据结构’ 或者 ‘isPublic’ 为true的
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize)   // 分页
        .sort({ name : -1}) // 1:升序； -1:降序
        .select({ name : 1, tags : 1})  //只需返回name和tags属性
        .count();  //统计返回满足条件的数量
    console.log(courses);
}

getCourses();