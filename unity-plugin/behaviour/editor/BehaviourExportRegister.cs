using UnityEngine;
using UnityEditor;

namespace WeChat
{
    [InitializeOnLoad]
    class BehaviourExportRegister
    {

        static BehaviourExportRegister()
        {
            WXHierarchyContext.registerComponentConverter("080", IterateBehaviour);
        }

        private static void IterateBehaviour(GameObject go, WXEntity obj, WXHierarchyContext context, ExportPreset preset)
        {
            MonoBehaviour[] behaviours = go.GetComponents<MonoBehaviour>();


            if (behaviours.Length != 0)
            {
                foreach (MonoBehaviour behaviour in behaviours)
                {
                    if (behaviour != null) {
                        obj.components.Add(context.AddComponent(new WXBehaviourConverter(behaviour), behaviour));
                    }
                }
            }
        }
    }
}