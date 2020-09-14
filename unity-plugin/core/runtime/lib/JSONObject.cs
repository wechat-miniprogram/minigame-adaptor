// Warning: Some assembly references could not be loaded. This might lead to incorrect decompilation of some parts,
// for ex. property getter/setter access. To get optimal decompilation results, please manually add the references to the list of loaded assemblies.
// JSONObject
using System;
using System.Collections;
using System.Collections.Generic;
using System.Diagnostics;
using System.Text;

namespace WeChat
{
    public class JSONObject
    {
        public enum Type
        {
            NULL,
            STRING,
            NUMBER,
            OBJECT,
            ARRAY,
            BOOL,
            BAKED
        }

        public delegate void AddJSONContents(JSONObject self);

        public delegate void FieldNotFound(string name);

        public delegate void GetFieldResponse(JSONObject obj);

        private const int MAX_DEPTH = 100;

        private const string INFINITY = "\"INFINITY\"";

        private const string NEGINFINITY = "\"NEGINFINITY\"";

        private const string NaN = "\"NaN\"";

        public static readonly char[] WHITESPACE = new char[6]
        {
        ' ',
        '\r',
        '\n',
        '\t',
        '\ufeff',
        '\t'
        };

        public Type type;

        public List<JSONObject> list;

        public List<string> keys;

        public string str;

        public float n;

        public bool useInt;

        public long i;

        public bool b;

        private const float maxFrameTime = 0.008f;

        private static readonly Stopwatch printWatch = new Stopwatch();

        public bool isContainer
        {
            get
            {
                if (this.type != Type.ARRAY)
                {
                    return this.type == Type.OBJECT;
                }
                return true;
            }
        }

        public int Count
        {
            get
            {
                if (this.list == null)
                {
                    return -1;
                }
                return this.list.Count;
            }
        }

        public float f
        {
            get
            {
                return this.n;
            }
        }

        public static JSONObject nullJO
        {
            get
            {
                return JSONObject.Create(Type.NULL);
            }
        }

        public static JSONObject obj
        {
            get
            {
                return JSONObject.Create(Type.OBJECT);
            }
        }

        public static JSONObject arr
        {
            get
            {
                return JSONObject.Create(Type.ARRAY);
            }
        }

        public bool IsNumber
        {
            get
            {
                return this.type == Type.NUMBER;
            }
        }

        public bool IsNull
        {
            get
            {
                return this.type == Type.NULL;
            }
        }

        public bool IsString
        {
            get
            {
                return this.type == Type.STRING;
            }
        }

        public bool IsBool
        {
            get
            {
                return this.type == Type.BOOL;
            }
        }

        public bool IsArray
        {
            get
            {
                return this.type == Type.ARRAY;
            }
        }

        public bool IsObject
        {
            get
            {
                if (this.type != Type.OBJECT)
                {
                    return this.type == Type.BAKED;
                }
                return true;
            }
        }

        public JSONObject this[int index]
        {
            get
            {
                if (this.list.Count > index)
                {
                    return this.list[index];
                }
                return null;
            }
            set
            {
                if (this.list.Count > index)
                {
                    this.list[index] = value;
                }
            }
        }

        public JSONObject this[string index]
        {
            get
            {
                return this.GetField(index);
            }
            set
            {
                this.SetField(index, value);
            }
        }

        public JSONObject(Type t)
        {
            this.type = t;
            switch (t)
            {
                case Type.ARRAY:
                    this.list = new List<JSONObject>();
                    break;
                case Type.OBJECT:
                    this.list = new List<JSONObject>();
                    this.keys = new List<string>();
                    break;
            }
        }

        public JSONObject(bool b)
        {
            this.type = Type.BOOL;
            this.b = b;
        }

        public JSONObject(float f)
        {
            this.type = Type.NUMBER;
            this.n = f;
        }

        public JSONObject(int i)
        {
            this.type = Type.NUMBER;
            this.i = i;
            this.useInt = true;
            this.n = (float)i;
        }

