/**
 * @compiler Bridge.NET 17.10.1
 */
Bridge.assembly("unity-script-converter", function($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.EventSystems.ExecuteEvents", {
        statics: {
            methods: {
                _Handle: function(type, target, func) {
                    for (let component of target.ref._components) {
                        if (component.__proto__.constructor.$interfaces) {
                            for (let i of component.__proto__.constructor.$interfaces) {
                                if (i == type) {
                                    func(component);
                                }
                            }
                        }
                    }
                },
                Execute: function(type, target, eventData, func) {
                    var handled = false;
                    this._Handle(type, target, (component) => {
                        func(component, eventData);
                        handled = true;
                    })
                    return handled;
                },
                CanHandleEvent: function(type, go) {
                    var handled = false;
                    this._Handle(type, go, (component) => {
                        handled = true;
                    }) 
                    return handled;
                }, 
                GetEventHandler: function(type, root) {
                    if (!root) {
                        return undefined;
                    } 
                    if (this.CanHandleEvent(type, root)) {
                        return root;
                    }
                    return this.GetEventHandler(type, root.transform.parent);
                },
                ExecuteHierarchy: function(type, root, eventData, func) {
                    if (!root) {
                        return undefined;
                    }
                    if (this.Execute(type, root, eventData, func)) {
                        return root;
                    }
                    return this.ExecuteHierarchy(type, root.transform.parent, eventData, func);
                }
            }
        },
        fields: {},
        props: {},
        ctors: {},
        methods: {}
    });
});
