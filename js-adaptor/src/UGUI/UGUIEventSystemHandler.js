Bridge.define("MiniGameAdaptor.UI.UGUIEvenSystemHandler", {
    statics: {
        methods: {
            register(data, comp, context, builtContext){
                const scriptList = data.scriptList;
                if(!scriptList || !scriptList.length){
                    return false;
                }
                const compTouch = comp.entity.getComponent(engine.TouchInputComponent);
                if(compTouch){
                    const clickList = [];
                    const onTouchEnter = [];
                    const onTouchLeave = [];
                    scriptList.forEach(v=>{
                        const item = builtContext.components.data[v.target];
                        if(item.OnPointerClick){
                            clickList.push(item);
                        }
                        if(item.OnPointerEnter){
                            onTouchEnter.push(item);
                        }
                        if(item.OnPointerExit){
                            onTouchLeave.push(item);
                        }
                    });
                    if(clickList.length){
                        compTouch.onClick.add((c,e)=>{
                            const pointerData = new MiniGameAdaptor.EventSystems.PointerEventData(e);
                            clickList.forEach(v=>{
                                v.OnPointerClick(pointerData);
                            })
                        });
                    }
                    if(onTouchEnter.length){
                        compTouch.onTouchEnter.add((c,e)=>{
                            const pointerData = new MiniGameAdaptor.EventSystems.PointerEventData(e);
                            onTouchEnter.forEach(v=>{
                                v.OnPointerEnter(pointerData);
                            })
                        });
                    }
                    if(onTouchLeave.length){
                        compTouch.onTouchLeave.add((c,e)=>{
                            const pointerData = new MiniGameAdaptor.EventSystems.PointerEventData(e);
                            onTouchLeave.forEach(v=>{
                                v.OnPointerExit(pointerData);
                            })
                        });
                    }
                }
                const OnRectTransformDimensionsChangeList = [];
                scriptList.forEach(v=>{
                    if(v.OnRectTransformDimensionsChange){
                        OnRectTransformDimensionsChangeList.push(v);
                    }
                });
                if(OnRectTransformDimensionsChangeList.length){
                    comp.entity.transform2D.boundsChangeEvent.add(()=>{
                        OnRectTransformDimensionsChangeList.forEach(v=>{
                            v.OnRectTransformDimensionsChange();
                        })
                    });
                }
            }
        }
    }
});
