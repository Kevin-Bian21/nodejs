// test('my first test', () => {

// })
const lib = require('../lib');
const db = require('../db');
const mail = require('../mail');

//将测试进行分组
describe('absolute', () => {
    it('输入一个正数，应该返回正数', () => {
        const result = lib.absolute(1);
        expect(result).toBe(1);
    });
    it('输入一个负数，应该返回正数', () => {
        const result = lib.absolute(-1);
        expect(result).toBe(1);
    });
    it('输入0，应该返回0', () => {
        const result = lib.absolute(0);
        expect(result).toBe(0);
    });
});

describe('geet', () => {
    it('测试字符串', () => {
        const result = lib.greet('kevin');
        expect(result).toMatch(/kevin/);  //使用正则表达式，可以不用实现精准匹配
        expect(result).toContain('kevin');
    });
});

describe('getCurrencies', () => {
    it('应该返回支持的货币', () => {
        const result = lib.getCurrencies();
        expect(result).toBeDefined();
        expect(result).not.toBeNull();

        //结果中是否含有’CNY‘
        expect(result).toContain('CNY');

        //判断返回的结果中是否含有下面列出的值，顺序不重要
        expect(result).toEqual(expect.arrayContaining(['USD', 'AUD', 'EUR']));
    });
});

//测试对象
describe('getProduct', () => {
    it('提供id应该返回对应的价格', () => {
        const result = lib.getProduct(1);
        expect(result).toEqual({ id : 1, price : 10});
        expect(result).toMatchObject({ id : 1, price : 10});

        expect(result).toHaveProperty('id', 1);
    });
});

//测试异常
describe('registerUser', () => {
    it('用户名不合法应该抛出异常', () => {
        const args = [null, undefined, NaN, 0, false, ''];
        args.forEach( arg => {
            expect( () => lib.registerUser(arg) ).toThrow();
        })
    });
});

//由于一些代码需要外部资源的依赖，所以为了对该类代码进行单元测试可以使用模拟函数进行测试
describe('applyDiscount', () => {
    it("如果用户积分大于10分，则应该给予9折优惠", () => {
        //使用模拟函数代替真实函数
        db.getCustomerSync = function(customerId) {
            console.log('模拟的从数据库中获取用户信息的函数');
            return { id: customerId, points: 11 };
        }
        const order = {customerId : 1, totalPrice : 10};
        lib.applyDiscount(order);
        expect(order.totalPrice).toBe(9);
    });
});

//使用jest内置的模拟函数, 不用再手动去模拟函数了
describe('notifyCustomer', () => {
    it("给用户发送一份电邮", () => {
        db.getCustomerSync = jest.fn().mockReturnValue({ email : '123@456.com' });
        mail.send = jest.fn();

        lib.notifyCustomer({ customerId : 1});

        expect(mail.send).toHaveBeenCalled();
        expect(mail.send.mock.calls[0][0]).toBe('123@456.com');
    });
});