using System;
using System.Collections.Generic;

namespace WeChat
{

    public class StubOptions
    {

        public string stubName = "";
        public string outputPath = "";

        public Func<Type, string> namespaceInterceptor = null;

        public IEnumerable<Type> whiteList = new List<Type>();

        public IEnumerable<Type> blackList = new List<Type>();
        
        public Func<Type, bool> filter = (t) => true;

        public IEnumerable<Type> ignoreList = new List<Type>();

        public void Check()
        {
            if (string.IsNullOrEmpty(outputPath))
            {
                throw new Exception("[Stub] No Output Path");
            }
        }
    }

    public abstract class StubBuilder
    {
        private static readonly StubBuilder Impl = new StubBuilderImpl();
        public static void Build(StubOptions options)
        {
            Impl.BuildIntern(options);
        }

        protected abstract void BuildIntern(StubOptions options);
    }
}