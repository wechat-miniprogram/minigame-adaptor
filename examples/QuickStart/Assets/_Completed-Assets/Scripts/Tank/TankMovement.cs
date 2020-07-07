using UnityEngine;

public class TankMovement : MonoBehaviour {
  private ParticleSystem[] m_particleSystems; // References to all the particles systems used by the Tanks

  private bool flag = false;
  private UnityEngine.Vector3 origin;
  public const float sensitivity = 0.01f;

  private void OnEnable () {
    m_particleSystems = GetComponentsInChildren<ParticleSystem> ();
    for (int i = 0; i < m_particleSystems.Length; ++i) {
      m_particleSystems[i].Play ();
    }
  }

  private void Update () {
    if (UnityEngine.Input.GetMouseButtonDown (0)) {
      if (!flag) {
        flag = true;
        origin = UnityEngine.Input.mousePosition;
      }

    }
    if (flag) {
      var dir = new UnityEngine.Vector3 ((origin.x - UnityEngine.Input.mousePosition.x) * sensitivity,
        0.0f, (origin.y - UnityEngine.Input.mousePosition.y) * sensitivity);

      if (dir.magnitude < 0.00000001f) {
        if (UnityEngine.Input.GetMouseButtonUp (0)) {
          flag = false;
        }
        return;
      }

      if (dir.magnitude > 0.1f) {
        dir = dir.normalized * 0.1f;
      }
      var backup = this.gameObject.transform.position;

      this.gameObject.transform.position = this.gameObject.transform.position - dir;
      this.gameObject.transform.forward = -dir.normalized;
    }
    if (UnityEngine.Input.GetMouseButtonUp (0)) {
      flag = false;
    }
  }
}