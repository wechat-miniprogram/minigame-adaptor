using System;
using UnityEngine;
namespace WeChat {
    public static class wxAttributeUtil {
        public static T GetAttribute<T> (System.Type t) where T : Attribute {
            object[] attrs = t.GetCustomAttributes (typeof (T), true);
            if (attrs.Length == 0) {
                return null;
            } else {
                return (attrs[0] as T);
            }
        }
    }
}