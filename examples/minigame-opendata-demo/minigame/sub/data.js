function getCurrTime() {
    return parseInt(+new Date() / 1000);
}

function none() {}


export function getDataFromSource(item) {
    let source;

    try {
        source = JSON.parse(item.KVDataList[0].value);
    } catch(e) {
        console.log(e)
        source = {
            "wxgame":{
                "score"      : 0,
                "update_time": getCurrTime()
            }
        }
    }

    return Object.assign(item, source.wxgame)
}

/**
 * 获取好友排行榜列表
 */
export function getFriendData(key, callback = none) {
    wx.getFriendCloudStorage({
        keyList: [key],
        success: res => {

            res.data = res.data.filter( item => item.KVDataList.length );

            let data = res.data.map( item => {
                let { rankScore, update_time } = getDataFromSource(item);
                item.update_time = update_time;

                return item;
            });

            for ( let i = 0; i < data.length; i++ ) {
                data[i].rank = i + 1;
            }

            callback(data);
        }
    });
}

/**
 * 拉取用户当前的分数记录，如果当前分数大于历史最高分数，执行上报
 */
export function setUserRecord(key, userData, startTime) {
    let rankScore = userData.rankScore;

    if ( rankScore === undefined || rankScore === null ) {
        return;
    }

    let time   = getCurrTime();
    let record = 0;
    let last_update_time = getCurrTime();

    wx.getUserCloudStorage({
        keyList: [key],
        success: data => {
            // 查找个人的最高历史记录
            if ( data.KVDataList.length > 0 ) {
                let { rankScore, update_time} = getDataFromSource(data);
                record           = rankScore;
                last_update_time = update_time;
            }

            if ( rankScore > record || last_update_time < startTime ) {
                wx.setUserCloudStorage({
                    KVDataList: [
                        {   key  : key,
                            value: JSON.stringify({
                                wxgame: {
                                    rankScore,
                                    update_time: time,
                                }
                            })
                        },
                    ],
                    success: console.log
                });
            }
        }
    });
}

