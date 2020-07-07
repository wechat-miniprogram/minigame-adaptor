/*! *****************************************************************************
Copyright (c) 2018 Tencent, Inc. All rights reserved.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
***************************************************************************** */

declare namespace App {
  interface ILaunchOptions {
    query: number
  }

  interface IReferrerInfo {
    /** 来源小程序或公众号或App的 appId
     *
     * 以下场景支持返回 referrerInfo.appId：
     * - 1020（公众号 profile 页相关小程序列表）： appId
     * - 1035（公众号自定义菜单）：来源公众号 appId
     * - 1036（App 分享消息卡片）：来源应用 appId
     * - 1037（小程序打开小程序）：来源小程序 appId
     * - 1038（从另一个小程序返回）：来源小程序 appId
     * - 1043（公众号模板消息）：来源公众号 appId
     */
    appId: string
    /** 来源小程序传过来的数据，scene=1037或1038时支持 */
    extraData?: any
  }

  type SceneValues = 1001
 