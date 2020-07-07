/**
 * xml经过doT.js编译出的模板函数
 * 因为小游戏不支持new Function，模板函数只能外部编译
 * 可直接拷贝本函数到小游戏中使用
 */
export default function anonymous(it) {
  var out = '<view class="container" id="main"> <view class="oneUser"> <image class="avatar" src="' + (it.user.avatarUrl) + '"></image> <text class="userName" value="' + (it.user.nickname) + '"></text> <text class="userScore" value="' + (it.user.score) + '"></text> </view></view>';
  return out;
}