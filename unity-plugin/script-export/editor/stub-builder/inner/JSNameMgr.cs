using UnityEngine;
//using UnityEditor;
using System;
using System.Text;
using System.Reflection;
using System.Collections.Generic;
using System.Collections;
using System.IO;
using System.Text.RegularExpressions;
namespace jsb
{
	public enum CsNameOption
	{
		Compilable,
		CompilableWithT,
		BridgeTypeToString,
	}
	
	public static class JSNameMgr
	{
		public static Type ValidBaseType(this Type type)
		{
			Type baseType = type.BaseType;
			if (baseType == null ||
			    baseType == typeof(System.ValueType) ||
			    baseType == typeof(System.Object))
			{
				return null;
			}
			return baseType;
		}

		public static Type[] GetValidInterfaces(this Type type)
		{
			Type[] arr = type.GetInterfaces();
			if (arr.Length == 0)
				return arr;
			
			List<Type> lst = new List<Type>();
			lst.AddRange(arr);
			Type t = type;
			while (true)
			{
				Type vBaseType = t.ValidBaseType();
				if (vBaseType == null)
					break;
				
				foreach (var i in vBaseType.GetInterfaces())
					lst.Remove(i);
				
				t = vBaseType;
			}

			return lst.ToArray();
		}

		// 获得一个 type 的继承接口
		// 1. 去掉父类的接口
		// 2. 如果此类继承A接口，A又继承自B接口，在这个类中只要写继承A就可以了
		public static Type[] GetDeclaringInterfaces(this Type type)
		{
			List<Type> lst = new List<Type>();
			lst.AddRange(GetValidInterfaces(type));

			while (true)
			{
				bool c = false;
				foreach (var l in lst.ToArray())
				{
					var a = l.GetInterfaces();
					foreach (var b in a)
					{
						if (lst.Remove(b))
							c = true;
					}
				}
				if (!c)
					break;
			}

			return lst.ToArray();
		}
		
		public static string GetTypeFileName(Type type)
		{
			string fullName = CsFullName(type);
			return fullName.Replace('`', '_').Replace('.', '_').Replace('<', '7').Replace('>', '7').Replace(',', '_');
		}
		
		public static string HandleFunctionName(string functionName)
		{
			return functionName.Replace('<', '7').Replace('>', '7').Replace('`', 'A').Replace('.', '_');
		}
		
		public static string[] GenTSuffix = new string[] { "`1", "`2", "`3", "`4", "`5" };
		public static string[] GenTSuffixReplaceCS = new string[] { "<>", "<,>", "<,,>", "<,,,>", "<,,,,>" };
		public static string[] GenTSuffixReplaceJS = new string[] { "$1", "$2", "$3", "$4", "$5" };
		
		static Dictionary<string, string> typeShortName = null;
		static string shortenName(string fn)
		{
			if (typeShortName == null)
			{
				typeShortName= new Dictionary<string, string>();
				
				typeShortName.Add("System.Boolean", "bool");
				typeShortName.Add("System.Byte", "byte");
				typeShortName.Add("System.SByte", "sbyte");
				typeShortName.Add("System.Int16", "short");
				typeShortName.Add("System.UInt16", "ushort");
				typeShortName.Add("System.Int32", "int");
				typeShortName.Add("System.UInt32", "uint");
				typeShortName.Add("System.Int64", "long");
				typeShortName.Add("System.UInt64", "ulong");
				typeShortName.Add("System.Single", "float");
				typeShortName.Add("System.Double", "double");
				typeShortName.Add("System.String", "string");
				typeShortName.Add("System.Object", "object");
				
				typeShortName.Add("System.Void", "void");
			}
			
			if (typeShortName.ContainsKey(fn))
				return typeShortName[fn];
			
			if (fn.EndsWith("[]"))
			{
				string fn2 = fn.Substring(0, fn.Length - 2);
				if (typeShortName.ContainsKey(fn2))
					return typeShortName[fn2] + "[]";
			}
			
			return fn;
		}
		
		public static string CsFullName(this Type type, CsNameOption opt = CsNameOption.Compilable)
		{
			string fn = CsFullName_Impl(type, opt);
			if (opt == CsNameOption.BridgeTypeToString)
				return fn;
			else
				return shortenName(fn);
		}

		static string _TName(Type T, CsNameOption opt)
		{
			return (opt == CsNameOption.BridgeTypeToString)
				? "``" + T.GenericParameterPosition
					: T.Name;
		}
		static string _ReplacePlus(string name, CsNameOption opt)
		{
			if (opt == CsNameOption.BridgeTypeToString)
				return name;
			else
				return name.Replace('+', '.');
		}

        static Type[] EraseTDefinedByParent(Type type, Type[] Ts)
        {
            int leftCount = Ts.Length;
            Type p = type;
            while (true)
            {
                p = p.DeclaringType;
                if (p == null || !p.IsGenericTypeDefinition)
                    break;
                foreach (var ga in p.GetGenericArguments())
                {
                    for (int i = 0; i < Ts.Length; i++)
                    {
                        if (Ts[i] != null && Ts[i].Name == ga.Name)
                        {
                            Ts[i] = null;
                            leftCount--;
                        }
                    }
                }
            }
            if (leftCount == Ts.Length)
                return Ts;

            Type[] rt = new Type[leftCount];
            int j = 0;
            for (int i = 0; i < Ts.Length; i++)
            {
                if (Ts[i] != null)
                    rt[j++] = Ts[i];
            }
            return rt;
        }

