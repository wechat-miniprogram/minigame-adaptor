namespace System {
    public class TimeZone {
        public static TimeZone CurrentTimeZone {
            get {
                throw new Exception("not impl");
            }
        }

        private TimeZone() {
            throw new Exception("not impl");
        }

        public DateTime ToLocalTime(DateTime time) {
            throw new Exception("not impl");
        }
    }
}