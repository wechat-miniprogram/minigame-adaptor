/*! *****************************************************************************
Copyright (c) 2018 Tencent, Inc. All rights reserved.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
***************************************************************************** */

declare namespace wx {
  interface AccessFailCallbackResult {
    /** 错误信息
     *
     * 可选值：
     * - 'fail no such file or directory ${path}': 文件/目录不存在; */
    errMsg: string;
  }
  interface AccessOption {
    /** 要判断是否存在的文件/目录路径 */
    path: string;
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?: AccessCompleteCallback;
    /** 接口调用失败的回调函数 */
    fail?: AccessFailCallback;
    /** 接口调用成功的回调函数 */
    success?: AccessSuccessCallback;
  }
  /** 帐号信息 */
  interface AccountInfo {
    /** 小程序帐号信息 */
    miniProgram: MiniProgram;
    /** 插件帐号信息（仅在插件中调用时包含这一