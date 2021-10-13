using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using UnityEditor;
using UnityEditor.Animations;
using UnityEngine;

namespace WeChat
{
    class AnimationControllerInfo
    {
        public JSONObject layers = new JSONObject(JSONObject.Type.ARRAY);

        public JSONObject transitions = new JSONObject(JSONObject.Type.ARRAY);

        public SmartDict<AnimatorStateMachine> machines = new SmartDict<AnimatorStateMachine>();

        public SmartDict<AnimatorState> states = new SmartDict<AnimatorState>();

        public SmartDict<BlendTree> blendTrees = new SmartDict<BlendTree>();

        public SmartDict<string> parameters = new SmartDict<string>();

        public SmartDict<AnimationClip> animation = new SmartDict<AnimationClip>();

        // Editor relative data
        public JSONObject statesPositionInfo = new JSONObject(JSONObject.Type.ARRAY);
        public SmartDict<AnimatorStateMachine> stateMachinesPositionInfo = new SmartDict<AnimatorStateMachine>();
    }

    [InitializeOnLoad]
    class WXAnimatorController : WXResource
    {
        static WXAnimatorController()
        {
            resourcesConverters.Add(typeof(AnimatorController), (GameObject go) =>
            {
                return new WXAnimatorController(go.GetComponent<Animator>(), go);
            });
            resourcesConverters.Add(typeof(AnimatorOverrideController), (GameObject go) =>
            {
                return new WXAnimatorController(go.GetComponent<Animator>(), go);
            });
        }
        protected override string GetResourceType()
        {
            return "animatorcontroller";
        }

        public delegate bool BeforeAnimationClipHandler(AnimationClip clip, AnimatorState state, GameObject gameObject);
        public static BeforeAnimationClipHandler handleBeforeAnimationClip = null;

        public static Dictionary<AnimatorControllerParameterType, int> ParameterType = new Dictionary<AnimatorControllerParameterType, int>
    {
        {AnimatorControllerParameterType.Float,1 },
        {AnimatorControllerParameterType.Int,3 },
        {AnimatorControllerParameterType.Bool,4 },
        {AnimatorControllerParameterType.Trigger,9 }
    };

        private AnimationControllerInfo controllerInfo = new AnimationControllerInfo();

        private Animator animator;
        private GameObject gameObject;
        private bool isHuman = false;
        private HumanDescription desc = new HumanDescription();
        public Dictionary<string, string> humanMap = new Dictionary<string, string>();
        private bool curNodeHasLegalChild = false;
        private bool curNodeHasNotLegalChild = false;
        private List<string> dependencies = new List<string>();

        private string originPath;
        private AnimatorController controller = null;
        public WXAnimatorController(Animator animator, GameObject gameObject) : base(null)
        {
            this.gameObject = gameObject;
            this.animator = animator;

            if (gameObject.GetComponent<Animator>().runtimeAnimatorController.GetType() == typeof(AnimatorOverrideController))
            {
                controller = (AnimatorController)((AnimatorOverrideController)gameObject.GetComponent<Animator>().runtimeAnimatorController).runtimeAnimatorController;
                originPath = AssetDatabase.GetAssetPath(gameObject.GetComponent<Animator>().runtimeAnimatorController.GetInstanceID());
            }
            else if (gameObject.GetComponent<Animator>().runtimeAnimatorController.GetType() == typeof(AnimatorController))
            {
                controller = (AnimatorController)gameObject.GetComponent<Animator>().runtimeAnimatorController;
                originPath = AssetDatabase.GetAssetPath(controller.GetInstanceID());
            }
            else
            {
                throw new Exception("Unknown controller type.");
            }
            unityAssetPath = originPath;
            if (unityAssetPath == null || unityAssetPath == "")
            {
                ErrorUtil.ExportErrorReporter.create()
                .setResource(this)
                .setGameObject(gameObject)
                .error(ErrorUtil.ErrorCode.AnimationController_PathError, "animatorController文件的unity路径为空");
            }
        }

