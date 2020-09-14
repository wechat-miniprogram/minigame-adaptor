namespace WeChat
{
    public abstract class WXEngineTextFile : WXAssetFile
    {
        public WXEngineTextFile(string unityAssetPath) : base(unityAssetPath) { }

        protected override bool DoExport()
        {
             ExportStore.AddTextFile(
                GetExportPath(),
                GetContent(),
                GetHash()
            );

            return true;
        }

        protected abstract string GetContent();
    }
}