// 引入依赖
var express = require('express');
var utility = require('utility');
var bodyParser =require("body-parser"); //获取post的数据必须有这个插件

// 建立 express 实例
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.get('/', function (req, res) {
  // 从 req.query 中取出我们的 q 参数。
  // 如果是 post 传来的 body 数据，则是在 req.body 里面，不过 express 默认不处理 body 中的信息，需要引入 https://github.com/expressjs/body-parser 这个中间件才会处理，这个后面会讲到。
  // 如果分不清什么是 query，什么是 body 的话，那就需要补一下 http 的知识了
  var q = req.query.q;

  // 调用 utility.md5 方法，得到 md5 之后的值
  // utility 的 github 地址：https://github.com/node-modules/utility
  // 里面定义了很多常用且比较杂的辅助方法，可以去看看
  var md5Value = utility.md5(q);

  res.send(md5Value);
});
//post例子，请用httpie工具测试，方便又好用
app.post('/',function (req,res) {
    var q=req.body.q;
    var md5Value=utility.md5(q);
    res.send(md5Value);
})

app.listen(3002, function (req, res) {
  console.log('app is running at port 3002');
});