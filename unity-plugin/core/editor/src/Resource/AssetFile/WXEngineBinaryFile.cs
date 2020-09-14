namespace WeChat
{
    internal abstract class WXEngineBinaryFile : WXAssetFile
    {
        public WXEngineBinaryFile(string unityAssetPath) : base(unityAssetPath) { }

        protected override bool DoExport()
        {
             ExportStore.AddBinaryFile(
                GetExportPath(),
                GetContent(),
                GetHash()
            );

            return true;
        }

        protected abstract byte[] GetContent();
    }
}