<view class="container" id="main">
  	<view class="oneUser">
       <image class="avatar" src="{{=it.user.avatarUrl}}"></image>
        <text class="userName" value="{{=it.user.nickname}}"></text>
        <text class="userScore" value="{{=it.user.score}}"></text>
  </view>
</view>


window.styleValue = {
    container: {
      width: 400,
      height: 400,
      flexDirection: 'row',
      backgroundColor: '#ffffff',
      borderRadius: 15,
    },
  	
  	oneUser: {
      width: 400,
      height: 420,
      alignItems: 'center',
      marginTop: 10,
    },
  	
  	avatar: {
      width: 240,
      height: 240,
      borderRadius: 5,
    },
  
  	userName:{
      width: 400,
      height: 40,
      fontSize: 40,
      marginTop: 20,
      textAlign: 'center',
    
    },
  
  	userScore:{
      width: 400,
      height: 40,
      fontSize: 40,
      marginTop: 20,
      textAlign: 'center',
    
    },
}
