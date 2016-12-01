// 由于以前的构造函数new Buffer()返回值取决于传入的参数类型(字符串 数字 数组等等)
// 现在需要将其构造函数转变到下面的方法中
(function () {
    const buf1 = Buffer.alloc(10);
    // 创建一个全为0的缓存块 长度为10
    const buf2 = Buffer.alloc(10, 1);
    // 创建一个全为0x01字符的缓存块 长度为10
    const buf3 = Buffer.allocUnsafe(10);
    // 创建一个未初始化的缓存块长度为10
    // 这比Buffer.alloc()快，但是返回的缓存块可能包含了之前的数据
    // 这些数据可能需要通过fill()或者write()方法重写.
    const buf4 = Buffer.from([1,2,3]);
    // 创建一个包括了[0x01,0x02,0x03]的缓存块
    const buf5 = Buffer.from('test');
    // 创建一个包括了代表'test'的ASCII码[74, 65, 73, 74]的缓存块
    console.log(process.memoryUsage())
})()