        public JSONObject(long l)
        {
            this.type = Type.NUMBER;
            this.i = l;
            this.useInt = true;
            this.n = (float)l;
        }

        public JSONObject(Dictionary<string, string> dic)
        {
            this.type = Type.OBJECT;
            this.keys = new List<string>();
            this.list = new List<JSONObject>();
            foreach (KeyValuePair<string, string> item in dic)
            {
                this.keys.Add(item.Key);
                this.list.Add(JSONObject.CreateStringObject(item.Value));
            }
        }

        public JSONObject(Dictionary<string, JSONObject> dic)
        {
            this.type = Type.OBJECT;
            this.keys = new List<string>();
            this.list = new List<JSONObject>();
            foreach (KeyValuePair<string, JSONObject> item in dic)
            {
                this.keys.Add(item.Key);
                this.list.Add(item.Value);
            }
        }

        public JSONObject(AddJSONContents content)
        {
            content(this);
        }

        public JSONObject(JSONObject[] objs)
        {
            this.type = Type.ARRAY;
            this.list = new List<JSONObject>(objs);
        }

        public static JSONObject StringObject(string val)
        {
            return JSONObject.CreateStringObject(val);
        }

        public void Absorb(JSONObject obj)
        {
            this.list.AddRange(obj.list);
            this.keys.AddRange(obj.keys);
            this.str = obj.str;
            this.n = obj.n;
            this.useInt = obj.useInt;
            this.i = obj.i;
            this.b = obj.b;
            this.type = obj.type;
        }

        public static JSONObject Create()
        {
            return new JSONObject();
        }

        public static JSONObject Create(Type t)
        {
            JSONObject jSONObject = JSONObject.Create();
            jSONObject.type = t;
            switch (t)
            {
                case Type.ARRAY:
                    jSONObject.list = new List<JSONObject>();
                    break;
                case Type.OBJECT:
                    jSONObject.list = new List<JSONObject>();
                    jSONObject.keys = new List<string>();
                    break;
            }
            return jSONObject;
        }

        public static JSONObject Create(bool val)
        {
            JSONObject jSONObject = JSONObject.Create();
            jSONObject.type = Type.BOOL;
            jSONObject.b = val;
            return jSONObject;
        }

        public static JSONObject Create(float val)
        {
            JSONObject jSONObject = JSONObject.Create();
            jSONObject.type = Type.NUMBER;
            jSONObject.n = val;
            return jSONObject;
        }

        public static JSONObject Create(int val)
        {
            JSONObject jSONObject = JSONObject.Create();
            jSONObject.type = Type.NUMBER;
            jSONObject.n = (float)val;
            jSONObject.useInt = true;
            jSONObject.i = val;
            return jSONObject;
        }

        public static JSONObject Create(long val)
        {
            JSONObject jSONObject = JSONObject.Create();
            jSONObject.type = Type.NUMBER;
            jSONObject.n = (float)val;
            jSONObject.useInt = true;
            jSONObject.i = val;
            return jSONObject;
        }

        public static JSONObject CreateStringObject(string val)
        {
            JSONObject jSONObject = JSONObject.Create();
            jSONObject.type = Type.STRING;
            jSONObject.str = val;
            return jSONObject;
        }

        public static JSONObject CreateBakedObject(string val)
        {
            JSONObject jSONObject = JSONObject.Create();
            jSONObject.type = Type.BAKED;
            jSONObject.str = val;
            return jSONObject;
        }

        public static JSONObject Create(string val, int maxDepth = -2, bool storeExcessLevels = false, bool strict = false)
        {
            JSONObject jSONObject = JSONObject.Create();
            jSONObject.Parse(val, maxDepth, storeExcessLevels, strict);
            return jSONObject;
        }

        public static JSONObject Create(AddJSONContents content)
        {
            JSONObject jSONObject = JSONObject.Create();
            content(jSONObject);
            return jSONObject;
        }

