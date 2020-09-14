using System;
using System.IO;
using System.Collections.Generic;
using UnityEngine;
using UnityEditor;
using WeChat;

public static class ExportLogger {

    public static bool LOGGING = false;
    public static bool REALTIME_OUTPUT = false;

    private static readonly string LOG_DIRECTORY_NAME = "Exporter-Logs~";

    public class Log {
        public enum Type {
            Inner,
            Property,
            Transform,
            System,
            Exception
        }

        public Type logType;
        public string info;
        public Exception e;

        public Log(Log.Type type, string info, Exception e = null) {
            this.logType = type;
            this.info = info + "\n";
            this.e = e;
        }

        public override string ToString() {
            var result = "";
            switch (logType) {
                case Type.Inner:
                    result += "===============InnerHandleProperty===============\n"; break;
                case Type.Property:
                    result += "===============PropertyHandler===============\n"; break;
                case Type.Transform:
                    result += "===============Transform===============\n"; break;
                case Type.System:
                    result += "===============System===============\n"; break;
                case Type.Exception:
                    result += "\n\n===============!!!Exception!!!===============\n"; break;
            }

            result += info;
            if (e != null) {
                result += e.Message + "\n";
                result += e.StackTrace;
            }
            return result;
        }
    }

    private static List<Log> logs = new List<Log>();

    public static void AddLog(Log log) {
        if (!LOGGING) return;
        if (REALTIME_OUTPUT) {
            try {
                var dirPath = Path.Combine(Application.dataPath, LOG_DIRECTORY_NAME);
                if (!Directory.Exists(dirPath)) {
                    Directory.CreateDirectory(dirPath);
                }
                var path = Path.Combine(Application.dataPath, LOG_DIRECTORY_NAME, "realtime.txt");

                FileStream fs = new FileStream(path, FileMode.Append, FileAccess.Write);

                wxFileUtil.WriteData(fs, log.ToString());
                fs.Close();
                // Debug.Log("export logs at: " + path);
            } catch (Exception e) {
                Debug.Log("==================!!!Logger Error!!!================\n" + e);
            } finally {
                logs.Clear();
            }
            return;
        }
        logs.Add(log);
    }

    public static void ExportLogs(string filename) {
        if (!LOGGING) return;
        if (REALTIME_OUTPUT) return;
        try {
            var dirPath = Path.Combine(Application.dataPath, LOG_DIRECTORY_NAME);
            if (!Directory.Exists(dirPath)) {
                Directory.CreateDirectory(dirPath);
            }
            var path = Path.Combine(dirPath, filename + ".txt");
            if (File.Exists(path)) {
                File.Delete(path);
            }

            FileStream fs = new FileStream(path, FileMode.Create, FileAccess.Write);

            string result = "";
            foreach (var log in logs) {
                result += log;
            }
            wxFileUtil.WriteData(fs, result);
            fs.Close();
            Debug.Log("export logs at: " + path);
        } catch (Exception e) {
            Debug.LogError("==================!!!Logger Error!!!================\n" + e);
        } finally {
            logs.Clear();
            
        }
    }

    // [MenuItem("WeChat/Utility/Log/Turn on logging")]
    public static void TurnOnLogging() {
        LOGGING = true;
        logs.Clear();
        Debug.Log("logging on");
    }

    // [MenuItem("WeChat/Utility/Log/Turn on realtime output")]
    public static void TurnOnRealtimeOutput() {
        LOGGING = true;
        REALTIME_OUTPUT = true;
        DeleteRealtimeLogFile();
        Debug.Log("realtime output on");
    }

    // [MenuItem("WeChat/Utility/Log/Turn off logging")]
    public static void TurnOffLogging() {
        LOGGING = false;
        REALTIME_OUTPUT = false;
        logs.Clear();
        Debug.Log("logging off");

    }

    // [MenuItem("WeChat/Utility/Log/Turn off realtime output")]
    public static void TurnOffRealtimeOutput() {
        REALTIME_OUTPUT = false;
        Debug.Log("realtime output off");
    }

    // [MenuItem("WeChat/Utility/Log/Clear Logs Directory")]
    public static void ClearLogsDirectory() {
        var path = Path.Combine(Application.dataPath, LOG_DIRECTORY_NAME);
        if (Directory.Exists(path)) {
            Directory.Delete(path, true);
        }
    }

    private static void DeleteRealtimeLogFile() {
        var path = Path.Combine(Application.dataPath, LOG_DIRECTORY_NAME, "realtime.txt");
        if (File.Exists(path)) {
            File.Delete(path);
        }
    }
}