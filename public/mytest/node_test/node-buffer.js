// 由于以前的构造函数new Buffer()返回值取决于传入的参数类型(字符串 数字 数组等等)
// 现在需要将其构造函数转变到下面的方法中
(function () {
    const buf1 = Buffer.alloc(10);
    // 创建一个全为0的Buffer 长度为10
    const buf2 = Buffer.alloc(10, 1);
    // 创建一个全为0x01字符的Buffer 长度为10
    const buf3 = Buffer.allocUnsafe(10);
    // 创建一个未初始化的Buffer长度为10
    // 这比Buffer.alloc()快，但是返回的Buffer可能包含了之前的数据
    // 这些数据可能需要通过fill()或者write()方法重写.
    const buf4 = Buffer.from([1,2,3]);
    // 创建一个包括了[0x01,0x02,0x03]的Buffer
    const buf5 = Buffer.from('test');
    // 创建一个包括了代表'test'的ASCII码[74, 65, 73, 74]的Buffer
})();
// Buffer实例主要应用方向
// 用于各种编码字符串的互相转化
(function () {
    const buf1 = Buffer.from('hello world', 'ascii');
    // console.log(buf1.toString('hex'));
    // 输出: 68656c6c6f20776f726c64

    // console.log(buf1.toString('base64'));
    // 输出: aGVsbG8gd29ybGQ=

    const buf2=Buffer.from('aGVsbG8gd29ybGQ=','base64')
    // console.log(buf2.toString('hex'));
    // 输出：68656c6c6f20776f726c64

    const buf3=Buffer.from('周培晨','utf8')
    // console.log(buf3.toString('base64'))
    // 输出：5ZGo5Z+55pmo
})();
// Buffer类型和TypedArray的关系
// 注意寻常x86 cpu都是小端 即低位数存到低位地址 计算机读取的时候也是从低位先读 数组也从低位先存 累积到高位
(function () {
    const arr = new Uint16Array(2);
    arr[0] = 5000;
    arr[1] = 4000;

    const buf1 = Buffer.from(arr); 
    // console.log(buf1);
    // 只是复制了arr 并且'Buffers are also Uint8Array TypedArray instances' 说明Buffer也是Uint8Array的实例
    // 那么每个单元就只会存储1个字节，即unsigned int 8位
    // 输出：<Buffer 88 a0>

    const buf2 = Buffer.from(arr.buffer); 
    // console.log(buf2);
    // 与arr共享内存空间 那么有足够的空间防止4个元素(对于Buffer即Uint8Array来说为4个元素)
    // 输出：<Buffer 88 13 a0 0f> 注意小端：5000的低位0x88放在低地址，因此先读取0x88
    
    arr[1] = 6000;
    console.log(buf1);
    // 因为是复制的 在全新的内存地址
    //  因此还是输出：<Buffer 88 a0>
    console.log(buf2);
    //共享内存，同时改变，输出：<Buffer 88 13 70 17>
})();