        public static JSONObject Create(Dictionary<string, string> dic)
        {
            JSONObject jSONObject = JSONObject.Create();
            jSONObject.type = Type.OBJECT;
            jSONObject.keys = new List<string>();
            jSONObject.list = new List<JSONObject>();
            foreach (KeyValuePair<string, string> item in dic)
            {
                jSONObject.keys.Add(item.Key);
                jSONObject.list.Add(JSONObject.CreateStringObject(item.Value));
            }
            return jSONObject;
        }

        public JSONObject()
        {
        }

        public JSONObject(string str, int maxDepth = -2, bool storeExcessLevels = false, bool strict = false)
        {
            this.Parse(str, maxDepth, storeExcessLevels, strict);
        }

        private void Parse(string str, int maxDepth = -2, bool storeExcessLevels = false, bool strict = false)
        {
            if (!string.IsNullOrEmpty(str))
            {
                str = str.Trim(JSONObject.WHITESPACE);
                if (strict && str[0] != '[' && str[0] != '{')
                {
                    this.type = Type.NULL;
                }
                else if (str.Length > 0)
                {
                    if (string.Compare(str, "true", true) == 0)
                    {
                        this.type = Type.BOOL;
                        this.b = true;
                    }
                    else if (string.Compare(str, "false", true) == 0)
                    {
                        this.type = Type.BOOL;
                        this.b = false;
                    }
                    else if (string.Compare(str, "null", true) == 0)
                    {
                        this.type = Type.NULL;
                    }
                    else if (str == "\"INFINITY\"")
                    {
                        this.type = Type.NUMBER;
                        this.n = float.PositiveInfinity;
                    }
                    else if (str == "\"NEGINFINITY\"")
                    {
                        this.type = Type.NUMBER;
                        this.n = float.NegativeInfinity;
                    }
                    else if (str == "\"NaN\"")
                    {
                        this.type = Type.NUMBER;
                        this.n = float.NaN;
                    }
                    else if (str[0] == '"')
                    {
                        this.type = Type.STRING;
                        this.str = str.Substring(1, str.Length - 2);
                    }
                    else
                    {
                        int num = 1;
                        int num2 = 0;
                        switch (str[num2])
                        {
                            case '{':
                                this.type = Type.OBJECT;
                                this.keys = new List<string>();
                                this.list = new List<JSONObject>();
                                break;
                            case '[':
                                this.type = Type.ARRAY;
                                this.list = new List<JSONObject>();
                                break;
                            default:
                                try
                                {
                                    this.n = Convert.ToSingle(str);
                                    if (!str.Contains("."))
                                    {
                                        this.i = Convert.ToInt64(str);
                                        this.useInt = true;
                                    }
                                    this.type = Type.NUMBER;
                                }
                                catch (FormatException)
                                {
                                    this.type = Type.NULL;
                                }
                                return;
                        }
                        string item = "";
                        bool flag = false;
                        bool flag2 = false;
                        int num3 = 0;
                        while (++num2 < str.Length)
                        {
                            if (Array.IndexOf(JSONObject.WHITESPACE, str[num2]) <= -1)
                            {
                                if (str[num2] == '\\')
                                {
                                    num2++;
                                }
                                else
                                {
                                    if (str[num2] == '"')
                                    {
                                        if (flag)
                                        {
                                            if (!flag2 && num3 == 0 && this.type == Type.OBJECT)
                                            {
                                                item = str.Substring(num + 1, num2 - num - 1);
                                            }
                                            flag = false;
                                        }
                                        else
                                        {
                                            if (num3 == 0 && this.type == Type.OBJECT)
                                            {
                                                num = num2;
                                            }
                                            flag = true;
                                        }
                                    }
                                    if (!flag)
                                    {
                                        if (this.type == Type.OBJECT && num3 == 0 && str[num2] == ':')
                                        {
                                            num = num2 + 1;
                                            flag2 = true;
                                        }
                                        if (str[num2] == '[' || str[num2] == '{')
                                        {
                                            num3++;
                                        }
                                        else if (str[num2] == ']' || str[num2] == '}')
                                        {
                                            num3--;
                                        }
                                        if (str[num2] == ',' && num3 == 0)
                                        {
                                            goto IL_029f;
                                        }
                                        if (num3 < 0)
                                        {
                                            goto IL_029f;
                                        }
                                    }
                                }
                            }
                            continue;
                        IL_029f:
                            flag2 = false;
                            string text = str.Substring(num, num2 - num).Trim(JSONObject.WHITESPACE);
                            if (text.Length > 0)
                            {
                                if (this.type == Type.OBJECT)
                                {
                                    this.keys.Add(item);
                                }
                                if (maxDepth != -1)
                                {
                                    this.list.Add(JSONObject.Create(text, (maxDepth < -1) ? (-2) : (maxDepth - 1), false, false));
                                }
                                else if (storeExcessLevels)
                                {
                                    this.list.Add(JSONObject.CreateBakedObject(text));
                                }
                            }
                            num = num2 + 1;
                        }
                    }
                }
                else
                {
                    this.type = Type.NULL;
                }
            }
            else
            {
                this.type = Type.NULL;
            }
        }

