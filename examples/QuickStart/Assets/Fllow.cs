using UnityEngine;
using System.Collections;

  public class Fllow : MonoBehaviour
  {
    public Transform player; // 主角位置
    public float speed = 5f; // 相机速度   
    Vector3 distance; // 主角和摄像机之间的距离                   


    void Start()
    {
     
      distance = transform.position - player.position;
    }

    void Update()
    {
      Vector3 targetCamPos = player.position + distance;

      transform.position = targetCamPos;
    }
  }
