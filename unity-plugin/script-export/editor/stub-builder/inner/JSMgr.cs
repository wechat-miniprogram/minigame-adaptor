using System.Reflection;

public static class JSMgr
{
    public static BindingFlags BindingFlagsMethod = 
        BindingFlags.Public 
        | BindingFlags.NonPublic
        | BindingFlags.Instance 
        | BindingFlags.Static 
        | BindingFlags.DeclaredOnly;

    // used to judge it's overloaded function or not
    // used in JSGenerator
    public static BindingFlags BindingFlagsMethod2 =
        BindingFlags.Public
        | BindingFlags.NonPublic
        | BindingFlags.Instance
        | BindingFlags.Static;
    public static BindingFlags BindingFlagsMethod3 =
        BindingFlags.Public
        | BindingFlags.NonPublic
        | BindingFlags.Static
        | BindingFlags.FlattenHierarchy;

    public static BindingFlags BindingFlagsProperty = 
        BindingFlags.Public 
        | BindingFlags.NonPublic
        | BindingFlags.GetProperty 
        | BindingFlags.SetProperty 
        | BindingFlags.Instance 
        | BindingFlags.Static 
        | BindingFlags.DeclaredOnly;

    public static BindingFlags BindingFlagsField = 
        BindingFlags.Public 
        | BindingFlags.NonPublic
        | BindingFlags.GetField 
        | BindingFlags.SetField 
        | BindingFlags.Instance 
        | BindingFlags.Static 
        | BindingFlags.DeclaredOnly;
}
