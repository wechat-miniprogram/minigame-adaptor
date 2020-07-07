/**
 * @compiler Bridge.NET 17.9.0
 */
Bridge.assembly("unity-script-converter", function ($asm, globals) {
    "use strict";

    Bridge.define("MiniGameAdaptor.LogOption", {
        $kind: "enum",
        statics: {
            fields: {
                None: 0,
                NoStacktrace: 1
            }
        }
    });

    Bridge.define("MiniGameAdaptor.LogType", {
        $kind: "enum",
        statics: {
            fields: {
                Error: 0,
                Assert: 1,
                Warning: 2,
                Log: 3,
                Exception: 4
            }
        }
    });

    Bridge.define("MiniGameAdaptor.PrimitiveType", {
        $kind: "enum",
        statics: {
            fields: {
                Sphere: 0,
                Capsule: 1,
                Cylinder: 2,
                Cube: 3,
                Plane: 4,
                Quad: 5
            }
        }
    });

    Bridge.define("MiniGameAdaptor.RuntimePlatform", {
        $kind: "enum",
        statics: {
            fields: {
                OSXEditor: 0,
                OSXPlayer: 1,
                WindowsPlayer: 2,
                OSXWebPlayer: 3,
                OSXDashboardPlayer: 4,
                WindowsWebPlayer: 5,
                WindowsEditor: 7,
                IPhonePlayer: 8,
                XBOX360: 10,
                PS3: 9,
                Android: 11,
                NaCl: 12,
                FlashPlayer: 15,
                LinuxPlayer: 13,
                LinuxEditor: 16,
                WebGLPlayer: 17,
                MetroPlayerX86: 18,
                WSAPlayerX86: 18,
                MetroPlayerX64: 19,
                WSAPlayerX64: 19,
                MetroPlayerARM: 20,
                WSAPlayerARM: 20,
                WP8Player: 21,
                BB10Player: 22,
                BlackBerryPlayer: 22,
                TizenPlayer: 23,
                PSP2: 24,
                PS4: 25,
                PSM: 26,
                XboxOne: 27,
                SamsungTVPlayer: 28,
                WiiU: 30,
                tvOS: 31,
                Switch: 32,
                Lumin: 33,
                Stadia: 34,
                WechatDevtools: 101
            }
        }
    });

    Bridge.define("MiniGameAdaptor.SendMessageOptions", {
        $kind: "enum",
        statics: {
            fields: {
                RequireReceiver: 0,
                DontRequireReceiver: 1
            }
        }
    });

    Bridge.define("MiniGameAdaptor.Space", {
        $kind: "enum",
        statics: {
            fields: {
                World: 0,
                Self: 1
            }
        }
    });

    Bridge.define("MiniGameAdaptor.SystemLanguage", {
        $kind: "enum",
        statics: {
            fields: {
                Afrikaans: 0,
                Arabic: 1,
                Basque: 2,
                Belarusian: 3,
                Bulgarian: 4,
                Catalan: 5,
                Chinese: 6,
                Czech: 7,
                Danish: 8,
                Dutch: 9,
                English: 10,
                Estonian: 11,
                Faroese: 12,
                Finnish: 13,
                French: 14,
                German: 15,
                Greek: 16,
                Hebrew: 17,
                Hugarian: 18,
                Icelandic: 19,
                Indonesian: 20,
                Italian: 21,
                Japanese: 22,
                Korean: 23,
                Latvian: 24,
                Lithuanian: 25,
                Norwegian: 26,
                Polish: 27,
                Portuguese: 28,
                Romanian: 29,
                Russian: 30,
                SerboCroatian: 31,
                Slovak: 32,
                Slovenian: 33,
                Spanish: 34,
                Swedish: 35,
                Thai: 36,
                Turkish: 37,
                Ukrainian: 38,
                Vietnamese: 39,
                ChineseSimplified: 40,
                ChineseTraditional: 41,
                Unknown: 42,
                Hungarian: 18
            }
        }
    });

    Bridge.define("MiniGameAdaptor.ThreadPriority", {
        $kind: "enum",
        statics: {
            fields: {
                Low: 0,
                BelowNormal: 1,
                Normal: 2,
                High: 4
            }
        }
    });

    Bridge.define("MiniGameAdaptor.SleepTimeout", {
        $kind: "enum",
        statics: {
            fields: {
                NeverSleep: -1,
                SystemSetting: -2
            }
        }
    });
});
