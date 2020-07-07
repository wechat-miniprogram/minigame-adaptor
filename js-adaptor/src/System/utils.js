let systemInfo = null

export function getWxSystemInfo() {
  if (!systemInfo) {
    systemInfo = wx.getSystemInfoSync()
  }
  return systemInfo
}