Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.UI.Text", {
        inherits: [MiniGameAdaptor.UI.MaskableGraphic, MiniGameAdaptor.UI.ILayoutElement],
        statics: {
            methods: {
                GetTextAnchorPivot: function (anchor) {
                    throw new System.Exception("not impl");
                },
                Deserialize: function (data, comp, context, builtContext) {
                    // console.log('des',data, comp);
                    MiniGameAdaptor.UI.UGUIEvenSystemHandler.register(data, comp, context, builtContext);
                    comp.ref = builtContext.components.data[data.ref];
                    // MiniGameAdaptor.UI.Graphic.formatRectTransForm(comp);
                    MiniGameAdaptor.UI.Graphic.Deserialize(data, comp, context, builtContext);
                    return comp;
                }
            }
        },
        props: {
            alignByGeometry: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            alignment: {
                get: function () {
                    if (this.ref.align == 1) {
                        if (this.ref.valign == 1) {
                            return MiniGameAdaptor.TextAnchor.UpperLeft;
                        } else if (this.ref.valign == 2) {
                            return MiniGameAdaptor.TextAnchor.UpperCenter;
                        } else if (this.ref.valign == 3) {
                            return MiniGameAdaptor.TextAnchor.UpperRight;
                        }
                    } else if (this.ref.align == 2) {
                        if (this.ref.valign == 1) {
                            return MiniGameAdaptor.TextAnchor.MiddleLeft;
                        } else if (this.ref.valign == 2) {
                            return MiniGameAdaptor.TextAnchor.MiddleCenter;
                        } else if (this.ref.valign == 3) {
                            return MiniGameAdaptor.TextAnchor.MiddleRight;
                        }
                    } else if (this.ref.align == 3) {
                        if (this.ref.valign == 1) {
                            return MiniGameAdaptor.TextAnchor.LowerLeft;
                        } else if (this.ref.valign == 2) {
                            return MiniGameAdaptor.TextAnchor.LowerCenter;
                        } else if (this.ref.valign == 3) {
                            return MiniGameAdaptor.TextAnchor.LowerRight;
                        }
                    }
                    // throw new System.Exception("not impl");
                },
                set: function (value) {
                    if (value == MiniGameAdaptor.TextAnchor.UpperLeft || value == MiniGameAdaptor.TextAnchor.MiddleLeft || value == MiniGameAdaptor.TextAnchor.LowerLeft) {
                        this.ref.align = 1;
                    } else if (value == MiniGameAdaptor.TextAnchor.UpperCenter || value == MiniGameAdaptor.TextAnchor.MiddleCenter || value == MiniGameAdaptor.TextAnchor.LowerCenter) {
                        this.ref.align = 2;
                    } else if (value == MiniGameAdaptor.TextAnchor.UpperRight || value == MiniGameAdaptor.TextAnchor.MiddleRight || value == MiniGameAdaptor.TextAnchor.LowerRight) {
                        this.ref.align = 3;
                    }

                    if (value == MiniGameAdaptor.TextAnchor.LowerLeft || value == MiniGameAdaptor.TextAnchor.LowerCenter || value == MiniGameAdaptor.TextAnchor.LowerRight) {
                        this.ref.valign = 1;
                    } else if (value == MiniGameAdaptor.TextAnchor.MiddleLeft || value == MiniGameAdaptor.TextAnchor.MiddleCenter || value == MiniGameAdaptor.TextAnchor.MiddleRight) {
                        this.ref.valign = 2;
                    } else if (value == MiniGameAdaptor.TextAnchor.UpperLeft || value == MiniGameAdaptor.TextAnchor.UpperCenter || value == MiniGameAdaptor.TextAnchor.UpperRight) {
                        this.ref.valign = 3;
                    }
                    // throw new System.Exception("not impl");
                }
            },
            cachedTextGenerator: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            cachedTextGeneratorForLayout: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            flexibleHeight: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            flexibleWidth: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            font: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            fontSize: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            fontStyle: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            horizontalOverflow: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            layoutPriority: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            lineSpacing: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            mainTexture: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            minHeight: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            minWidth: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            pixelsPerUnit: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            preferredHeight: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            preferredWidth: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            resizeTextForBestFit: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            resizeTextMaxSize: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            resizeTextMinSize: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            supportRichText: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            text: {
                get: function () {
                    return this.entity.getComponent(engine.UILabel).text;
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            verticalOverflow: {
                get: function () {
                    throw new System.Exception("not impl");
                },
                set: function (value) {
                    throw new System.Exception("not impl");
                }
            },
            MiniGameAdaptor$UI$ILayoutElement$flexibleHeight: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            MiniGameAdaptor$UI$ILayoutElement$flexibleWidth: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            MiniGameAdaptor$UI$ILayoutElement$layoutPriority: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            MiniGameAdaptor$UI$ILayoutElement$minHeight: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            MiniGameAdaptor$UI$ILayoutElement$minWidth: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            MiniGameAdaptor$UI$ILayoutElement$preferredHeight: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            },
            MiniGameAdaptor$UI$ILayoutElement$preferredWidth: {
                get: function () {
                    throw new System.Exception("not impl");
                }
            }
        },
        ctors: {
            get $ctorDefault() { return this.ctor },
            ctor: function () {
                this.$initialize();
                // throw new System.Exception("not impl");
            }
        },
        methods: {
            CalculateLayoutInputHorizontal: function () {
                throw new System.Exception("not impl");
            },
            MiniGameAdaptor$UI$ILayoutElement$CalculateLayoutInputHorizontal: function () {
                throw new System.Exception("Exception");
            },
            CalculateLayoutInputVertical: function () {
                throw new System.Exception("not impl");
            },
            MiniGameAdaptor$UI$ILayoutElement$CalculateLayoutInputVertical: function () {
                throw new System.Exception("Exception");
            },
            FontTextureChanged: function () {
                throw new System.Exception("not impl");
            },
            GetGenerationSettings: function (extents) {
                throw new System.Exception("not impl");
            },
            OnRebuildRequested: function () {
                throw new System.Exception("not impl");
            }
        }
    });
});
engine.decorators.serialize('MiniGameAdaptor.UI.Text')(MiniGameAdaptor.UI.Text);
Object.defineProperty(MiniGameAdaptor.UI.Text.prototype, '__properties', {
    enumerable: false,
    configurable: true,
    writable: false,
    value: { ...MiniGameAdaptor.UI.Text.prototype.__properties }
})
