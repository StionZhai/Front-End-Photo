Front-End-Photo
===============

前一阵接到一个猪八戒网给的面试题,题目描述如下: 
###第一步
你需要实现一个函数，根据数组中照片的上传时间对照片进行分组。同一
天的照片应该被划分到同一个组里面，不同一天的照片应该被划分到不同
的组里面。函数签名如下：
```javascript
function group(photos) { };
```
`group`函数样本输入数据如下:
```
[
  {
    "id" : "1329fdebd5",
    "time" : 1345168843044,
    "width" : 823,
    "height" : 888,
    "imageURL" : "http://photosync.herokuapp.com/photos/1329fdebd5"
  },
  {
    "id" : "1a55f933e8",
    "time" : 1345131939576,
    "width" : 1131,
    "height" : 1154,
    "imageURL" : "http://photosync.herokuapp.com/photos/1a55f933e8"
  },
  {
    "id" : "146be11fbf",
    "time" : 1345130185274,
    "width" : 877,
    "height" : 926,
    "imageURL" : "http://photosync.herokuapp.com/photos/146be11fbf"
  }
]
```
每张照片的`time`属性都表示一个日期时间的整数，可以直接通过`new Date(time)` 获取到对应的时间。例如 `1345168843044` 对应
`new Date("Fri Aug 17 2012 10:00:43 GMT+0800 (CST)")`。  
数组保证已经对 `time` 属性进行倒序排序，任意一项的 `time` 属性都不可
能比它之前的项的 `time` 属性数值要大。  
`group` 函数的样本输出数据如下：
```
{
  "2012-08-17" : [
    {
    "id" : "1329fdebd5",
    "time" : 1345168843044,
    "width" : 823,
    "height" : 888,
    "imageURL" : "http://photosync.herokuapp.com/photos/1329fdebd5"
    }
  ],
  "2012-08-16" : [
    {
    "id" : "1a55f933e8",
    "time" : 1345131939576,
    "width" : 1131,
    "height" : 1154,
    "imageURL" : "http://photosync.herokuapp.com/photos/1a55f933e8"
    },
    {
    "id" : "146be11fbf",
    "time" : 1345130185274,
    "width" : 877,
    "height" : 926,
    "imageURL" : "http://photosync.herokuapp.com/photos/146be11fbf"
    }
  ]
}
```
分组后每一天是一个独立的数组，它的键值是这一天日期的
`"YYYY-MM-DD"` 格式字符串。例如说 `1345168843044` 对应的日期格式字
符串是 `"2012-08-17"`。  
在分组的时候，可以不考虑时区，即使用客户端JavaScript 环境所采用的
时区。
###第二步
从 http://photo-sync.herokuapp.com/photos 获取照片数据，利用第一步的函数对JSON 中的 `photos` 数组进行按日期分组，然后按照以下的方式显示出来：
