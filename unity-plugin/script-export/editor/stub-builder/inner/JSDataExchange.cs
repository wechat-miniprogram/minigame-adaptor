using System;
using System.Text;
using UnityEngine;
using System.Collections.Generic;
using System.Runtime.InteropServices;
using System.Reflection;
using jsb;


public class JSDataExchangeMgr
{
    const int VALUE_LEN = -1;

    public enum eGetType
    {
        GetARGV,
        GetARGVRefOut,
        GetJSFUNRET,
        Jsval,
    }

    System.Object mTempObj;
    public void setTemp(System.Object obj)
    {
        mTempObj = obj;
    }

    public static Type[] RecursivelyGetGenericParameters(Type type, List<Type> lst = null)
    {
        if (lst == null)
            lst = new List<Type>();

        if (type.ContainsGenericParameters)
        {
            if (type.IsGenericParameter)
            {
                lst.Add(type);
            }
            else if (type.HasElementType)
            {
                RecursivelyGetGenericParameters(type.GetElementType(), lst);
            }
            else if (type.IsGenericType)
            {
                Type[] genericArguments = type.GetGenericArguments();
                for (int i = 0; i < genericArguments.Length; i++)
                {
                    RecursivelyGetGenericParameters(genericArguments[i], lst);
                }
            }
        }
        return lst.ToArray();
    }

    public delegate T DGetV<T>();
    public static T GetJSArg<T>(DGetV<T> del) { return del(); }
}

