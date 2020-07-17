
#if UNITY_EDITOR
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System;

[AttributeUsage(AttributeTargets.All)]
public sealed class WeAppToolAtrribute : Attribute
{
	private readonly string _name;

	public string Name
	{
		get { return _name; }
	}

	public WeAppToolAtrribute(string name)
	{
		_name = name;
	}
}

#endif