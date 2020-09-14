/**
 * @Attribute 用来注册effect的名字，如果没注册的话就显示类名
 * @Author shanexyzhou
 * @Date 2020.1.7
 */
using System;

namespace WeChat {
    [AttributeUsage(AttributeTargets.Class, AllowMultiple = false)]
    public class WXPostProcessEffectNameAttribute : Attribute
    {
        public readonly string effectName;

        public WXPostProcessEffectNameAttribute(string effectName)
        {
            this.effectName = effectName;
        }
    }
}
