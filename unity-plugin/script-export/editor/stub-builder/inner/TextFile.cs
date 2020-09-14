using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

public class TextFile
{
    public TextFile()
    {
    }
    public TextFile(TextFile par, string t)
    {
        parent = par;
        text = t;
    }
    TextFile parent;
    public string text;
    public string tag;

    List<TextFile> ch;
    public List<TextFile> Ch
    {
        get
        {
            if (ch == null)
                ch = new List<TextFile>();
            return ch;
        }
    }
	// 在调用这个函数之前，tf必须已经填好了
	public TextFile Add(List<TextFile> tfs)
	{
		Ch.AddRange(tfs);
		return this;
	}
    public TextFile Add(Func<List<TextFile>> func)
    {
        var lst = func();
        if (lst != null)
            Ch.AddRange(lst);
        return this;
    }

    public TextFile AddStringOrTextFile(object obj)
    {
        if (obj is string)
            Add(obj as string);
        else if (obj is TextFile)
            Add((obj as TextFile).Ch);
        else
            throw new Exception("obj should be string or TextFile");
        return this;
    }
    public TextFile Add(string format, params object[] args)
    {
        Ch.Add(new TextFile(this, 
            args.Length > 0 ? string.Format(null, format, args) : format
            ));
        return this;
    }

    static int lineTabCount(string line)
    {
        int empty = 0;
        for (int i = 0; i < line.Length; i++)
        {
            if (line[i] != ' ')
                break;
            empty++;
        }
        return empty / 4;
    }
    public TextFile AddMultiline(string format, params object[] args)
    {
        string s = args.Length > 0 ? string.Format(null, format, args) : format;
        string[] arr = s.Split("\r\n".ToCharArray(), StringSplitOptions.RemoveEmptyEntries);
        //TextFile tf = this;
        //int lastTab = 0;
        for (int i = 0; i < arr.Length; i++)
        {
//             int tab = lineTabCount(arr[i]);
//             int t = tab;
//             while (t > lastTab)
//             {
//                 tf = tf.In();
//                 t--;
//             }
//             while (t < lastTab)
//             {
//                 tf = tf.Out();
//                 t++;
//             }
//             tf.Add(arr[i]);
//             lastTab = tab;

            Add(arr[i]);
        }
        return this;
    }

    public TextFile AddLine()
    {
        return Add(" ");
    }
    public TextFile AddTag(string tag)
    {
        var c = new TextFile(this, "");
        c.tag = tag;
        Ch.Add(c);
        return this;
    }
    public TextFile FindByTag(string tag)
    {
        if (this.tag == tag)
            return this;

        if (ch != null)
        {   
            foreach (var c in ch)
            {
                TextFile r = c.FindByTag(tag);
                if (r != null)
                    return r;
            }
        }
        return null;
    }

    public TextFile ProSetIn()
    {
        return Add("set").BraceIn();
    }
    public TextFile ProGetIn()
    {
        return Add("get").BraceIn();
    }

    public TextFile BraceIn()
    {
        return Add("{").In();
    }

    public TextFile In()
    {
        if (Ch.Count == 0)
            Add("");
        return Ch[Ch.Count - 1];
    }

    public TextFile ProSetOut()
    {
        return BraceOut();
    }
    public TextFile ProGetOut()
    {
        return BraceOut();
    }
    public TextFile BraceOut()
    {
        return Out().Add("}");
    }
    public TextFile BraceOutSC()
    {
        return Out().Add("};");
    }
    public TextFile BraceOutComma()
    {
        return Out().Add("},");
    }
    public TextFile Out()
    {
        return parent;
    }

    public string Format(int layer = 0)
    {
        StringBuilder sb = new StringBuilder();

        FormatInternal(layer, sb);
        return sb.ToString();
    }

    void FormatInternal(int layer, StringBuilder sb)
    {
        if (!string.IsNullOrEmpty(text))
        {
            sb.Append(text.PadLeft(text.Length + layer * 4, ' '));
        }

        if (ch != null)
        {
            foreach (var c in ch)
            {
                if (!string.IsNullOrEmpty(c.text))
                    sb.AppendLine();
                c.FormatInternal(layer + 1, sb);
            }
        }
    }
}
