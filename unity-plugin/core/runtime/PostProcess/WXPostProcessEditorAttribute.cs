/**
 * @Attribute 由于后处理editor没有继承Editor，所以用这个attr来声明editor,
 * 如果没有声明editor，就会用unity默认的inspector面板
 * @Author shanexyzhou
 * @Date 2020.1.7
 */

using System;

namespace WeChat {
    [AttributeUsage(AttributeTargets.Class, AllowMultiple = false)]
    public class WXPostProcessEditorAttribute : Attribute
    {
        public readonly Type settingsType;

        public WXPostProcessEditorAttribute(Type settingsType)
        {
            this.settingsType = settingsType;
        }
    }
}

