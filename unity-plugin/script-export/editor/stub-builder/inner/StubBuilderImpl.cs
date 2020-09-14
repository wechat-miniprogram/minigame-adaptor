using System.Collections.Generic;
using System.Collections.Immutable;
using System.IO;
using System;
using System.Linq;
using ICSharpCode.NRefactory.MonoCSharp;
using jsb;
using UnityEngine;

namespace WeChat
{
    public class StubBuilderImpl : StubBuilder
    {
        protected override void BuildIntern(StubOptions options)
        {

            var black = JSBindingSettings.LoadBridgeDefinedTypes(false);
            foreach (var t in options.blackList)
            {
                black.Add(t.FullName);
            }
            // var a = typeof(UnityEngine.Object).Assembly;
            // var b = typeof(UnityEditor.EditorWindow).Assembly;
            // var set = new HashSet<string> {
            //     "UnityEngine",
            //     "UnityEditor",
            //     "UnityEngine.AI",
            //     "UnityEngine.Profiling",
            //     // "UnityEngine.Serialization",
            //     "UnityEngine.EventSystems",
            //     "UnityEngine.SceneManagement",
            //     "UnityEngine.Networking",
            //     "UnityEngine.Events",
            //     "UnityEngine.UI"
            // };

            // var bl = new HashSet<string> {
            //     "UnityEngine.Experimental"
            // };
            
            // var all = a.GetTypes().Concat(b.GetTypes()).Where(
            //     t => t.IsClass &&
            //          t.IsPublic).ToArray();
            // foreach(var z in all) {
            //     Debug.Log(z.Namespace);
            // }
            // JSBindingSettings.classes = all;

            JSBindingSettings.classes = options.whiteList.ToArray();
            JSBindingSettings.CswFilePath = options.outputPath;
            var dir = Path.GetDirectoryName(options.outputPath);
            if (!Directory.Exists(dir)) {
                Directory.CreateDirectory(dir);
            }
            // Debug.Log(JSBindingSettings.CswFilePath);
            CSWrapGenerator.stubName = options.stubName;
            CSWrapGenerator.namespaceInterceptor = options.namespaceInterceptor;
            CSWrapGenerator.GenWraps(JSBindingSettings.classes, black, options.filter);

            // clear it
            CSWrapGenerator.stubName = "";
            CSWrapGenerator.namespaceInterceptor = null;
        }
    }
}