        protected override JSONObject ExportResource(ExportPreset preset)
        {
            if ((UnityEngine.Object)controller == (UnityEngine.Object)null)
            {
                Debug.LogWarning("Warning(Code:1002) : " + gameObject.name + "'s Animator Compoment must have a Controller!");
                return null;
            }
            else
            {
                JSONObject controllerJson = new JSONObject(JSONObject.Type.OBJECT);
                // get parameter info
                JSONObject parameter = new JSONObject(JSONObject.Type.ARRAY);
                AnimatorControllerParameter[] PArray = controller.parameters;
                for (int i = 0; i < PArray.Length; i++)
                {
                    AnimatorControllerParameter p = PArray[i];
                    bool alreadyExit = false;
                    var singleP = controllerInfo.parameters.AddObject(p.name, out alreadyExit);
                    if (!alreadyExit)
                    {
                        singleP.Value.AddField("name", p.name);
                        int type;
                        ParameterType.TryGetValue(p.type, out type);
                        singleP.Value.AddField("type", type);
                        if (p.type == AnimatorControllerParameterType.Bool)
                        {
                            singleP.Value.AddField("default", animator.GetBool(p.nameHash));
                        }
                        if (p.type == AnimatorControllerParameterType.Float)
                        {
                            singleP.Value.AddField("default", animator.GetFloat(p.nameHash));
                        }
                        if (p.type == AnimatorControllerParameterType.Int)
                        {
                            singleP.Value.AddField("default", animator.GetInteger(p.nameHash));
                        }
                        if (p.type == AnimatorControllerParameterType.Trigger)
                        {
                            singleP.Value.AddField("default", false);
                        }
                    }
                }

                AnimatorControllerLayer[] layers = controller.layers;
                int num = layers.Length;
                for (int i = 0; i < num; i++)
                {
                    AnimatorControllerLayer layer = layers[i];
                    JSONObject layerJSON = new JSONObject(JSONObject.Type.OBJECT);

                    AnimatorStateMachine machine = layer.stateMachine;
                    TraverseStateMachine(ref machine);
                    layerJSON.AddField("name", layer.name);
                    bool isExist = false;
                    var keyPair = controllerInfo.machines.AddObject(machine, out isExist);
                    int id = keyPair.Key;
                    layerJSON.AddField("stateMachine", id);
                    if (layer.blendingMode == AnimatorLayerBlendingMode.Override)
                    {
                        layerJSON.AddField("blending", 0);
                    }
                    if (layer.blendingMode == AnimatorLayerBlendingMode.Additive)
                    {
                        layerJSON.AddField("blending", 1);
                    }
                    // layerJSON.AddField("IKPass", layer.iKPass);
                    if (i == 0)
                    {
                        layerJSON.AddField("weight", 1);
                    }
                    else
                    {
                        layerJSON.AddField("weight", layer.defaultWeight);
                    }
                    if (layer.avatarMask != null)
                    {
                        WXAvatarMask mask = new WXAvatarMask(layer.avatarMask);
                        string uid = AddDependencies(mask);
                        layerJSON.AddField("mask", uid);
                    }
                    else
                    {
                        layerJSON.AddField("mask", new JSONObject(JSONObject.Type.NULL));
                    }
                    controllerInfo.layers.Add(layerJSON);
                }


                HandleStatesPositionInfo(layers);

                JSONObject editorInfoJson = new JSONObject(JSONObject.Type.OBJECT);
                editorInfoJson.AddField("stateMachines", controllerInfo.stateMachinesPositionInfo.ToJSON());
                editorInfoJson.AddField("states", controllerInfo.statesPositionInfo);

                if (gameObject.GetComponent<Animator>().runtimeAnimatorController.GetType() == typeof(AnimatorOverrideController))
                {
                    controllerJson.AddField("name", ((AnimatorOverrideController)gameObject.GetComponent<Animator>().runtimeAnimatorController).name);
                }
                else if (gameObject.GetComponent<Animator>().runtimeAnimatorController.GetType() == typeof(AnimatorController))
                {
                    controllerJson.AddField("name", ((AnimatorController)gameObject.GetComponent<Animator>().runtimeAnimatorController).name);
                }
                controllerJson.AddField("layers", controllerInfo.layers);
                controllerJson.AddField("stateMachines", controllerInfo.machines.ToJSON());
                controllerJson.AddField("states", controllerInfo.states.ToJSON());
                controllerJson.AddField("transitions", controllerInfo.transitions);
                controllerJson.AddField("blendTrees", controllerInfo.blendTrees.ToJSON());
                controllerJson.AddField("parameters", controllerInfo.parameters.ToJSON());
                controllerJson.AddField("editorInfo", editorInfoJson);
                return controllerJson;
            }
        }

