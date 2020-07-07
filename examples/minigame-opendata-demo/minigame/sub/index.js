import singleStyle from 'render/single/style.js';
import singleTplFn    from 'render/single/tplfn.js';

import listStyle from 'render/list/style.js';
import listTplFn    from 'render/list/tplfn.js';

// import Layout   from './engine.js'
const Layout = requirePlugin('Layout').default;

import {getFriendData, getDataFromSource} from 'data.js';

let key           = 'rankScore';
let sharedCanvas  = wx.getSharedCanvas();
let sharedContext = sharedCanvas.getContext('2d');

// 兼容没数据的时候mock用户方便演示
const mock = {
    avatarUrl: "https://wx.qlogo.cn/mmopen/vi_32/666ZxTwTYHWy40htkha0AZBiaz5gTAbSibJ9PMzicY0rOGDsjgCvQtVwcgveRxftHf7rCicA17Yk0rg6kNOvY8plBA/132",
    score: "100",
    nickname: "mock user"
}

let requestID;

function showSingleFriend() {
    const start = new Date();
    getFriendData(key, (data) => {
        console.log('openContext getFriendData cost', new Date() - start)
        data = data.map(item => getDataFromSource(item))

        let template = singleTplFn({
            user: data[0] || mock
        });
    
        Layout.clear();
        Layout.init(template, singleStyle);
    
        requestID && cancelAnimationFrame(requestID);

        requestID = requestAnimationFrame(() => {
            Layout.layout(sharedContext);
        });
    
        // 获取用户的头像，处理点击事件，事件能够被正确处理的前提是updateViewPort的信息是正确的
        const users = Layout.getElementsByClassName('avatar')
        users.forEach((item, index) => {
            item.on('click', (e) => {
                console.log("click avatar", index);
            });
        }) 
    });
}

function showFriendList() {
    const start = new Date();
    getFriendData(key, (data) => {
        data = data.map(item => getDataFromSource(item))
        console.log('openContext getFriendData cost', new Date() - start)
        for (let i = data.length; i < 20; i++ ) {
            data.push(mock)
        }
        let template = listTplFn({
            data
        });
    
        Layout.clear();
        Layout.init(template, listStyle);
        
        requestID && cancelAnimationFrame(requestID);

        requestID = requestAnimationFrame(() => {
            Layout.layout(sharedContext);

            console.log(Layout)
        });
    
        // 获取用户的头像，处理点击事件，事件能够被正确处理的前提是updateViewPort的信息是正确的
        const users = Layout.getElementsByClassName('listItem')
        users.forEach((item, index) => {
            item.on('click', (e) => {
                console.log("click item",  data[index]);
            });
        }) 
    });
}

function init() {
    wx.onMessage(data => {
        console.log('onMessage', data);
        if ( data.event === 'showSingleFriend' ) {
            Layout.updateViewPort(data.box);
            showSingleFriend()
            
        } else if ( data.event === 'showFriendList') {
            Layout.updateViewPort(data.box);
            showFriendList()
        }
    });
}

init();
