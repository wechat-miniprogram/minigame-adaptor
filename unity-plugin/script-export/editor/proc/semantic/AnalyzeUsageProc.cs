using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization.Json;
using System.Text;
using Microsoft.Ajax.Utilities;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp.Syntax;
// using NUnit.Framework;
using UnityEditor;
using UnityEngine;

namespace WeChat {
    public class AnalyzeUsageProc : SemanticProcBase {
         private class Dictionary {
             private readonly Dictionary<string, Dictionary<string, int>> _map = new Dictionary<string, Dictionary<string, int>>();
 
             public string ToDescString() {
                 var methodCount = _map.Sum(clz => clz.Value.Count);
                 return "Analyzed [" + _map.Count  + "] clazz, and [" + methodCount + "] methods.";
             }
 
             public string ToDetailString() {
                 var sb = new StringBuilder();
                 foreach (var clz in _map) {
                     foreach (var method in clz.Value) {
                         sb.AppendLine(clz.Key + "|" + method.Key + "|" + method.Value);
                     }
                 }
                 return sb.ToString();
             }
 
             public void Add(string clz, string method) {
                 if (!_map.ContainsKey(clz)) {
                     _map[clz] = new Dictionary<string, int>();
                 }
                 if (!_map[clz].ContainsKey(method)) {
                     _map[clz][method] = 0;
                 }
                 _map[clz][method] += 1;
             }
 
             public void Add(ISymbol symbol) {
                 if (symbol == null) {
                     Debug.LogError("Symbol is null");
                     return;
                 }
 
                 if (symbol.ContainingType == null) {
                     return;
                 }
 
                 Add(symbol.ContainingType.ToString(), symbol.Name);
             }
         }
         
        private readonly Dictionary Dict = new Dictionary();
        
        private static void Output(Dictionary dict) {
            FileProc.Output("AnalyzeUsage.txt", dict.ToDetailString());
        }       

        public override void OnProcess(List<SemanticModel> semanticModels) {
            Debug.Log("Analyze SemanticModel... count = " + semanticModels.Count);

            {
                // Find Symbol
                // InvocationExpressionSyntax
                var symbols = new List<ISymbol>();
                {
                    symbols.AddRange(semanticModels.SelectSymbols<MemberAccessExpressionSyntax>());
                    symbols.AddRange(semanticModels.SelectSymbols<InvocationExpressionSyntax>());
                }
                Debug.Log("Analyzing SyntaxNode :" + 0);
                
                var sb = new StringBuilder();
                sb.Append("Analyzing Nothing");
                var i = 0;
                foreach (var it in symbols) {
                    i++;
                    if (it == null) {
                        sb.AppendLine("here is it");
                    } else {
                        sb.AppendLine(it.Name + "|" + it.ContainingType?.Name);
                    }
                }
                Debug.Log("how many symbols " + i);
                FileProc.Output("Test.txt", sb.ToString());
                // Analyze Symbol
                symbols.ForEach(it => Dict.Add(it)); 
            }
                  
            Debug.Log("Analyze SemanticModel, done. " + Dict.ToDescString());
            Debug.Log("Output...");
                  
            EditorUtility.DisplayProgressBar("Analyzing Usage", "Output Analysis...", 0.8f);
            // Output the Symbol
            Output(Dict);
            Debug.Log("Output... done");           
        }
        
        
    }
}