Bridge.assembly("minigame-adaptor-project", function ($asm, globals) {
    "use strict";

    Bridge.define("Complete.TankManager", {
        fields: {
            m_PlayerColor: null,
            m_SpawnPoint: null,
            m_PlayerNumber: 0,
            m_ColoredPlayerText: null,
            m_Instance: null,
            m_Wins: 0,
            m_Movement: null,
            m_Shooting: null,
            m_CanvasGameObject: null
        },
        ctors: {
            init: function () {
                this.m_PlayerColor = new MiniGameAdaptor.Color();
            }
        },
        methods: {
            Setup: function () {
                // Get references to the components.
                this.m_Movement = this.m_Instance.GetComponent(Complete.TankMovement);
                this.m_Shooting = this.m_Instance.GetComponent(Complete.TankShooting);
                //m_CanvasGameObject = m_Instance.GetComponentInChildren<Canvas> ().gameObject;

                // Set the player numbers to be consistent across the scripts.
                this.m_Movement.m_PlayerNumber = this.m_PlayerNumber;
                this.m_Shooting.m_PlayerNumber = this.m_PlayerNumber;

                // Create a string using the correct color that says 'PLAYER 1' etc based on the tank's color and the player's number.
                this.m_ColoredPlayerText = "<color=#" + (MiniGameAdaptor.ColorUtility.ToHtmlStringRGB(this.m_PlayerColor.$clone()) || "") + ">PLAYER " + this.m_PlayerNumber + "</color>";

                // Get all of the renderers of the tank.
                var renderers = this.m_Instance.GetComponentsInChildren(MiniGameAdaptor.MeshRenderer);

                // Go through all the renderers...
                for (var i = 0; i < renderers.length; i = (i + 1) | 0) {
                    // ... set their material color to the color specific to this tank.
                    renderers[System.Array.index(i, renderers)].material.color = this.m_PlayerColor.$clone();
                }
            },
            DisableControl: function () {
                this.m_Movement.enabled = false;
                this.m_Shooting.enabled = false;

                //m_CanvasGameObject.SetActive (false);
            },
            EnableControl: function () {
                this.m_Movement.enabled = true;
                this.m_Shooting.enabled = true;

                //m_CanvasGameObject.SetActive (true);
            },
            Reset: function () {
                this.m_Instance.transform.position = this.m_SpawnPoint.position.$clone();
                this.m_Instance.transform.rotation = this.m_SpawnPoint.rotation.$clone();

                this.m_Instance.SetActive(false);
                this.m_Instance.SetActive(true);
            }
        }
    });
});
