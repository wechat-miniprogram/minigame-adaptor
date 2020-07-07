using System.Collections;
using System.Collections.Generic;
using UnityEngine;
public class ShellPool
{
  static List<GameObject> m_freeShellList = new List<GameObject>();
  public static GameObject Create(GameObject original, Vector3 position, Quaternion rotation)
  {
    if (m_freeShellList.Count == 0)
    {
      GameObject gameObject = UnityEngine.GameObject.Instantiate(original, position, rotation) as GameObject;
      gameObject.SetActive(true);
      return gameObject;
    }
    else
    {
      GameObject gameObject = m_freeShellList[m_freeShellList.Count - 1];
      m_freeShellList.RemoveAt(m_freeShellList.Count - 1);
      gameObject.SetActive(true);
      gameObject.transform.position = position;
      gameObject.transform.rotation = rotation;
      return gameObject;
    }
  }
  public static void Destroy(GameObject gameObject)
  {
    gameObject.SetActive(false);
    m_freeShellList.Add(gameObject);
  }

}