        public void Add(bool val)
        {
            this.Add(JSONObject.Create(val));
        }

        public void Add(float val)
        {
            this.Add(JSONObject.Create(val));
        }

        public void Add(int val)
        {
            this.Add(JSONObject.Create(val));
        }

        public void Add(string str)
        {
            this.Add(JSONObject.CreateStringObject(str));
        }

        public void Add(AddJSONContents content)
        {
            this.Add(JSONObject.Create(content));
        }

        public void Add(JSONObject obj)
        {
            if ((bool)obj)
            {
                if (this.type != Type.ARRAY)
                {
                    this.type = Type.ARRAY;
                    if (this.list == null)
                    {
                        this.list = new List<JSONObject>();
                    }
                }
                this.list.Add(obj);
            }
        }

        public void AddField(string name, bool val)
        {
            this.AddField(name, JSONObject.Create(val));
        }

        public void AddField(string name, float val)
        {
            this.AddField(name, JSONObject.Create(val));
        }

        public void AddField(string name, int val)
        {
            this.AddField(name, JSONObject.Create(val));
        }

        public void AddField(string name, long val)
        {
            this.AddField(name, JSONObject.Create(val));
        }

        public void AddField(string name, AddJSONContents content)
        {
            this.AddField(name, JSONObject.Create(content));
        }

        public void AddField(string name, string val)
        {
            this.AddField(name, JSONObject.CreateStringObject(val));
        }

        public void AddField(string name, JSONObject obj)
        {
            if (HasField(name))
            {
                this.SetField(name, obj);
            }
            else
            {

                if ((bool)obj)
                {
                    if (this.type != Type.OBJECT)
                    {
                        if (this.keys == null)
                        {
                            this.keys = new List<string>();
                        }
                        if (this.type == Type.ARRAY)
                        {
                            for (int i = 0; i < this.list.Count; i++)
                            {
                                this.keys.Add(string.Concat(i));
                            }
                        }
                        else if (this.list == null)
                        {
                            this.list = new List<JSONObject>();
                        }
                        this.type = Type.OBJECT;
                    }
                    this.keys.Add(name);
                    this.list.Add(obj);
                }
            }
        }

        public void SetField(string name, string val)
        {
            this.SetField(name, JSONObject.CreateStringObject(val));
        }

        public void SetField(string name, bool val)
        {
            this.SetField(name, JSONObject.Create(val));
        }

        public void SetField(string name, float val)
        {
            this.SetField(name, JSONObject.Create(val));
        }

        public void SetField(string name, int val)
        {
            this.SetField(name, JSONObject.Create(val));
        }

