using System;

namespace WeChat {

    public abstract class Logger {
        public abstract void Log(string msg);
        public abstract void LogError(Exception e);
    }

    public class LoggerDummy : Logger {
        public override void Log(string msg) {}
        public override void LogError(Exception e) {}
    }

    public static class WDebug {
        private static readonly LoggerDummy Dummy = new LoggerDummy();
        private static Logger _logger;

        public static Logger logger {
            get {
                return _logger ?? Dummy;
            }
            set { 
                _logger = value;
            }
        }

        public static void Log(string msg) {
            logger.Log(msg);
        }

        public static void LogError(Exception e) {
            logger.LogError(e);
        }
    }
}