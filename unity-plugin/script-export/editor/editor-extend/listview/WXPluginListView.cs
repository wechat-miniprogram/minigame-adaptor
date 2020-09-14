using UnityEngine;
using System.Collections.Generic;
using UnityEditor;
using System;
using System.IO;
using System.Linq;
using UnityEditorInternal;

namespace WeChat{
    internal class PluginListView : EditorWindow {
        protected List<string> m_MsgList;

        private HashSet<string> addedPlugin;

        protected ListViewState m_ListView;
        protected bool m_Focus;

        public Action<UnityPlugin> onAddCallback;

        protected class Styles {
            public readonly GUIStyle listItem = new GUIStyle("PR Label");
            public readonly GUIStyle listItemBackground = new GUIStyle("CN EntryBackOdd");
            public readonly GUIStyle listItemBackground2 = new GUIStyle("CN EntryBackEven");

            public GUIStyle listItemBackgroundFinish = new GUIStyle("ColorPickerBox");
            public readonly GUIStyle listBackgroundStyle = new GUIStyle("CN Box");
            public Styles() {
                Texture2D background = this.listItem.hover.background;
                // 开启即失去焦点时，也显示蓝色
                //this.listItem.onNormal.background = background;
                this.listItem.onActive.background = background;
                this.listItem.onFocused.background = background;
            }
        }
        protected static Styles s_Styles;

        // [MenuItem("test/test")]
        public static void Init() {
            GetWindow(typeof(PluginListView));
        }

        public PluginListView() {
            m_ListView = new ListViewState();
            m_MsgList = new List<string>();
            addedPlugin = new HashSet<string>();
        }

        public void IterateAllDirectories() {
            if (m_MsgList != null && m_MsgList.Count > 0) {
                return;
            }
            var dirs = Directory.EnumerateDirectories(
                Application.dataPath, "*", SearchOption.AllDirectories)
                .Select(dir => {
                    return dir.PathToAssets();
                })
                .Where(dir => { 
                    if (dir.Contains("unity-export") ||
                        dir.Contains("WeChatMiniGame")  ||
                        dir.EndsWith("~")) {
                            return false;
                        }
                    return true;
                });
            
            m_MsgList.Add("空白模板");

            if (ConfigManager.configEntry.unityPluginConfig == null || ConfigManager.configEntry.unityPluginConfig.unityPlugins == null) {
                m_MsgList.AddRange(dirs);
            } else {
                m_MsgList.AddRange(dirs.Except(
                    ConfigManager.configEntry.unityPluginConfig.unityPlugins
                    .Select(p => {
                        // Debug.Log(p.pluginPath.pluginRoot.PathAtAssets());
                        return p.pluginPath.pluginRoot.PathAtAssets();
                    })
                ));
            }
        }

        private void OnGUI() {
            if (s_Styles == null) {
                s_Styles = new Styles();
            }
            m_ListView.totalRows = m_MsgList.Count;

            Event current = Event.current;
            EditorGUILayout.BeginVertical();
            GUIContent textContent = new GUIContent();
            var list = ListViewGUI.ListView(m_ListView, s_Styles.listBackgroundStyle).GetEnumerator();
            while (list.MoveNext()) {
                var el = (ListViewElement)list.Current;
                var idx = el.row;
                var path = m_MsgList[idx];
                var name = "";
                bool template = false;
                if (path == "空白模板") {
                    template = true;
                } else if(Application.platform == RuntimePlatform.WindowsEditor) {
                    name = path.Substring(path.LastIndexOf("\\") + 1);
                } else {
                    name = path.Substring(path.LastIndexOf("/") + 1);
                }

                if (current.type == EventType.MouseDown && current.button == 0 && el.position.Contains(current.mousePosition) && current.clickCount == 2) {

                    if (addedPlugin.Contains(path)) {
                        Debug.Log("已被添加");
                    } else {
                        UnityPlugin p;
                        if (template) {
                            Debug.Log("创建空白插件配置");
                            // create random name
                            var time = DateTime.Now.ToFileTimeUtc().ToString();
                            p = UnityPluginUtil.CreatePlugin(null, "Template_" + time);
                        } else {
                            addedPlugin.Add(path);
                            Debug.Log("第" + idx + "项插件: " + name);
                            var pluginRoot = AssetDatabase.LoadMainAssetAtPath(path.PathToAssets());
                            p = UnityPluginUtil.CreatePlugin(pluginRoot, name);
                        }

                        Selection.activeObject = p;
                        onAddCallback(p);
                    }

                }

                if (current.type == EventType.Repaint) {
                    textContent.text = GetRowText(el);

                    // 交替显示不同背景色
                    GUIStyle style;
                    if (addedPlugin.Contains(path)) {
                        style = s_Styles.listItemBackgroundFinish;
                        style.Draw(el.position, false, false, true, false);
                        s_Styles.listItem.Draw(el.position, textContent, false, false, true, m_Focus);
                    } else {
                        style = (el.row%2 != 0) ? s_Styles.listItemBackground2 : s_Styles.listItemBackground;
                        style.Draw(el.position, false, false, m_ListView.row == el.row, false);
                        s_Styles.listItem.Draw(el.position, textContent, false, false, m_ListView.row == el.row, m_Focus);
                    }

                }
            }
            EditorGUILayout.EndVertical();
        }

        protected string GetRowText(ListViewElement el) {
            return m_MsgList[el.row];
        }

        private void OnFocus() {
            m_Focus = true;
        }

        private void OnLostFocus() {
            m_Focus = false;
        }
    }

}
