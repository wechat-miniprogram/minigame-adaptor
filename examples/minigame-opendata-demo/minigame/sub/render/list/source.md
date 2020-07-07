<view class="container" id="main">
  <view class="rankList">
        <scrollview class="list">
            {{~it.data :item:index}}
                {{? index % 2 === 1 }}
                <view class="listItem listItemOld">
                {{?}}
                {{? index % 2 === 0 }}
                <view class="listItem">
                {{?}}
                    <text class="listItemNum" value="{{= index + 1}}"></text>
                    <image class="listHeadImg" src="{{= item.avatarUrl }}"></image>
                  <text class="listItemName" value="{{= item.nickname}}"></text>
                  <text class="listItemScore" value="{{= item.score}}"></text>
                  <text class="listScoreUnit" value="分"></text>
                </view>
            {{~}}
        </scrollview>
        <text class="listTips" value="仅展示前50位好友排名"></text>
    </view>
</view>
 
 window.styleValue = {
    container: {
        width: 960,
        height: 1300,
        borderRadius: 12,
    },

    rankList: {
        width: 960,
        height: 1200,
      	backgroundColor: '#ffffff',
    },

    list: {
        width          : 960,
        height         : 1200,
      	backgroundColor: '#ffffff',
    },

    listItem: {
        backgroundColor: '#F7F7F7',
        width: 960,
        height: 150,
        flexDirection: 'row',
        alignItems: 'center',
    },

    listItemOld: {
       backgroundColor: '#ffffff',
    },

    listItemNum: {
        fontSize: 50,
        fontWeight: 'bold',
      	
        color: '#452E27',
        lineHeight: 150,
        height: 150,
        textAlign: 'center',
        width: 120,
    },

    listHeadImg: {
        borderRadius: 6,
        width: 90,
        height: 90,
    },

    listItemScore: {
        fontSize: 48,
        fontWeight: 'bold',
        marginLeft : 10,
        height: 150,
        lineHeight: 150,
        width: 300,
        textAlign: 'right',
    },

    listItemName:{
        fontSize: 36,
        height: 150,
        lineHeight: 150,
        width: 350,
        marginLeft: 30,
    },

    listScoreUnit: {
        opacity: 0.5,
        color: '#000000',
        fontSize: 30,
        height: 150,
        lineHeight: 150,
        marginLeft: 8,
    },

  	listTips: {
      	width: 960,
        height: 100,
      	lineHeight: 90,
      	textAlign: 'center',
      	fontSize: 30,
      	color: 'rgba(0,0,0,0.5)',
      	backgroundColor: '#ffffff',
    }
}
