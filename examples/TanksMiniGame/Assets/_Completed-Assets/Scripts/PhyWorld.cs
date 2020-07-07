using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System;
public class PhyWorld : MonoBehaviour
{
  // Start is called before the first frame update
  public GameObject StaticWorld;
  public GameObject player1;
  public GameObject player2;

  class AABBInfo
  {
    public float minX;
    public float minY;
    public float minZ;
    public float maxX;
    public float maxY;
    public float maxZ;
  }
  class BoxEntity
  {
    public BoxCollider collider;
    public AABBInfo aabb;
  }
  List<BoxEntity> m_staticEntities = new List<BoxEntity>();
  List<BoxCollider> m_bulletEntities = new List<BoxCollider>();
  List<BoxEntity> m_playerEntities = new List<BoxEntity>();
  private AABBInfo GetAABB(BoxCollider box)
  {
    Vector3 pos = box.center + box.transform.position;
    AABBInfo aabb = new AABBInfo();
    aabb.minX = pos.x - box.size.x / 2;
    aabb.minY = pos.y - box.size.y / 2;
    aabb.minZ = pos.z - box.size.z / 2;
    aabb.maxX = pos.x + box.size.x / 2;
    aabb.maxY = pos.y + box.size.y / 2;
    aabb.maxZ = pos.z + box.size.z / 2;
    return aabb;
  }
  void Start()
  {
    var comps = StaticWorld.GetComponentsInChildren<BoxCollider>();
    foreach (BoxCollider box in comps)    //遍历所有gameobject
    {
      BoxEntity entity = new BoxEntity();
      entity.collider = box;
      entity.aabb = GetAABB(box);
      m_staticEntities.Add(entity);
    }
  }
  public void AddPlayer(BoxCollider box)
  {
    BoxEntity entity = new BoxEntity();
    entity.collider = box;
    entity.aabb = GetAABB(box);
    m_playerEntities.Add(entity);
  }
  public BoxCollider CheckCollideWithPlayer(BoxCollider box, int playerNum)
  {
    var a = GetAABB(box);
    foreach (BoxEntity entity in m_playerEntities)
    {
      if (playerNum == entity.collider.gameObject.GetComponent<Complete.TankShooting>().m_PlayerNumber)
      {
        continue;
      }
      var b = GetAABB(entity.collider);
      if ((a.minX <= b.maxX && a.maxX >= b.minX) &&
          (a.minY <= b.maxY && a.maxY >= b.minY) &&
          (a.minZ <= b.maxZ && a.maxZ >= b.minZ))
      {
        return entity.collider;
      }
    }
    return null;
  }
  public BoxCollider CheckCollideWithStatic(BoxCollider box)
  {
    var a = GetAABB(box);
    foreach (BoxEntity entity in m_staticEntities)
    {
      var b = entity.aabb;
      if ((a.minX <= b.maxX && a.maxX >= b.minX) &&
          (a.minY <= b.maxY && a.maxY >= b.minY) &&
          (a.minZ <= b.maxZ && a.maxZ >= b.minZ))
      {
        return entity.collider;
      }
    }
    return null;
  }
}