        public override string GetHash()
        {
            return WXUtility.GetMD5FromAssetPath(unityAssetPath);
        }

        public override string GetExportPath()
        {
            return GetExportPathRaw(originPath) + ".animatorcontroller";
        }
        protected string GetExportPathRaw(string unityAssetPath)
        {

            string assetPath = unityAssetPath;
            int index = assetPath.LastIndexOf('.');
            if (index > 0)
            {
                assetPath = assetPath.Substring(0, index);
            }
            return assetPath;
        }

        public void TraverseStateMachine(ref AnimatorStateMachine machine)
        {
            bool machineExist;
            var machineInfo = controllerInfo.machines.AddObject(machine, out machineExist);
            var stateMachinesPositionInfo = controllerInfo.stateMachinesPositionInfo.AddObject(machine, out machineExist);
            if (machineExist)
            {
                return;
            }

            var stateMachinesPositionInfoJSON = stateMachinesPositionInfo.Value;
            stateMachinesPositionInfoJSON.AddField("name", machine.name);

            JSONObject entryPosition = new JSONObject(JSONObject.Type.ARRAY);
            entryPosition.Add(machine.entryPosition.x);
            entryPosition.Add(machine.entryPosition.y);
            stateMachinesPositionInfoJSON.AddField("entryPosition", entryPosition);

            JSONObject exitPosition = new JSONObject(JSONObject.Type.ARRAY);
            exitPosition.Add(machine.exitPosition.x);
            exitPosition.Add(machine.exitPosition.y);
            stateMachinesPositionInfoJSON.AddField("exitPosition", exitPosition);

            JSONObject anyStatePosition = new JSONObject(JSONObject.Type.ARRAY);
            anyStatePosition.Add(machine.anyStatePosition.x);
            anyStatePosition.Add(machine.anyStatePosition.y);
            stateMachinesPositionInfoJSON.AddField("anyStatePosition", anyStatePosition);

            var machineJSON = machineInfo.Value;
            machineJSON.AddField("name", machine.name);
            if (!machine.defaultState)
            {
                machineJSON.AddField("defaultState", new JSONObject(JSONObject.Type.NULL));
            }
            else
            {
                var defaultState = machine.defaultState;
                machineJSON.AddField("defaultState", HandleState(ref defaultState));
            }
            JSONObject anyStateTransitions = new JSONObject(JSONObject.Type.ARRAY);
            for (int i = 0; i < machine.anyStateTransitions.Length; i++)
            {
                AnimatorStateTransition trans = machine.anyStateTransitions[i];
                anyStateTransitions.Add(HandleStateTransition("any", ref trans));
            }
            machineJSON.AddField("anyStateTransitions", anyStateTransitions);

            JSONObject statesJSON = new JSONObject(JSONObject.Type.ARRAY);
            ChildAnimatorState[] states = machine.states;
            for (int i = 0; i < states.Length; i++)
            {
                AnimatorState state = states[i].state;
                statesJSON.Add(HandleState(ref state));
            }
            machineJSON.AddField("states", statesJSON);

            ChildAnimatorStateMachine[] subMachines = machine.stateMachines;
            for (int i = 0; i < subMachines.Length; i++)
            {
                AnimatorStateMachine subMachine = subMachines[i].stateMachine;
                TraverseStateMachine(ref subMachine);
            }
        }

