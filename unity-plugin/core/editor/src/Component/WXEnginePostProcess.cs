using UnityEngine;
using System.Collections;

namespace WeChat
{
    public class WXEnginePostProcess : WXComponent
    {
        private readonly WXPostProcess pp;

        public WXEnginePostProcess(WXPostProcess pp)
        {
            this.pp = pp;
        }

        public override string getTypeName()
        {
            return "PostProcess";
        }

        protected override JSONObject ToJSON(WXHierarchyContext context)
        {
            JSONObject m_json = new JSONObject(JSONObject.Type.OBJECT);
            JSONObject m_data = new JSONObject(JSONObject.Type.OBJECT);
            m_json.AddField("type", getTypeName());
            m_json.AddField("data", m_data);

            JSONObject m_effects = new JSONObject(JSONObject.Type.ARRAY);
            m_data.AddField("effects", m_effects);

            var profile = this.pp.profile;
            if (profile != null && profile.settings.Count > 0)
            {
                foreach (var effect in profile.settings) {
                    m_effects.Add(effect.Export());
                }
            }

            return m_json;
        }
    }
}
