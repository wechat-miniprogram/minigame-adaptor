Bridge.assembly("unity-script-converter", function ($asm, globals) {
  "use strict";

  Bridge.define("MiniGameAdaptor.NetworkReachability", {
      $kind: "enum",
      statics: {
          fields: {
              NotReachable: 0,
              ReachableViaCarrierDataNetwork: 1,
              ReachableViaLocalAreaNetwork: 2
          }
      }
  });
});