        public int HandleState(ref AnimatorState state)
        {
            bool stateExist;
            var stateInfo = controllerInfo.states.AddObject(state, out stateExist);
            if (!stateExist)
            {
                stateInfo.Value.AddField("name", state.name);
                var stateJSON = stateInfo.Value;
                JSONObject stateTransitions = new JSONObject(JSONObject.Type.ARRAY);
                for (int j = 0; j < state.transitions.Length; j++)
                {
                    AnimatorStateTransition trans = state.transitions[j];
                    stateTransitions.Add(HandleStateTransition(state.name, ref trans));
                }
                stateJSON.AddField("transitions", stateTransitions);

                // animationClip
                Motion motion = state.motion;
                if (motion == null)
                {
                    stateJSON.AddField("motion", new JSONObject(JSONObject.Type.NULL));
                }
                else if (motion.GetType() == typeof(AnimationClip))
                {
                    JSONObject clipJSON = new JSONObject(JSONObject.Type.OBJECT);
                    AnimationClip clip = motion as AnimationClip;
                    if (handleBeforeAnimationClip != null && !handleBeforeAnimationClip(clip, state, gameObject))
                    {
                        // 如果return false，说明这个animationclip被外面所接管
                        clipJSON.AddField("id", "");
                    }
                    else
                    {
                        string clipUid = HandleAnimationClip(ref clip);
                        clipJSON.AddField("id", clipUid);
                    }
                    clipJSON.AddField("type", "AnimationClip");
                    stateJSON.AddField("motion", clipJSON);
                }
                else if (motion.GetType() == typeof(BlendTree))
                {
                    JSONObject btJSON = new JSONObject(JSONObject.Type.OBJECT);
                    BlendTree bt = motion as BlendTree;
                    btJSON.AddField("type", "BlendTree");
                    btJSON.AddField("id", TraverseBlendTree(ref bt));
                    stateJSON.AddField("motion", btJSON);
                }
                stateJSON.AddField("cycleOffset", state.cycleOffset);
                if (state.cycleOffsetParameterActive)
                {
                    stateJSON.AddField("cycleOffsetParameter", state.cycleOffsetParameter);
                }
                else
                {
                    stateJSON.AddField("cycleOffsetParameter", new JSONObject(JSONObject.Type.NULL));
                }
                stateJSON.AddField("mirror", state.mirror);
                if (state.mirrorParameterActive)
                {
                    stateJSON.AddField("mirrorParameter", state.mirrorParameter);
                }
                else
                {
                    stateJSON.AddField("mirrorParameter", new JSONObject(JSONObject.Type.NULL));
                }
                stateInfo.Value.AddField("speed", state.speed);
                if (state.speedParameterActive)
                {
                    stateJSON.AddField("speedParameter", state.speedParameter);
                }
                else
                {
                    stateJSON.AddField("speedParameter", new JSONObject(JSONObject.Type.NULL));
                }
#if UNITY_2017_1_OR_NEWER
                if (state.timeParameterActive)
                {
                    stateJSON.AddField("timeParameter", state.timeParameter);
                }
                else
                {
#endif
                    stateJSON.AddField("timeParameter", new JSONObject(JSONObject.Type.NULL));
#if UNITY_2017_1_OR_NEWER
                }
#endif
                return stateInfo.Key;
            }
            else
            {
                return stateInfo.Key;
            }
        }

