import MiniGameAdaptor from '../MiniGameAdaptor.js';
// 具体模块实现
class Debug {
    static Assert(...obj) {
        console.assert(...obj);
    }
    static Log(...obj) {
        console.log(...obj);
    }
    static LogError(...obj) {
        console.error(...obj);
    }
    static LogError$1(...obj) {
        console.error(...obj);
    }
    static LogWarning(...obj) {
        console.warn(...obj)
    }
    static LogFormat(...args) {
        if (args.length == 2) {
            Debug.Log(System.String.format(...args));
        } else if (args.length == 3) {
            Debug.Log(System.String.format(args[0], args[1]));
        } else if (args.length == 5) {
            const logType = args[0]
            let logMethod = 'Log'
            switch (logType) {
                case MiniGameAdaptor.LogType.Log:
                    logMethod = 'Log';
                    break;
                case MiniGameAdaptor.LogType.Error:
                    logMethod = 'LogError';
                    break;
                case MiniGameAdaptor.LogType.Assert:
                    logMethod = 'Log';
                    break;
                case MiniGameAdaptor.LogType.Warning:
                    logMethod = 'LogWarning';
                    break;
                case nityEngine.LogType.Exception:
                    logMethod = 'LogError';
                    break;
            }
            Debug[logMethod](System.String.format(args[3], args[4]))
        } else {
            throw new System.Exception("LogFormat arguments length");
        }
    }
    static Break() {
        debugger;
    }
    // 是否是调试模式
    static get isDebugBuild() {
        return __wxConfig.platform === "devtools"
    }
}
// 将对象挂在到MiniGameAdaptor
MiniGameAdaptor.register('Debug', Debug);

