using System.Collections.Generic;
using System.Text;
using Microsoft.CodeAnalysis;
using WeChat.Analyze.Dependency;

namespace WeChat {
    public class DependenciesProc : SemanticProcBase {

        public void Output(List<Entity> entities) {
            StringBuilder builder = new StringBuilder();
            foreach (var entity in entities) {
                foreach (var child in entity.children) {
                    builder.AppendLine(entity.className + "|" + 
                                       entity.memberName + "|" + 
                                       entity.fileName + "|" + 
                                       child.className + "|" +
                                       child.memberName + "|" + 
                                       child.raw);
                }
            }
            FileProc.Output("Dependencies.txt", builder.ToString());
        }
        
        public override void OnProcess(List<SemanticModel> semanticModels) {
            // all of the sources
            List<Entity> entity = new Parser().Process(semanticModels, null);
            Output(entity);
//            var output = new Processor().ExecuteToString(entity);
//            FileProc.Output("DependenciesAnalyze.txt", output);

            SemanticModel sm;
            //SyntaxTree st;

        }
        

    }
}