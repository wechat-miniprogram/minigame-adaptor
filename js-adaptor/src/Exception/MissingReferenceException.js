Bridge.define("MiniGameAdaptor.MissingReferenceException", {
  ctors: {
    ctor: function (err) {
      console.error(err)
      this.$initialize();
    }
  }
});
