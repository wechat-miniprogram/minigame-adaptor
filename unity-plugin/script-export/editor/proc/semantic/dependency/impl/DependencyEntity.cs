using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using UnityEngine;

namespace WeChat.Analyze.Dependency {
    
    public class Entity : VirtualEntity {
        public string fileName;
        public List<VirtualEntity> children = new List<VirtualEntity>();
    }

    public class VirtualEntity {
        public string memberName;
        public string className;
        public string raw;
    }


    // 最终节点
    public class Node {
        public string memberName;
        public string className;
        public string fileName;
        public List<Node> related = new List<Node>();
    }

    public class Processor {

        private List<Node> IsDoing = new List<Node>();

        private bool Equals(string a, string b) {
            if (a == b) {
                return true;
            }
            if (a == null || b == null) {
                return false;
            }
            if (a.Equals(b)) {
                return true;
            }
            return false;
        }

        private bool IsRelated(Node memberNode, Entity entity) {
            foreach (var child in entity.children) {
                if (Equals(child.className, memberNode.className) &&
                    Equals(child.memberName, memberNode.memberName)) {
                    return true;
                }
            }
            return false;
        }


        private bool Containes(List<Node> nodes, Node node) {
            foreach (var n in nodes) {
                if (Equals(n.className, node.className) &&
                    Equals(n.memberName, node.memberName)) {
                    return true;
                }
            }
            return false;
        }

        private bool IsDoingNow(Node node) {
            return Containes(IsDoing, node);
        }

        // 从 relations 中找出所有引用了 memberNode 的路径
        private List<Node> ExecuteRecursive(Node memberNode/*被引用的节点*/, List<Entity> relations) {
            if (relations == null || relations.Count == 1) {
                return null;
            }
            
            // 引用路径
            List<Node> result = new List<Node>();
            foreach (var relation in relations) {
                if (!IsRelated(memberNode, relation)) continue;
                var tosearch = new Node {
                    className = relation.className,
                    memberName = relation.memberName,
                    fileName = relation.fileName,
                };
                if (IsDoingNow(tosearch)) {
                    continue;
                }
                IsDoing.Add(tosearch);
                var searched = ExecuteRecursive(tosearch, relations); // 递归搜索
                IsDoing.RemoveAt(IsDoing.Count - 1);
                if (searched != null && searched.Count != 0) {
                    tosearch.related.AddRange(searched);
                }
                result.Add(tosearch);
            }
            return result;
        }

        public List<Node> Execute(List<Entity> relations) {
            if (relations == null || relations.Count == 1) {
                return new List<Node>();
            }

            var result = new List<Node>();

            foreach (var entity in relations) {
                foreach (var child in entity.children) {
                    var toSearch = new Node {
                        className = child.className,
                        memberName = child.memberName,
                    };
                    if (Containes(result, toSearch)) {
                        continue;
                    }
                    IsDoing.Add(toSearch);
                    var searched = ExecuteRecursive(toSearch, relations);
                    IsDoing.RemoveAt(IsDoing.Count - 1);
                    if (searched != null && searched.Count != 0) {
                        toSearch.related.AddRange(searched);
                    }
                    result.Add(toSearch);
                }
            }
            return result;
        }

        public Dictionary<string, List<Node>> ToDict(List<Node> nodes) {
            var result = new Dictionary<string, List<Node>>();
            foreach (var node in nodes) {
//                if (node.className == null || node.className.IsEmpty()) {
//                    throw new Exception("There is a node with empty className.");
//                }
                if (node.className == null) {
                    node.className = "";
                }
                if (!result.ContainsKey(node.className)) {
                    result[node.className] = new List<Node>();
                }
                var clz = result[node.className];
                clz.Add(node);
            }
            return result;
        }


        private int kSearchCount = 20;

