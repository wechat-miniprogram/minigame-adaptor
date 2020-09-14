namespace WeChat
{
    internal abstract class WXEngineJSONFile : WXAssetFile
    {
        public WXEngineJSONFile(string unityAssetPath) : base(unityAssetPath) { }

        protected override bool DoExport()
        {
             ExportStore.AddJSONFile(
                GetExportPath(),
                GetContent(),
                GetHash()
            );

            return true;
        }

        protected abstract JSONObject GetContent();
    }
}