        public void SetField(string name, JSONObject obj)
        {
            if (this.HasField(name))
            {
                this.list.Remove(this[name]);
                this.keys.Remove(name);
            }
            this.AddField(name, obj);
        }

        public void RemoveField(string name)
        {
            if (this.keys.IndexOf(name) > -1)
            {
                this.list.RemoveAt(this.keys.IndexOf(name));
                this.keys.Remove(name);
            }
        }

        public bool GetField(out bool field, string name, bool fallback)
        {
            field = fallback;
            return this.GetField(ref field, name, (FieldNotFound)null);
        }

        public bool GetField(ref bool field, string name, FieldNotFound fail = null)
        {
            if (this.type == Type.OBJECT)
            {
                int num = this.keys.IndexOf(name);
                if (num >= 0)
                {
                    field = this.list[num].b;
                    return true;
                }
            }
            if (fail != null)
            {
                fail(name);
            }
            return false;
        }

        public bool GetField(out float field, string name, float fallback)
        {
            field = fallback;
            return this.GetField(ref field, name, (FieldNotFound)null);
        }

        public bool GetField(ref float field, string name, FieldNotFound fail = null)
        {
            if (this.type == Type.OBJECT)
            {
                int num = this.keys.IndexOf(name);
                if (num >= 0)
                {
                    field = this.list[num].n;
                    return true;
                }
            }
            if (fail != null)
            {
                fail(name);
            }
            return false;
        }

        public bool GetField(out int field, string name, int fallback)
        {
            field = fallback;
            return this.GetField(ref field, name, (FieldNotFound)null);
        }

        public bool GetField(ref int field, string name, FieldNotFound fail = null)
        {
            if (this.IsObject)
            {
                int num = this.keys.IndexOf(name);
                if (num >= 0)
                {
                    field = (int)this.list[num].n;
                    return true;
                }
            }
            if (fail != null)
            {
                fail(name);
            }
            return false;
        }

        public bool GetField(out long field, string name, long fallback)
        {
            field = fallback;
            return this.GetField(ref field, name, (FieldNotFound)null);
        }

        public bool GetField(ref long field, string name, FieldNotFound fail = null)
        {
            if (this.IsObject)
            {
                int num = this.keys.IndexOf(name);
                if (num >= 0)
                {
                    field = (long)this.list[num].n;
                    return true;
                }
            }
            if (fail != null)
            {
                fail(name);
            }
            return false;
        }

        public bool GetField(out uint field, string name, uint fallback)
        {
            field = fallback;
            return this.GetField(ref field, name, (FieldNotFound)null);
        }

        public bool GetField(ref uint field, string name, FieldNotFound fail = null)
        {
            if (this.IsObject)
            {
                int num = this.keys.IndexOf(name);
                if (num >= 0)
                {
                    field = (uint)this.list[num].n;
                    return true;
                }
            }
            if (fail != null)
            {
                fail(name);
            }
            return false;
        }

        public bool GetField(out string field, string name, string fallback)
        {
            field = fallback;
            return this.GetField(ref field, name, (FieldNotFound)null);
        }

        public bool GetField(ref string field, string name, FieldNotFound fail = null)
        {
            if (this.IsObject)
            {
                int num = this.keys.IndexOf(name);
                if (num >= 0)
                {
                    field = this.list[num].str;
                    return true;
                }
            }
            if (fail != null)
            {
                fail(name);
            }
            return false;
        }

        public void GetField(string name, GetFieldResponse response, FieldNotFound fail = null)
        {
            if (response != null && this.IsObject)
            {
                int num = this.keys.IndexOf(name);
                if (num >= 0)
                {
                    response(this.list[num]);
                    return;
                }
            }
            if (fail != null)
            {
                fail(name);
            }
        }

        public JSONObject GetField(string name)
        {
            if (this.IsObject)
            {
                for (int i = 0; i < this.keys.Count; i++)
                {
                    if (this.keys[i] == name)
                    {
                        return this.list[i];
                    }
                }
            }
            return null;
        }

