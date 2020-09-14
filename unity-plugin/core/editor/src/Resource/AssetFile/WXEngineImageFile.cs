namespace WeChat
{
    internal abstract class WXEngineImageFile : WXAssetFile
    {
        public WXEngineImageFile(string unityAssetPath) : base(unityAssetPath) { }

        protected override bool DoExport()
        {
             ExportStore.AddImageFile(
                GetExportPath(),
                GetContent(),
                GetHash()
            );

            return true;
        }

        protected abstract byte[] GetContent();
    }
}