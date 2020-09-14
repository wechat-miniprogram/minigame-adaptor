using System.IO;

namespace WeChat {
    public static class FileProc {

        public static void Output(string fileName, string content) {
            var outoutDir = DirectoryBuilder.GetDirectory("dependency")["Output"].FullPath;
            var outputPath = Path.Combine(outoutDir, fileName);
            {
                var info = new DirectoryInfo(outoutDir);
                if (!info.Exists) {
                    info.Create();
                }
            }
            {
                var info = new FileInfo(outputPath);
                if (info.Exists) {
                    info.Delete();
                }
            }
            File.WriteAllText(outputPath, content);
        }

        public static string OutputPath(string fileName) {
            return DirectoryBuilder.GetDirectory("dependency")["Output"].FullPath;
        }
    }
}