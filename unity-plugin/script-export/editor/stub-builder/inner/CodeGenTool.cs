
using System;
using System.Text;
using System.Collections;
using System.Collections.Generic;

namespace jsb
{
    public class args
    {
        public args() { sb = new StringBuilder(); lst = new List<string>(); }
        StringBuilder sb;
        List<string> lst;
        public args Add(string s)
        {
            lst.Add(s);
            return this;
        }
        public args Add(params object[] objs)
        {
            for (int i = 0; i < objs.Length; i++)
            {
                sb.Remove(0, sb.Length); 
                sb.AppendFormat("{0}", objs[i]);
                this.Add(sb.ToString());
            }
            return this;
        }
        public int Count { get{return lst.Count;} }
        public args AddFormat(string format, params object[] objs)
        {
            sb.Remove(0, sb.Length);            
            sb.AppendFormat(format, objs);
            lst.Add(sb.ToString());
            return this;
        }
        public args Clear()
        {
            sb.Remove(0, sb.Length);
            lst.Clear();
            return this;
        }
        public enum ArgsFormat { 
            OnlyList, // a, b, c
            Call, // (a, b, c)
            Indexer, // [a, b, c]
            Brace, // {a, b, c}
            NewObjArr,// new object[] {a, b, c}
            GenericT, // <a, b, c>
            Flag,// a | b | c
            Space, // a b c
            Return,
        }
        public string Format(ArgsFormat fmt)
        {
            sb.Remove(0, sb.Length);
            
            switch (fmt)
            {
                case ArgsFormat.Call:
                    sb.Append("(");
                    break;
                case ArgsFormat.Indexer:
                    sb.Append("[");
                    break;
                case ArgsFormat.NewObjArr:
                    sb.Append("new object[] {");
                    break;
                case ArgsFormat.Brace:
                    sb.Append("{");
                    break;
                case ArgsFormat.GenericT:
                    sb.Append("<");
                    break;
                default:
                    break;
            }
            for (int i = 0; i < lst.Count; i++)
            {
                sb.Append(lst[i]);
                if (i != lst.Count - 1)
                {
                    if (fmt == ArgsFormat.Flag)
                        sb.Append(" | ");
                    else if (fmt == ArgsFormat.Space)
                        sb.Append(" ");
                    else if (fmt == ArgsFormat.Return)
                        sb.Append("\n");
                    else
                        sb.Append(", ");
                }
            }
            switch (fmt)
            {
                case ArgsFormat.Call:
                    sb.Append(")");
                    break;
                case ArgsFormat.Indexer:
                    sb.Append("]");
                    break;
                case ArgsFormat.NewObjArr:
                    sb.Append("}");
                    break;
                case ArgsFormat.Brace:
                    sb.Append("}");
                    break;
                case ArgsFormat.GenericT:
                    sb.Append(">");
                    break;
                default:
                    break;
            }
            return sb.ToString();
        }
        public override string ToString()
        {
            return this.Format(ArgsFormat.OnlyList);
        }
    }
    
    public class autotab
    {
        public static string Format(string str, int tab)
        {
            return "";
        }
    }
    
    public enum MemberType { 
        CONSTRUCTOR,
        FIELD,
        PROPERTY,
        METHOD,
    }
    
    //     public class GenClassProcess
    //     {
    //         public static MemberType memberType = MemberType.CONSTRUCTOR;
    //         public static bool isStatic = false;
    // 
    //         public void setFunctionName(string name) { 
    // 
    //         }
    // 
    //         public void setFunctionParamsCount(int needCount, int allCount) {
    //             functionBodies = new FunctionBodyProcess[allCount - needCount + 1];
    //             this.needParamCount = needCount;
    //             this.allParamCount = allCount;
    //         }
    //         int needParamCount, allParamCount;
    //         FunctionBodyProcess[] functionBodies = null;
    //         FunctionBodyProcess functionBody { get { return functionBodies[0]; } }
    //     }
    public class FunctionBodyProcess
    {
        public StringBuilder sbPrepareMethod = new StringBuilder();
        
        public StringBuilder sbCallParams = new StringBuilder();
    }
}