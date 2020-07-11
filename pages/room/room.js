// room/room.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msg:'',
    chatLists:[{
      avatar:' ../img/头像2.jpg ',
      nickname:'芋泥波波',
      msg:'渣渣林是真的帅'
    },{
      avatar:' ../img/头像1.jpg ',
      nickname:'渣渣林',
      msg:'渣渣林确实帅'
    }]
  },

  bindKeyInput :function (e) {
    console.log(e.detail.value);
    this.setData({msg:e.detail.value});
  },
sendMsg:function(){
  let msg=this.data.msg;
  let data={
    avatar:app.globalData.userInfo.avatarUrl,
    nickname:app.globalData.userInfo.nickName,
    msg:msg
  };
  let chatLists=this.data.chatLists;
  chatLists.push(data);
  //修改数据
  this.setData({
    chatLists:chatLists,
    msg:''
  });
  var _this=this;
  //需要对数据进行AI分析
  //将数据发送到服务器
  wx.request({
    url: 'Http://192.168.2.141:7001/chat', //仅为示例，并非真实的接口地址
    data: {//向服务器发请求携带的参数
    msg:msg
    },
    header: {
      'content-type': 'application/json' // 数据类型为json格式
    },
    method:'GET',
    success : function(res) {
      console.log(res)
      //再组装一个加到chatLists里面
      let data={
        avatar:' http://img1.imgtn.bdimg.com/it/u=3630945525,3946344314&fm=26&gp=0.jpg ',
        nickname:'渣渣林',
        msg:res.data.Reply
      };
      let chatLists=_this.data.chatLists;
      chatLists.push(data);
      //修改数据
      _this.setData({
        chatLists:chatLists
      });
    },
    fail:function(err){
      console.log(err)
    }
  })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log( app.globalData);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})