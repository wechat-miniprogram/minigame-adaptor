const filePathStoreKey = '@@FilePathMap_'

function getFilePath(path) {
  let filePathMap = {}
  return new Promise((resolve, reject) => {
    wx.getStorage({
      key: filePathStoreKey,
      complete(res) {
        const store = res.data
        if (store) {
          // 本地存在
          filePathMap = store
          const filePath = filePathMap[path]
          if (filePath) {
            resolve(filePath)
          } else {
            // 本地不存在
            reject(filePathMap)
          }
        } else {
          // 本地不存在
          reject(filePathMap)
        }
      }
    })
  })
}

function downloadFile(path) {
  return new Promise((resolve, reject) => {
    wx.downloadFile({
      url: `${engine.settings.baseURL}/${path}`,
      success(res) {
        if (res.statusCode === 200) {
          const tempFilePath = res.tempFilePath
          if (tempFilePath) {
            // 下载成功
            wx.getFileSystemManager().saveFile({
              tempFilePath,
              success(res) {
                const savedFilePath = res.savedFilePath
                resolve(savedFilePath)
              }
            })
          } else {
            // 下载失败
            reject(res)
          }
        } else {
          // 下载失败
          reject(res)
        }
      },
      fail(err) {
        reject(err)
      }
    })
  })
}

function saveFilePath(path, filePath, filePathMap) {
  filePathMap[path] = filePath
  wx.setStorage({
    key: filePathStoreKey,
    data: filePathMap
  })
}

/**
@function getFile 获取远程资源文件保存到本地后的文件路径
@param {String} path 相对 engine.settings.baseURL 的文件路径，需要含后缀。
@param {function} callback 回调函数
*/

/**
@callback getFile 回调函数
@param {Object} res
@param {String} res.errMsg 成功或错误信息，'ok' 为成功，'fail' 为失败
@param {String} res.filePath 接口调用成功时返回资源文件存储到本地后的本地路径
@param {any} res.error 接口调用失败时的错误对象
*/

/**
```js
getFile('Assets/test.txt', (res) => {
  console.log(res.filePath)
})
```
*/

export function getFile(path, callback) {
  getFilePath(path)
    .then(filePath => {
      callback({
        filePath,
        errMsg: 'ok'
      })
    })
    .catch(filePathMap => {
      // 本地不存在则下载文件
      return downloadFile(path)
        .then(filePath => {
          saveFilePath(path, filePath, filePathMap)
          callback({
            filePath,
            errMsg: 'ok'
          })
        })
    })
    .catch(err => {
      // 下载失败
      console.error(path + ' 获取失败', err)
      callback({
        errMsg: 'fail',
        error: err
      })
    })
}
