/**
 * 操作重复数组,获取数组重复/未重复/去重复的元素(会破坏已有排序)
 * @param {Array} array 源数组 
 * @param {Number} type 默认为0 0返回去重复数组 1返回重复数组 2返回未重复数组
 * @param {Objecy} object 针对数组中对象重复判断
 - {
 -   key: "num", //字段key
 -   flag: false //默认false true返回对象  false返回对应key的value 
 - }
 * @returns {Array} 返回数组
 */
function operRepeatArray(array, type, object) {
  let repeat = [],//重复
    noRepeat = [],//未重复
    len = array.length,
    key = !!object ? object.key : null,
    flag = !!object ? object.flag : null;
  type = type!=null ? type : 0;
  if (!Array.isArray(array)) {
    return [];
  }
  if (array.length<=1) {
    return array;
  }
  if (key == null) {
    // 排序后数组才能左右做比较
    let tempArr = array.concat().sort();
    tempArr.forEach(function(ele,index,arr){
      let a = arr[index],
        b = arr[index>=len-1 ? index : index+1];
      if (a == b && repeat.indexOf(a) === -1) {
        repeat.push(a);
      }
      if (repeat.indexOf(a) === -1) {
        noRepeat.push(a);
      }
      if (index == len-1) {
        if (repeat.indexOf(b) === -1) {
          noRepeat.push(b);
        }
      }
    })
  } else {
    let tempArr = array.concat().sort(function (a, b) {
      if (typeof a[key] == "number") {
        return a[key] - b[key]
      } else {
        return a[key].localeCompare(b[key])
      }
    });
    tempArr.forEach(function (ele, index, arr) {
      let a = arr[index],
        b = arr[index>=len-1 ? index : index+1];
      if(!flag){
        if (a[key] == b[key] && repeat.indexOf(a[key]) === -1) {
          repeat.push(a[key]);
        }
        if (repeat.indexOf(a[key]) === -1) {
          noRepeat.push(a[key]);
        }
        if (index==len-1) {
          if (repeat.indexOf(b[key]) === -1) {
            noRepeat.push(b[key]);
          }
        }
      } else {
        let keyArr = [];//key值数组
        if (a[key] == b[key] && repeat.indexOf(a[key]) === -1) {
          repeat.push(a);
          repeat.push(b);
          keyArr = repeat.map(function (ele){
            return ele[key]
          })
        }
        if (keyArr.indexOf(a[key]) === -1) {
          noRepeat.push(a);
        }
        if (index==len-1) {
          if (keyArr.indexOf(b[key]) === -1) {
            noRepeat.push(b);
          }
        }
      }
    });
  }
  switch (type) {
    case 0:
      return JSON.stringify(repeat.concat(noRepeat));
    case 1:
      return repeat;
    case 2:
      return noRepeat;
    default:
      return []
  }
}
// console.log(operRepeatArray(["ab","ad","ab","ad","ab","ad","ac","ae","ac","ae","ac","ae"],0))
// console.log(operRepeatArray([1,2,3,2,3,2,3,4,5,4,5,4,5],0))
// console.log(operRepeatArray(["ab","ad","ab","ad","ab","ad","ac","ae","ac","ae","ac","ae",1,2,3,2,3,2,3,4,5,4,5,4,5],0))
// console.log(JSON.stringify(operRepeatArray([
//   {
//     num: "bbbccb6d-2a03-4085-b71c-3ae54a0f7b7a",
//     state: false
//   },
//   {
//     num: "9cde25d3-f9ce-49e2-8452-7230cd4dbe30",
//     state: true
//   },
//   {
//     num: "9cde25d3-f9ce-49e2-845e-7ee0cd4dbe30",
//     state: true
//   },
//   {
//     num: "60136470-f88b-47ed-b7f1-bce06404c7a3",
//     state: true
//   },
//   {
//     num: "9cde25d3-f9ce-49e2-8452-7230cd4dbe30",
//     state: false
//   },
//   {
//     num: "9cde25d3-f9ce-49e2-845e-7ee0cd4dbe30",
//     state: true
//   }
// ],0,{
//   key: "num",
//   flag: false
// })))

/**
 * 高性能数组去重(不会破坏已有排序,未重复取第一个位置)
 * @param {Array} array 源数组 
 * 
 * @returns {Array} 返回数组
 */
function distinct(array) {
  let result = [],
      obj = {};//利用对象属性不重复
  for (let i of array) {
      if (!obj[i]) {
          result.push(i);
          obj[i] = 1;
      }
  }
  return result
}

/**
 * 去除数组指定元素
 * @param {Array} arr 源数组
 * @param {Array} removeArr 删除数组
 * @param {String} key 针对对象字段去除数组
 * 
 * @returns {Array} 返回数组
 */
function removeItem(arr,removeArr,key) {
  for (var i = 0; i < arr.length; i++) {
    if (key==null ? removeArr.indexOf(arr[i]) != -1 : removeArr.indexOf(arr[i][key]) != -1) {
      arr.splice(i, 1);
      i--;
    }
  }
  return arr
}
// console.log(removeItem([3, 7, 11, 0, 0, 0, 3, 0, 55],[0,55]))
// console.log(removeItem([{
//   id: "1"
// },{
//   id: "2"
// },{
//   id: "3"
// }],["1","3"],"id"))
module.exports =  {
  operRepeatArray,
  distinct,
  removeItem
}