        public List<String> ListToString(Node node, bool self) {
            var result = new List<String>();
            var sb = "[" + node.className + "@" + node.memberName + "]";
            var hit = false;
            var currentSearchCount = 0;
            foreach (var r in node.related) {
                var children = ListToString(r, true);
                if (children == null || children.Count == 0) {
                    continue;
                }
                foreach (var child in children) {
                    if (self) {
                        result.Add(sb + " -> " + child);
                    } else {
                        result.Add(child);
                    }
                }
                if (result.Count > kSearchCount) {
                    break;
                }
            }
            if (result.Count == 0) {
                result.Add(sb);
            }
            return result;
        }

        public String ExecuteToString(List<Entity> entities) {
            return ExecuteToString(Execute(entities));
        }

        public String ExecuteToString(List<Node> nodes) {
            var sb = new StringBuilder();
            var dict = ToDict(nodes);
            foreach (var key in dict.Keys) {
                foreach (var node in dict[key]) {
                    sb.AppendLine(node.className + ": " + node.memberName);
                    sb.AppendLine();
                    var childrenList = ListToString(node, false);
                    foreach (var child in childrenList) {
                        sb.AppendLine(child);
                    }
                    sb.AppendLine("-----------------");
                }
            }
            return sb.ToString();
        }
    }

//    public class TreeNode {
//        public string memberName;
//        public string className;
//        public string fileName;
//        public List<TreeNode> children = new List<TreeNode>();
//        public TreeNode parent;
//
//        public static TreeNode ToTreeNode(Entity entity) {
//            var node = new TreeNode {
//                fileName = entity.fileName,
//                memberName = entity.memberName,
//                className = entity.className
//            };
//            return node;
//        }
//
//        public static TreeNode ToTreeNode(VirtualEntity entity) {
//            
//        }
//
//        public static TreeNode AddChild(List<>) {
//            
//        }
//
//
//        public TreeNode Find(TreeNode) {
//            
//        }
//
//        public static TreeNode Parse(List<Entity> entities) {
//            if (entities == null) {
//                return null;
//            }
//            
//            TreeNode root = new TreeNode();
//
//            foreach (var entity in entities) {
//                
//            }
//        }
//    }

    public class Parser {

        public List<Entity> Process(List<SemanticModel> semanticModels, string[] whiteLists) {
            List<Entity> entityList = new List<Entity>();
            foreach (var model in semanticModels) {
                entityList.AddRange(ProcessSemanticModel(model));
            }
            return entityList;
        }

        private static VirtualEntity SymbolToEntity(ISymbol symbol) {
            return new VirtualEntity {
                className = symbol.ContainingType?.ToString(), 
                memberName = symbol.Name
            };
        }
        
        
        private static List<VirtualEntity> ProcessMemberAccessInBody(SyntaxNode node, SemanticModel sm) {
            List<MemberAccessExpressionSyntax> syntaxes = node.DescendantNodes().OfType<MemberAccessExpressionSyntax>().ToList();
            List<VirtualEntity> entities = new List<VirtualEntity>();
            syntaxes.ForEach(it => {
                var s = sm.GetRawSymbolInfo(it);
                if (s == null) {
                    Debug.LogError(node.SyntaxTree.FilePath + ":" + it.Name);
                    return;
                }
                var e = SymbolToEntity(s);
                if (it.Parent is InvocationExpressionSyntax) {
                    e.raw = it.Parent.ToString();
                }
                entities.Add(e);
            });
            return entities;
        }

        private static List<Entity> ProcessSemanticModel(SemanticModel model) {
            var methodDeclarationSyntaxList = model.SyntaxTree.GetRoot().DescendantNodes().OfType<MethodDeclarationSyntax>().ToList();
            var result = new List<Entity>();
            foreach (var methodDeclarationSyntax in methodDeclarationSyntaxList) {
                // here is a symbol
                var symbol = model.GetDeclaredSymbol(methodDeclarationSyntax);
                var children = ProcessMemberAccessInBody(methodDeclarationSyntax, model);
                var entity = new Entity {
                    memberName = symbol.Name,
                    className = symbol.ContainingType?.Name,
                    children = children,
                    fileName = model.SyntaxTree.FilePath,
                };
                result.Add(entity);
            }
            return result;
        }
    }
}