# js-test
zpc个人的各种js测试文档
坚持就是胜利！
别忘记运行index.js作为服务器



#####11月28日：
    ######d3_test:
    d3弄清了树状图和集群图如何创建，特别要注意v4版本和v3的巨大区别。
    创建node服务器，d3数据文件读取需要。
#####11月30日：
    ######d3_test:
    添加图片人物关系力导向图，理解drag三个事件处理函数的作用，理解tick事件在力导向图定位的作用。
    力导向图json文件中，links的source和target默认为根据nodes的下标定位，若要自定义则要通过id()方法，传入回调函数：返回source和target定位对应的nodes数据的字段。
    添加拖动小圆圈的drag练习,随时显示小圆圈的坐标。
    添加矩形分区图，注意此时sum()函数只需要计算所有叶子节点的值。
#####12月1日：
    ######d3_test:
    添加了直方图 但是问题很多 需要今后深入探究。
    ######node_test:
    添加buffer。