        public bool HasFields(string[] names)
        {
            if (!this.IsObject)
            {
                return false;
            }
            for (int i = 0; i < names.Length; i++)
            {
                if (!this.keys.Contains(names[i]))
                {
                    return false;
                }
            }
            return true;
        }

        public bool HasField(string name)
        {
            if (!this.IsObject)
            {
                return false;
            }
            for (int i = 0; i < this.keys.Count; i++)
            {
                if (this.keys[i] == name)
                {
                    return true;
                }
            }
            return false;
        }

        public void Clear()
        {
            this.type = Type.NULL;
            if (this.list != null)
            {
                this.list.Clear();
            }
            if (this.keys != null)
            {
                this.keys.Clear();
            }
            this.str = "";
            this.n = 0f;
            this.b = false;
        }

        public JSONObject Copy()
        {
            return JSONObject.Create(this.Print(true), -2, false, false);
        }

        public void Merge(JSONObject obj)
        {
            JSONObject.MergeRecur(this, obj);
        }

        private static void MergeRecur(JSONObject left, JSONObject right)
        {
            if (left.type == Type.NULL)
            {
                left.Absorb(right);
            }
            else if (left.type == Type.OBJECT && right.type == Type.OBJECT)
            {
                for (int i = 0; i < right.list.Count; i++)
                {
                    string text = right.keys[i];
                    if (right[i].isContainer)
                    {
                        if (left.HasField(text))
                        {
                            JSONObject.MergeRecur(left[text], right[i]);
                        }
                        else
                        {
                            left.AddField(text, right[i]);
                        }
                    }
                    else if (left.HasField(text))
                    {
                        left.SetField(text, right[i]);
                    }
                    else
                    {
                        left.AddField(text, right[i]);
                    }
                }
            }
            else if (left.type == Type.ARRAY && right.type == Type.ARRAY && right.Count <= left.Count)
            {
                for (int j = 0; j < right.list.Count; j++)
                {
                    if (left[j].type == right[j].type)
                    {
                        if (left[j].isContainer)
                        {
                            JSONObject.MergeRecur(left[j], right[j]);
                        }
                        else
                        {
                            left[j] = right[j];
                        }
                    }
                }
            }
        }

        public void Bake()
        {
            if (this.type != Type.BAKED)
            {
                this.str = this.Print(true);
                this.type = Type.BAKED;
            }
        }

        public IEnumerable BakeAsync()
        {
            if (this.type != Type.BAKED)
            {
                foreach (string item in this.PrintAsync(false))
                {
                    if (item == null)
                    {
                        yield return (object)item;
                    }
                    else
                    {
                        this.str = item;
                    }
                }
                this.type = Type.BAKED;
            }
        }

        public string Print(bool pretty = true)
        {
            StringBuilder stringBuilder = new StringBuilder();
            this.Stringify(0, stringBuilder, pretty);
            return stringBuilder.ToString();
        }

        public IEnumerable<string> PrintAsync(bool pretty = false)
        {
            StringBuilder builder = new StringBuilder();
            JSONObject.printWatch.Reset();
            JSONObject.printWatch.Start();
            foreach (IEnumerable item in this.StringifyAsync(0, builder, pretty))
            {
                IEnumerable enumerable = item;
                yield return (string)null;
            }
            yield return builder.ToString();
        }

