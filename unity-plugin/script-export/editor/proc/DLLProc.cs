using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Text;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.Emit;
using UnityEngine;
// using Object = System.Object;
// using System.Text.RegularExpressions;
// using Bridge.Contract.Constants;


namespace WeChat
{
    public class DLLProc
    {
        public static Microsoft.CodeAnalysis.SyntaxTree BuildSyntaxTree(string csFile, List<string> constants = null)
        {
            var parseOptions = new CSharpParseOptions(LanguageVersion.CSharp7_2, DocumentationMode.Parse,
                SourceCodeKind.Regular, constants);
            var syntaxTree = SyntaxFactory.ParseSyntaxTree(File.ReadAllText(csFile), parseOptions, csFile, Encoding.Default);
            return syntaxTree;
        }

        public static IEnumerable<Microsoft.CodeAnalysis.SyntaxTree> BuildSyntaxTree(IEnumerable<string> csFiles,
            List<string> constants = null)
        {
            return csFiles.Select(file => BuildSyntaxTree(file, constants)).ToList();
        }

        public static MetadataReference GetReference(string csFile)
        {
            return MetadataReference.CreateFromFile(csFile, new MetadataReferenceProperties(MetadataImageKind.Assembly,
                ImmutableArray.Create("global")));
        }

        private static IEnumerable<MetadataReference> GetReference(IEnumerable<string> references)
        {
            return references.Select(GetReference).ToList();
        }

        public static EmitResult BuildDLL(string assemblyName, FileStream os, IEnumerable<string> csFiles,
            List<string> constants = null, IEnumerable<string> references = null, bool abortIfError = false) {
            var compilation = BuildDLL(assemblyName, csFiles, constants, references, abortIfError);
            var options = new EmitOptions(false,
                DebugInformationFormat.Embedded, runtimeMetadataVersion: "v4.0.30319");
            var result = compilation.Emit(os, options: options);

            if (abortIfError && !result.Success)
            {
                throw new Exception(GenerateError(assemblyName, result));
            }

            return result;
        }

        public static Compilation BuildDLL(string assemblyName, IEnumerable<string> csFiles,
                                                       List<string> constants = null, IEnumerable<string> references = null, bool abortIfError = false) {
            var refs = GetReference(references);
            // StringBuilder sb = new StringBuilder();
            // foreach (var r in refs) {
            //     sb.Append(r.Display).Append(",");
            // }
            // Debug.Log("refs: " + sb);
             var compilationOptions = new CSharpCompilationOptions(OutputKind.DynamicallyLinkedLibrary);
             var compilation = CSharpCompilation.Create(assemblyName, BuildSyntaxTree(csFiles, constants),
                 refs, compilationOptions);
             if (abortIfError && compilation == null) {
                 throw new Exception("");
             }

             return compilation;
        }

        // public static List<string> UnityEngineDLLPath() {
        //     // var location = typeof(MonoBehaviour).Assembly.Location;
        //     // var directory = Path.GetDirectoryName(location);
        //     // if (directory == null || !location.EndsWith("UnityEngine.CoreModule.dll")) {
        //     //     throw new Exception("UnityEngine.dll not found");
        //     // }
        //     // var dlls = Directory.GetFiles(directory, "*.dll", SearchOption.AllDirectories);
        //     // return dlls.ToList();
        //     var location = typeof(MonoBehaviour).Assembly.Location;
        //     var directory = Path.GetDirectoryName(location);
        //     if (directory == null || !location.EndsWith("UnityEngine.CoreModule.dll")) {
        //         throw new Exception("UnityEngine.dll not found");
        //     }
        //     var dlls = Directory.GetFiles(directory, "*.dll", SearchOption.AllDirectories);

        //     var extension = typeof(UnityEngine.UI.Button).Assembly.Location;
        //     var dir = Path.GetDirectoryName(extension);
        //     var dlls2 = Directory.GetFiles(dir, "*.dll", SearchOption.AllDirectories);
        //    return dlls.Concat(dlls2).ToList();
        // }

        // public static List<string> SystemDLLPath() {
        //     var loc = typeof(object).Assembly.Location;
        //     var index = loc.IndexOf("unityjit/");
        //     var path = loc.Substring(0, index + 9);
        //     // Debug.Log(path);
        //     var dlls = Directory.EnumerateFiles(path, "*.dll", SearchOption.AllDirectories);

        //     return dlls.ToList();
        // }

        private static string GenerateError(string assemblyName, EmitResult result)
        {
            var sb = new StringBuilder("[" + assemblyName + "] C# Compilation Failed");
            sb.AppendLine();

            foreach (var d in result.Diagnostics.Where(d => d.Severity == DiagnosticSeverity.Error))
            {
                var filePath = d.Location?.SourceTree.FilePath ?? "";

                var mapped = d.Location != null ? d.Location.GetMappedLineSpan() : default(FileLinePositionSpan);
                sb.AppendLine(string.Format(CultureInfo.InvariantCulture, "\t{4}({0},{1}): {2}: {3}",
                    mapped.StartLinePosition.Line + 1, mapped.StartLinePosition.Character + 1, d.Id, d.GetMessage(),
                    filePath));
                foreach (var l in d.AdditionalLocations)
                {
                    filePath = l.SourceTree.FilePath ?? "";
                    mapped = l.GetMappedLineSpan();
                    sb.AppendLine(string.Format(CultureInfo.InvariantCulture, "\t{2}({0},{1}): (Related location)",
                        mapped.StartLinePosition.Line + 1, mapped.StartLinePosition.Character + 1, filePath));
                }
            }

            return sb.ToString();
        }
    }
}