Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.CoroutineManager", {
        statics: {
            fields: {
                instance: null
            },
            props: {
                Instance: {
                    get: function () {
                        if (!MiniGameAdaptor.CoroutineManager.instance) {
                            MiniGameAdaptor.CoroutineManager.instance = new MiniGameAdaptor.CoroutineManager();
                        }
                        return MiniGameAdaptor.CoroutineManager.instance;
                    }
                }
            },
            ctors: {
                init: function () {
                    this.instance = new MiniGameAdaptor.CoroutineManager();
                }
            },
            methods: {
                
            }
        },
        fields: {
            coroutines: null
        },
        ctors: {
            init: function () {
                this.coroutines = new (System.Collections.Generic.List$1(MiniGameAdaptor.Coroutine)).ctor();
            },
            ctor: function () {
                this.$initialize();
            }
        },
        methods: {
            StartCoroutine: function (routine) {
                var coroutine = new MiniGameAdaptor.Coroutine(routine);
                this.coroutines.add(coroutine);

                return coroutine;
            },
            StopCoroutine: function(routine) {
                this.coroutines.remove(routine);
            },
            StopAllCoroutines: function() {
                this.coroutines.clear();
            },

            Update: function () {
                var $t;
                $t = Bridge.getEnumerator(System.Linq.Enumerable.from(this.coroutines, MiniGameAdaptor.Coroutine).reverse());
                try {
                    while ($t.moveNext()) {
                        var coroutine = $t.Current;
                        if (Bridge.is(coroutine.routine.System$Collections$IEnumerator$Current, MiniGameAdaptor.YieldInstruction)) {
                            coroutine.waitForCoroutine = Bridge.as(coroutine.routine.System$Collections$IEnumerator$Current, MiniGameAdaptor.YieldInstruction);
                        }

                        if (coroutine.waitForCoroutine != null && !coroutine.waitForCoroutine.keepWaiting) {
                            coroutine.waitForCoroutine = null;
                        }

                        if (coroutine.waitForCoroutine != null) {
                            continue;
                        }

                        // update coroutine

                        // 执行 yield return 内的协程
                        if (coroutine.routine.routine && coroutine.routine.routine.System$Collections$IEnumerator$moveNext()) {
                            coroutine.finished = false;
                            var c = coroutine.routine.routine.System$Collections$IEnumerator$Current;
                            if (c && c instanceof MiniGameAdaptor.YieldInstruction) {
                                var innerCoroutine = new MiniGameAdaptor.Coroutine(c);
                                innerCoroutine.__past = coroutine;

                                // 在IEnumerator里修改元素
                                this.coroutines = this.coroutines.ConvertAll(MiniGameAdaptor.Coroutine, function(e) {
                                    if (e === coroutine) {
                                        e = innerCoroutine;
                                    }
                                    return e;
                                });
                            }
                        } 

                        else if (coroutine.routine.System$Collections$IEnumerator$moveNext()) {
                            coroutine.finished = false;
                            var c = coroutine.routine.System$Collections$IEnumerator$Current;
                            if (c && c instanceof MiniGameAdaptor.YieldInstruction) {
                                // yield return StartCoroutine(Foo()) 的情况，需要将Foo其从coroutines数组中移除，并优先执行Foo协程
                                // 待Foo协程执行完毕后，再继续执行yield return StartCoroutine(Foo()) 后面的语句
                                // 因此在Foo协程上，用__past指向当前协程，并用Foo协程替换coroutines数组中的当前协程
                                this.coroutines.remove(c);
                                var innerCoroutine = new MiniGameAdaptor.Coroutine(c);
                                innerCoroutine.__past = coroutine;

                                // 在IEnumerator里修改元素
                                this.coroutines = this.coroutines.ConvertAll(MiniGameAdaptor.Coroutine, function(e) {
                                    if (e.routine.current === c) {
                                        e = innerCoroutine;
                                    }
                                    return e;
                                });
                            }
                        }

                        // 执行完当前协程
                        else {
                            if (coroutine && coroutine.__past) {
                                // 如果当前协程执行完毕，需要返回到上一层调用处继续执行未完成的协程
                                // 此处将当前协程里指向上一层协程的__past，还原回coroutines中
                                this.coroutines = this.coroutines.ConvertAll(MiniGameAdaptor.Coroutine, function(e) {
                                    if (e === coroutine) {
                                        e = coroutine.__past;
                                    }
                                    return e;
                                });
                            }

                            // 执行完的协程移出数组
                            this.coroutines.remove(coroutine);
                            coroutine.finished = true;
                        }
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }
            }
        }
    });
});