		// 当有一个类 TestGeneric<T>，有可能需要产生下面几种名字
		// 名字形式                  使用环境
		// TestGeneric<>            typeof(TestGeneric<>) 可编译
		// TestGeneric<T>           public class TestGeneric<T>
		// TestGeneric<GameObject>  具体类型时
		// TestGeneric`1            bridge使用
		static string CsFullName_Impl(Type type, CsNameOption opt)
		{

			if (type == null) 
				return "";

			bool with_t = (opt == CsNameOption.CompilableWithT);
			bool bridge = (opt == CsNameOption.BridgeTypeToString);
			
			if (type.IsByRef)
				type = type.GetElementType();

			bool isgp = type.IsGenericParameter;
			bool cgt = type.ContainsGenericParameters;
			bool gt = type.IsGenericType;
			bool gtd = type.IsGenericTypeDefinition;

			if (isgp)
			{  // T
				return _TName(type, opt);
			}
			else if (!cgt && !gt && !gtd)
			{
				string rt = type.FullName;
				return _ReplacePlus(rt, opt);
			}
			else if (gt || gtd)
			{
				string N = string.Empty;
                string PN = "";
// 				if (gtd)
// 				{
// 					N = type.FullName;
// 				}
// 				else
				{
					if (type.IsNested && type.DeclaringType != null)
					{
                        PN = CsFullName_Impl(type.DeclaringType, opt);
                        PN += bridge ? "+" : ".";
					}
					else if (!string.IsNullOrEmpty(type.Namespace))
					{
                        PN = type.Namespace;
                        PN += ".";
					}
					N = type.Name;
				}

				Type[] Ts = type.GetGenericArguments();
				int iOft = N.IndexOf("`" + Ts.Length);

				if (bridge && gtd)
				{
					if (iOft >= 0)
						N = N.Substring(0, iOft);
					
					N += "`" + Ts.Length;
					return _ReplacePlus(N, opt);
				}

				if (gtd && !with_t)
				{
                    for (var i = 0; i < GenTSuffix.Length; i++)
                        N = N.Replace(GenTSuffix[i], GenTSuffixReplaceCS[i]);
				}
				else
                {
                    if (iOft >= 0)
                        N = N.Substring(0, iOft);

                    Ts = EraseTDefinedByParent(type, Ts);
                    if (Ts.Length > 0)
                    {
                        N += bridge ? "[" : "<";
                        for (int i = 0; i < Ts.Length; i++)
                        {
                            if (bridge)
                                N += "[";

                            N += CsFullName_Impl(Ts[i], opt);

                            if (bridge)
                                N += "]";

                            if (i != Ts.Length - 1)
                                N += ",";
                        }
                        N += bridge ? "]" : ">";
                    }
                }

                return _ReplacePlus(PN + N, opt);
            }
            else // contains generic parameter
            {
                if (!type.IsArray)
                    throw new Exception("CsFullName_Impl - Unknown type - " + type.ToString());
                
                string af = "[";
                for (int d = 1; d < type.GetArrayRank(); d++)
                    af += ",";
                af += "]";
                return CsFullName_Impl(type.GetElementType(), opt) + af;
            }
        }

        public static string JsFullName(this Type type)
        {
            if (type == null) return "";
            
            if (type.IsByRef)
                type = type.GetElementType();
            
            if (type.IsGenericParameter)
            {
                return type.Name;
            }
            else if (!type.IsGenericType && !type.IsGenericTypeDefinition)
            {
                string rt = type.FullName;
                if (rt == null)
                {
                    rt = ">>>>>>>>>>>?????????????????/";
                }
                rt = rt.Replace('+', '.');
                return rt;
            }
            else if (type.IsGenericTypeDefinition || type.IsGenericType)
            {
                // ATTENSION
                // typeof(List<>).FullName    == System.Collections.Generic.List`1
                // typeof(List<int>).FullName == Systcem.Collections.Generic.List`1[[System.Int32, mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089]]
                
                // `1 or `2, `3, ...
                //            string rt = string.Empty;
                //            if (type.IsGenericTypeDefinition)
                //                rt = type.FullName;
                //            else
                //                rt = type.GetGenericTypeDefinition().FullName;
                //            rt = rt.Substring(0, rt.Length - 2);
                //            int TCount = type.GetGenericArguments().Length;
                //            rt += "$" + TCount.ToString();
                //return rt;
                
                Type t = type.IsGenericTypeDefinition ? type : type.GetGenericTypeDefinition();
                return t.FullName.Replace('`', '$').Replace('+', '.');
            }
            else
            {
                string fatherName = type.Name.Substring(0, type.Name.Length - 2);
                Type[] ts = type.GetGenericArguments();
                fatherName += "<";
                for (int i = 0; i < ts.Length; i++)
                {
                    fatherName += ts[i].Name;
                    if (i != ts.Length - 1)
						fatherName += ", ";
				}
				fatherName += ">";
				fatherName.Replace('+', '.');
				return fatherName;
			}
		}
	}
}
