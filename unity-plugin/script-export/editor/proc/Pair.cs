using System.Dynamic;

namespace WeChat {
    public class Pair<TF,TS> {
        public TF First { get; set; }
        public TS Second { get; set; }

        public Pair(TF first, TS second) {
            this.First = first;
            this.Second = second;
        }
        public Pair() { }
    }
}