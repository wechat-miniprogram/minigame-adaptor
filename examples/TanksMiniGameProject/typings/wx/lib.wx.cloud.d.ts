/*! *****************************************************************************
Copyright (c) 2018 Tencent, Inc. All rights reserved. 

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
***************************************************************************** */

/////////////////////
///// WX Cloud Apis
/////////////////////

/**
 * Common interfaces and types
 */

interface IAPIError {
  errMsg: string,
}

interface IAPIParam<T = any> {
  config?: ICloudConfig,
  success?: (res: T) => void,
  fail?: (err: IAPIError) => void,
  complete?: (val: T | IAPIError) => void,
}

interface IAPISuccessParam {
  errMsg: string,
}

type IAPICompleteParam = IAPISuccessParam | IAPIError

type IAPIFunction<T, P extends IAPIParam<T>> = (param: P) => Promise<T> | any

interface IInitCloudConfig {
  env?: string | {
    database?: string,
    functions?: string,
    storage?: string,
  },
  traceUser?: boolean,
}

interface ICloudConfig {
  env?: string,
  traceUser?: boolean,
}

interface IICloudAPI {
  init: (config?