        private IEnumerable StringifyAsync(int depth, StringBuilder builder, bool pretty = false)
        {
            int num = depth;
            depth = num + 1;
            if (num <= 100)
            {
                if (JSONObject.printWatch.Elapsed.TotalSeconds > 0.00800000037997961)
                {
                    JSONObject.printWatch.Reset();
                    yield return (object)null;
                    JSONObject.printWatch.Start();
                }
                switch (this.type)
                {
                    case Type.BAKED:
                        builder.Append(this.str);
                        break;
                    case Type.STRING:
                        builder.AppendFormat("\"{0}\"", this.str);
                        break;
                    case Type.NUMBER:
                        if (this.useInt)
                        {
                            builder.Append(this.i.ToString());
                        }
                        else if (float.IsInfinity(this.n))
                        {
                            builder.Append("\"INFINITY\"");
                        }
                        else if (float.IsNegativeInfinity(this.n))
                        {
                            builder.Append("\"NEGINFINITY\"");
                        }
                        else if (float.IsNaN(this.n))
                        {
                            builder.Append("\"NaN\"");
                        }
                        else
                        {
                            builder.Append(this.n.ToString());
                        }
                        break;
                    case Type.OBJECT:
                        builder.Append("{");
                        if (this.list.Count > 0)
                        {
                            if (pretty)
                            {
                                builder.Append("\n");
                            }
                            for (int i = 0; i < this.list.Count; i++)
                            {
                                string arg = this.keys[i];
                                JSONObject jSONObject = this.list[i];
                                if ((bool)jSONObject)
                                {
                                    if (pretty)
                                    {
                                        for (int m = 0; m < depth; m++)
                                        {
                                            builder.Append("\t");
                                        }
                                    }
                                    builder.AppendFormat("\"{0}\":", arg);
                                    foreach (IEnumerable item in jSONObject.StringifyAsync(depth, builder, pretty))
                                    {
                                        yield return (object)item;
                                    }
                                    builder.Append(",");
                                    if (pretty)
                                    {
                                        builder.Append("\n");
                                    }
                                }
                            }
                            if (pretty)
                            {
                                builder.Length -= 2;
                            }
                            else
                            {
                                builder.Length--;
                            }
                        }
                        if (pretty && this.list.Count > 0)
                        {
                            builder.Append("\n");
                            for (int n = 0; n < depth - 1; n++)
                            {
                                builder.Append("\t");
                            }
                        }
                        builder.Append("}");
                        break;
                    case Type.ARRAY:
                        builder.Append("[");
                        if (this.list.Count > 0)
                        {
                            if (pretty)
                            {
                                builder.Append("\n");
                            }
                            for (int i = 0; i < this.list.Count; i++)
                            {
                                if ((bool)this.list[i])
                                {
                                    if (pretty)
                                    {
                                        for (int k = 0; k < depth; k++)
                                        {
                                            builder.Append("\t");
                                        }
                                    }
                                    foreach (IEnumerable item2 in this.list[i].StringifyAsync(depth, builder, pretty))
                                    {
                                        yield return (object)item2;
                                    }
                                    builder.Append(",");
                                    if (pretty)
                                    {
                                        builder.Append("\n");
                                    }
                                }
                            }
                            if (pretty)
                            {
                                builder.Length -= 2;
                            }
                            else
                            {
                                builder.Length--;
                            }
                        }
                        if (pretty && this.list.Count > 0)
                        {
                            builder.Append("\n");
                            for (int l = 0; l < depth - 1; l++)
                            {
                                builder.Append("\t");
                            }
                        }
                        builder.Append("]");
                        break;
                    case Type.BOOL:
                        if (this.b)
                        {
                            builder.Append("true");
                        }
                        else
                        {
                            builder.Append("false");
                        }
                        break;
                    case Type.NULL:
                        builder.Append("null");
                        break;
                }
            }
        }