        public void HandleStatesPositionInfo(AnimatorControllerLayer[] layers)
        {
            int num = layers.Length;
            int statesCount = controllerInfo.states.dict.Count;
            ArrayList myArryList = new ArrayList();
            for (int i = 0; i < statesCount; i++)
            {
                myArryList.Add(new JSONObject(JSONObject.Type.OBJECT));
            }
            for (int i = 0; i < num; i++)
            {
                AnimatorControllerLayer layer = layers[i];
                AnimatorStateMachine machine = layer.stateMachine;
                ChildAnimatorState[] states = machine.states;
                for (int j = 0; j < states.Length; j++)
                {
                    ChildAnimatorState state = states[j];
                    bool stateExist;
                    var stateInfo = controllerInfo.states.AddObject(state.state, out stateExist);
                    if (stateExist)
                    {
                        JSONObject statePositionJSON = new JSONObject(JSONObject.Type.OBJECT);
                        statePositionJSON.AddField("name", state.state.name);
                        JSONObject pos = new JSONObject(JSONObject.Type.ARRAY);
                        pos.Add(state.position.x);
                        pos.Add(state.position.y);
                        statePositionJSON.AddField("position", pos);
                        myArryList[stateInfo.Key] = statePositionJSON;
                    }
                    else
                    {
                        Debug.LogError("state count is not match");
                    }
                }
            }
            foreach (JSONObject statePosInfo in myArryList)
            {
                controllerInfo.statesPositionInfo.Add(statePosInfo);
            }
        }

        public int HandleStateTransition(string source, ref AnimatorStateTransition transition)
        {
            int id = controllerInfo.transitions.Count;
            JSONObject transitionJSON = new JSONObject(JSONObject.Type.OBJECT);
            controllerInfo.transitions.Add(transitionJSON);
            // transitionJSON.AddField("name", source + "->" + (transition.destinationState != null ? transition.destinationState.name : (transition.destinationStateMachine != null ? transition.destinationStateMachine.name : "exit")));
            JSONObject conditionsJSON = new JSONObject(JSONObject.Type.ARRAY);
            for (int i = 0; i < transition.conditions.Length; i++)
            {
                var cd = transition.conditions[i];
                JSONObject cdJSON = new JSONObject(JSONObject.Type.OBJECT);
                cdJSON.AddField("name", cd.parameter);
                cdJSON.AddField("operator", (int)cd.mode);
                if (cd.mode == AnimatorConditionMode.If || cd.mode == AnimatorConditionMode.IfNot)
                {
                    cdJSON.AddField("value", true);
                }
                else
                {
                    cdJSON.AddField("value", cd.threshold);
                }
                conditionsJSON.Add(cdJSON);
            }
            transitionJSON.AddField("conditions", conditionsJSON);

            transitionJSON.AddField("fixedDuration", transition.hasFixedDuration);
            transitionJSON.AddField("duration", transition.duration);
            transitionJSON.AddField("offset", transition.offset);
            transitionJSON.AddField("interruption", (int)transition.interruptionSource);
            transitionJSON.AddField("orderedInterruption", transition.orderedInterruption);
            transitionJSON.AddField("hasExitTime", transition.hasExitTime);
            transitionJSON.AddField("exitTime", transition.exitTime);
            transitionJSON.AddField("canTransitionToSelf", transition.canTransitionToSelf);
            if (transition.destinationState != null)
            {
                var state = transition.destinationState;
                JSONObject stateJSON = new JSONObject(JSONObject.Type.OBJECT);
                stateJSON.AddField("type", "State");
                stateJSON.AddField("id", HandleState(ref state));
                transitionJSON.AddField("destState", stateJSON);
            }
            else
            {
                if (transition.destinationStateMachine != null)
                {
                    var stateMachine = transition.destinationStateMachine;
                    JSONObject stateMachineJSON = new JSONObject(JSONObject.Type.OBJECT);
                    stateMachineJSON.AddField("type", "StateMachine");
                    bool stateMachineExist;
                    int stateMachineId = controllerInfo.machines.AddObject(stateMachine, out stateMachineExist).Key;
                    if (!stateMachineExist)
                    {
                        TraverseStateMachine(ref stateMachine);
                    }
                    stateMachineJSON.AddField("id", stateMachineId);
                    transitionJSON.AddField("destSate", stateMachineJSON);
                }
                else
                {
                    transitionJSON.AddField("destSate", new JSONObject(JSONObject.Type.NULL));
                }
            }
            return id;
        }

