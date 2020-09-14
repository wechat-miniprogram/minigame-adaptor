namespace WeChat
{
    public class WXEngineCopyFile : WXAssetFile
    {
        public override string GetExportPath()
        {
            return unityAssetPath;
        }

        private string fileType;
        public WXEngineCopyFile(string assetPath, string fileType) : base(assetPath)
        {
            this.fileType = fileType;
        }

        protected override bool DoExport()
        {
             ExportStore.AddCopyFile(
                GetExportPath(),
                fileType,
                GetHash()
            );

            return true;
        }
    }
}