        private void Stringify(int depth, StringBuilder builder, bool pretty = true)
        {
            if (depth++ <= 100)
            {
                switch (this.type)
                {
                    case Type.BAKED:
                        builder.Append(this.str);
                        break;
                    case Type.STRING:
                        if (typeof(object).IsInstanceOfType(this.str))
                        {
                            this.str = this.str.Replace("\n", "\\n");
                        }
                        builder.AppendFormat("\"{0}\"", this.str);
                        break;
                    case Type.NUMBER:
                        if (this.useInt)
                        {
                            builder.Append(this.i.ToString());
                        }
                        else if (float.IsInfinity(this.n))
                        {
                            builder.Append("\"INFINITY\"");
                        }
                        else if (float.IsNegativeInfinity(this.n))
                        {
                            builder.Append("\"NEGINFINITY\"");
                        }
                        else if (float.IsNaN(this.n))
                        {
                            builder.Append("\"NaN\"");
                        }
                        else
                        {
                            builder.Append(this.n.ToString());
                        }
                        break;
                    case Type.OBJECT:
                        builder.Append("{");
                        if (this.list.Count > 0)
                        {
                            if (pretty)
                            {
                                builder.Append("\n");
                            }
                            for (int l = 0; l < this.list.Count; l++)
                            {
                                string arg = this.keys[l];
                                JSONObject jSONObject = this.list[l];
                                if ((bool)jSONObject)
                                {
                                    if (pretty)
                                    {
                                        for (int m = 0; m < depth; m++)
                                        {
                                            builder.Append("\t");
                                        }
                                    }
                                    builder.AppendFormat("\"{0}\":", arg);
                                    jSONObject.Stringify(depth, builder, pretty);
                                    builder.Append(",");
                                    if (pretty)
                                    {
                                        builder.Append("\n");
                                    }
                                }
                            }
                            if (pretty)
                            {
                                builder.Length -= 2;
                            }
                            else
                            {
                                builder.Length--;
                            }
                        }
                        if (pretty && this.list.Count > 0)
                        {
                            builder.Append("\n");
                            for (int n = 0; n < depth - 1; n++)
                            {
                                builder.Append("\t");
                            }
                        }
                        builder.Append("}");
                        break;
                    case Type.ARRAY:
                        builder.Append("[");
                        if (this.list.Count > 0)
                        {
                            if (pretty)
                            {
                                builder.Append("\n");
                            }
                            for (int i = 0; i < this.list.Count; i++)
                            {
                                if ((bool)this.list[i])
                                {
                                    if (pretty)
                                    {
                                        for (int j = 0; j < depth; j++)
                                        {
                                            builder.Append("\t");
                                        }
                                    }
                                    this.list[i].Stringify(depth, builder, pretty);
                                    builder.Append(",");
                                    if (pretty)
                                    {
                                        builder.Append("\n");
                                    }
                                }
                            }
                            if (pretty)
                            {
                                builder.Length -= 2;
                            }
                            else
                            {
                                builder.Length--;
                            }
                        }
                        if (pretty && this.list.Count > 0)
                        {
                            builder.Append("\n");
                            for (int k = 0; k < depth - 1; k++)
                            {
                                builder.Append("\t");
                            }
                        }
                        builder.Append("]");
                        break;
                    case Type.BOOL:
                        if (this.b)
                        {
                            builder.Append("true");
                        }
                        else
                        {
                            builder.Append("false");
                        }
                        break;
                    case Type.NULL:
                        builder.Append("null");
                        break;
                }
            }
        }

        public override string ToString()
        {
            return this.Print(true);
        }

        public string ToString(bool pretty)
        {
            return this.Print(pretty);
        }

        public string GetRawString()
        {
            return this.str;
        }

        public Dictionary<string, string> ToDictionary()
        {
            if (this.type == Type.OBJECT)
            {
                Dictionary<string, string> dictionary = new Dictionary<string, string>();
                for (int i = 0; i < this.list.Count; i++)
                {
                    JSONObject jSONObject = this.list[i];
                    switch (jSONObject.type)
                    {
                        case Type.STRING:
                            dictionary.Add(this.keys[i], jSONObject.str);
                            break;
                        case Type.NUMBER:
                            dictionary.Add(this.keys[i], string.Concat(jSONObject.n));
                            break;
                        case Type.BOOL:
                            dictionary.Add(this.keys[i], jSONObject.b.ToString() ?? "");
                            break;
                    }
                }
                return dictionary;
            }
            return null;
        }

        public static implicit operator bool(JSONObject o)
        {
            return o != null;
        }
    }

}