        public int TraverseBlendTree(ref BlendTree tree)
        {
            bool treeExist;
            var treeInfo = controllerInfo.blendTrees.AddObject(tree, out treeExist);
            if (treeExist)
            {
                return treeInfo.Key;
            }
            var json = treeInfo.Value;
            json.AddField("name", tree.name);

            var childrenJSON = new JSONObject(JSONObject.Type.ARRAY);
            json.AddField("children", childrenJSON);
            ChildMotion[] children = tree.children;
            for (int i = 0; i < children.Length; i++)
            {
                var childJSON = new JSONObject(JSONObject.Type.OBJECT);
                childrenJSON.Add(childJSON);
                var motionJSON = new JSONObject(JSONObject.Type.OBJECT);
                Motion motion = children[i].motion;
                if (motion.GetType() == typeof(AnimationClip))
                {
                    AnimationClip clip = motion as AnimationClip;
                    motionJSON.AddField("type", "AnimationClip");
                    motionJSON.AddField("id", HandleAnimationClip(ref clip));
                }
                else if (motion.GetType() == typeof(BlendTree))
                {
                    BlendTree sub = motion as BlendTree;
                    motionJSON.AddField("type", "BlendTree");
                    motionJSON.AddField("id", TraverseBlendTree(ref sub));
                }
                childJSON.AddField("motion", motionJSON);
                childJSON.AddField("timeScale", children[i].timeScale);
                childJSON.AddField("cycleOffset", children[i].cycleOffset);
                childJSON.AddField("mirror", children[i].mirror);
                if (tree.blendType == BlendTreeType.Simple1D)
                {
                    childJSON.AddField("threshold", children[i].threshold);
                }
                else if (tree.blendType == BlendTreeType.SimpleDirectional2D || tree.blendType == BlendTreeType.FreeformDirectional2D || tree.blendType == BlendTreeType.FreeformCartesian2D)
                {
                    var posJSON = new JSONObject(JSONObject.Type.ARRAY);
                    posJSON.Add(children[i].position.x);
                    posJSON.Add(children[i].position.y);
                    childJSON.AddField("position", posJSON);
                }
                if (children[i].directBlendParameter != null)
                {
                    childJSON.AddField("directBlendParameter", children[i].directBlendParameter);
                }
            }

            var blendJSON = new JSONObject(JSONObject.Type.OBJECT);
            json.AddField("blend", blendJSON);
            blendJSON.AddField("type", (int)tree.blendType);
            if (tree.blendType == BlendTreeType.Simple1D)
            {
                bool temp;
                blendJSON.AddField("parameter", controllerInfo.parameters.AddObject(tree.blendParameter, out temp).Key);
                blendJSON.AddField("minThreshold", tree.minThreshold);
                blendJSON.AddField("maxThreshold", tree.maxThreshold);
            }
            else if (tree.blendType == BlendTreeType.SimpleDirectional2D || tree.blendType == BlendTreeType.FreeformDirectional2D || tree.blendType == BlendTreeType.FreeformCartesian2D)
            {
                bool temp;
                blendJSON.AddField("parameterX", controllerInfo.parameters.AddObject(tree.blendParameter, out temp).Key);
                blendJSON.AddField("parameterY", controllerInfo.parameters.AddObject(tree.blendParameterY, out temp).Key);
            }
            return treeInfo.Key;
        }

        public string HandleAnimationClip(ref AnimationClip animationClip)
        {
            bool exist;
            var info = controllerInfo.animation.AddObject(animationClip, out exist);
            if (exist)
            {
                return info.Value.GetField("uid").GetRawString();
            }
            //string uid = WXBeefBallAnimationClip.WriteInstance(gameObject, animationClip).UID;
            WXAnimationClip clip = new WXAnimationClip(animationClip);
            string uid = AddDependencies(clip);
            info.Value.AddField("uid", uid);
            return uid;
        }
    }

}
