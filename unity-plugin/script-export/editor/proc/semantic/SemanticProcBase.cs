
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using Microsoft.Ajax.Utilities;
using Microsoft.CodeAnalysis;
using UnityEditor;
using UnityEngine;

namespace WeChat {
    
    public interface ISemanticProc {
        void Process();
    }

    public abstract class SemanticProcBase : ISemanticProc {

        public Compilation BuildDLL() {
            //  Config.Reset();
             Debug.Log("Loading Config...");
            //  var config = Config.Get();
            var config = ConfigManager.configEntry.projectExportConfig;
             Debug.Log("Building Assembly...");
             return BuildDLL(config);
        }

        public void Process() {
            // Config.Reset();
            Debug.Log("Loading Config...");
            // var config = Config.Get();
            var config = ConfigManager.configEntry.projectExportConfig;
            EditorUtility.DisplayProgressBar("Analyzing Usage", "Project Building...", 0.1f);
            try {
                OnStart(config);
                // Compile to Assembly
                Debug.Log("Building Assembly...");
                var compilation = BuildDLL(config);
                EditorUtility.DisplayProgressBar("Analyzing Usage", "Assembly Analyzing...", 0.5f);
                Debug.Log("Analyze SemanticModel...");
                // Analyze Semantic
                var semanticModels = compilation.SemanticModels().ToList();
                OnProcess(semanticModels);
                OnEnd();
            }
            catch (Exception e) {
                Debug.LogError(e);
            }
            finally {
                Debug.Log("Analyze Usage finish"); EditorUtility.ClearProgressBar();
            }
        }

        public void OnStart(ProjectExportConfig config) {
            
        }

        public void OnEnd(Exception exp = null) {
            
        }

        public abstract void OnProcess(List<SemanticModel> semanticModels);
        
        private static Compilation BuildDLL(ProjectExportConfig config) {
            // var sources = config.project.AllSources().ToList();
            // var references = config.project.AllReferences().ToList();
            var sources = ProjectExportUtil.GetProjectSourcesWithoutExcludes(config);
            var excludes = new List<string>();
            excludes.Add("**/*~/**/*.dll");
            excludes.Add("**/[Ee]ditor/**/*.dll");
            excludes.Add("**/script-export/**/*.dll");
            var references = ProjectExportUtil.GetProjectLibs(config,  excludes);
            references.AddRange(UnityPluginUtil.GetUnityEngineLibs());
            // references.AddRange(DLLProc.SystemDLLPath());
            // references.AddRange(DLLProc.UnityEngineDLLPath());
            // references.AddRange(DLLProc.SystemDLLPath());
            Debug.Log("Building Assembly for sources[" + sources.Count + "], references[" + references.Count + "]");
            return DLLProc.BuildDLL("WAGameUnityProject", 
                   sources, 
                    config.defineMacros,
                    references, true);
        }
    }

    public static class SemanticProcExt {
        public static IEnumerable<SemanticModel> SemanticModels(this Compilation compilation) {
            return from st in compilation.SyntaxTrees select compilation.GetSemanticModel(st, true);
        }
        
        // Search all SyntaxNode
        public static IEnumerable<Pair<T, SemanticModel>> SelectSyntaxNodes<T>(this IEnumerable<SemanticModel> semanticModels) {
            var syntax = semanticModels.SelectMany(sm => {
                var invocationSyntax = sm.SyntaxTree.GetRoot().DescendantNodes().OfType<T>();
                return invocationSyntax.Select(invoke => new Pair<T, SemanticModel>(invoke, sm));
            });
            return syntax;
        }
         
        public static IEnumerable<ISymbol> SelectSymbols<T> (this IEnumerable<SemanticModel> semanticModels) where T : SyntaxNode {
            // Search all SyntaxNode
            var syntax = semanticModels.SelectSyntaxNodes<T>();
            // Combine with Semantic, And Get Symbol
            var symbols = syntax.Select(invoke => {
                var semanticModel = invoke.Second;
                var syntaxNode = invoke.First;
                var s = semanticModel.GetRawSymbolInfo(syntaxNode);
                if (s == null) {
                    Debug.Log("[Warning] some invocation missed");
                }
                return s;
            }).ToList();
            
            return symbols;
        }

        public static ISymbol GetRawSymbolInfo(this SemanticModel sm, SyntaxNode node) {
            return sm.GetSymbolInfo(node).Symbol ?? sm.GetDeclaredSymbol(node);
        }
    }
}