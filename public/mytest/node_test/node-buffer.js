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

    const buf1 = Buffer.from(arr); //TypedArray
    // console.log(buf1);
    // 只是复制了arr 并且'Buffers are also Uint8Array TypedArray instances' 说明Buffer也是Uint8Array的实例
    // 那么每个单元就只会存储1个字节，即unsigned int 8位
    // 输出：<Buffer 88 a0>

    const buf2 = Buffer.from(arr.buffer); //ArrayBuffer
    // console.log(buf2);
    // 与arr共享内存空间 那么有足够的空间防止4个元素(对于Buffer即Uint8Array来说为4个元素)
    // 输出：<Buffer 88 13 a0 0f> 注意小端：5000的低位0x88放在低地址，因此先读取0x88
    
    arr[1] = 6000;
    // console.log(buf1);
    // 因为是复制的 在全新的内存地址
    //  因此还是输出：<Buffer 88 a0>
    // console.log(buf2);
    //共享内存，同时改变，输出：<Buffer 88 13 70 17>
})();

// Buffer.byteLength(string[, encoding])
// 参数string: <String> | <Buffer> | <TypedArray> | <DataView> | <ArrayBuffer>
// 参数encoding: <String> 默认: 'utf8'
// 返回：<Number>
(function () {
    const str = '\u00bd + \u00bc = \u00be';
    // console.log(`${str}: ${str.length} characters, ` +`${Buffer.byteLength(str, 'utf8')} bytes`);
    // 输出:// ½ + ¼ = ¾: 9 characters, 12 bytes
    // 如果是参数是String以外的类型，那么返回真正的字节长度
    // 如果参数是String,则返回字符串的长度(即几个字符)
})();

// Buffer.compare(buf1, buf2)
// 参数buf1: <Buffer>
// 参数buf2: <Buffer>
// 返回：<Number>
(function () {
    // 比较两个Buffer的大小，类似c语言的str.cmp
    const buf1=Buffer.from('1234')
    const buf2=Buffer.from('0123')
    const num=Buffer.compare(buf1,buf2)
    // 通常用于对Buffer数组排序的sort()方法
    const arr=[buf1,buf2];
    arr.sort(Buffer.compare)
})();

// Buffer.concat(list[, totalLength])
// 参数list：<Array> 待连接的Buffer实例数组
// 参数totalLength：<Number> 待连接的所有Buffer实例的总长度
// 返回：<Buffer> 返回已连接的全新的Buffer实例
(function () {
    // 如果list为空或者totalLength为0，那么返回长度为0的Buffer实例
    // 当传入totalLength时，会使方法运行更高效。没有传入，则内部会计算总长度
    const buf1 = Buffer.alloc(10);
    const buf2 = Buffer.alloc(14);
    const buf3 = Buffer.alloc(18);
    const totalLength = buf1.length + buf2.length + buf3.length;
    const bufA = Buffer.concat([buf1, buf2, buf3], totalLength);
})();

// Buffer.from(array)
// 参数array：<Array> 数组
// 返回：<Buffer> Buffer实例，由Array的数据构成
(function () {
    const buf = Buffer.from([0x62,0x75,0x66,0x66,0x65,0x72]);
    // 如果不传其他参数，则默认为ascii码字符
    // 生成['b','u','f','f','e','r']
})();

// Buffer.from(arrayBuffer[, byteOffset[, length]])
// 参数arrayBuffer：<ArrayBuffer> TypedArray实例的.buffer属性或者是一个new rrayBuffer()实例
// 参数byteOffset：<Number> 起始位置偏移量 默认为0
// 参数length：<Number> 复制的总长度，默认为: arrayBuffer.length - byteOffset
// 返回：<Buffer> Buffer实例
(function () {
    // 实例见上面“TypedArray和Buffer的关系”部分
    // 有参数byteOffset和参数length时同样共享内存
});

// Buffer.from(buffer)
// 参数buffer：<Buffer> 一个buffer实例
// 返回：buffer的一个复制，不共享内存
(function () {
    const buf1 = Buffer.from('buffer');
    const buf2 = Buffer.from(buf1);

    buf1[0] = 0x61;
    // console.log(buf1.toString());
    // 输出：'auffer'
    // console.log(buf2.toString());
    // 输出'buffer' (拷贝不会改变)
});

// Buffer.from(str[, encoding])
// 参数str：<String> 需要存储的字符串
// 参数encoding：<String> 选择传入的参数string的编码方式 默认为'utf8'
(function () {
    // 注意在Buffer实例中的任何字符都会转换为若干个16进制数
    // 实例见上面“TypedArray和Buffer的关系”部分
})();

(function () {
    // 判断是否为Buffer类型
    const isBuffer=Buffer.isBuffer('2')
    // console.log(isBuffer)
    // 输出：false

    // 判断是否为正确的字符串编码 正确的为：'utf8' 'base64'等等
    const isEncoding=Buffer.isEncoding('zpc')
    // console.log(isEncoding)
    // 输出：true
})();
// buf[index]
// 获得Buffer实例在index位置的值，为16进制的数
(function () {
    // 赋值的合法范围在0x00和0xFF之间
    const str = "Node.js";
    const buf = Buffer.allocUnsafe(str.length);

    for (let i = 0; i < str.length ; i++) {
      buf[i] = str.charCodeAt(i);
    }
    // console.log(buf.toString('ascii'));
    // 输出Node.js
})();

// buf.compare(target[, targetStart[, targetEnd[, sourceStart[, sourceEnd]]]])
// 参数target：<Buffer> buf需要和该参数代表的buffer实力比较
// 参数targetStart：<Integer> 从target的哪个地方开始比较，默认为0
// 参数targetEnd：<Integer> target结束比较的地方，默认为target.byteLength
// 参数sourceStart：<Integer> 从buf的哪个地方开始比较，默认为0
// 参数sourceEnd：<Integer> buf结束比较的地方，默认为buf.byteLength
// 返回：<Number> buf和target的排序前后顺序
(function () {
    // 返回0，相同位置
    // 返回1，buf应该在target之后
    // 返回-1，buf应该在target之前
    const buf1 = Buffer.from('ABC');
    const buf2 = Buffer.from('BCD');
    const buf3 = Buffer.from('ABCD');

    // console.log(buf1.compare(buf1));
    // 输出: 0
    // console.log(buf1.compare(buf2));
    // 输出: -1
    // console.log(buf1.compare(buf3));
    // 输出: 1
    // console.log(buf2.compare(buf1));
    // 输出: 1
    // console.log(buf2.compare(buf3));
    // 输出: 1

    [buf1, buf2, buf3].sort(Buffer.compare);
    // 按顺序输出：[buf1, buf3, buf2]
})();

