Bridge.assembly("minigame-adaptor-project", function ($asm, globals) {
    "use strict";

    Bridge.define("Complete.CameraControl", {
        inherits: [MiniGameAdaptor.MonoBehaviour],
        fields: {
            m_DampTime: 0,
            m_ScreenEdgeBuffer: 0,
            m_MinSize: 0,
            m_Targets: null,
            m_Camera: null,
            m_ZoomSpeed: 0,
            m_MoveVelocity: null,
            m_DesiredPosition: null
        },
        ctors: {
            init: function () {
                this.m_MoveVelocity = new MiniGameAdaptor.Vector3();
                this.m_DesiredPosition = new MiniGameAdaptor.Vector3();
                this.m_DampTime = 0.2;
                this.m_ScreenEdgeBuffer = 4.0;
                this.m_MinSize = 6.5;
            }
        },
        methods: {
            Awake: function () {
                this.m_Camera = this.GetComponentInChildren(MiniGameAdaptor.Camera);
            },
            Update: function () {
                // Move the camera towards a desired position.
                this.Move();

                // Change the size of the camera based.
                this.Zoom();
            },
            Move: function () {
                // Find the average position of the targets.
                this.FindAveragePosition();

                // Smoothly transition to that position.
                this.transform.position = MiniGameAdaptor.Vector3.SmoothDamp(this.transform.position.$clone(), this.m_DesiredPosition.$clone(), Bridge.ref(this, "m_MoveVelocity"), this.m_DampTime);
            },
            FindAveragePosition: function () {
                var averagePos = new MiniGameAdaptor.Vector3.ctor();
                var numTargets = 0;

                // Go through all the targets and add their positions together.
                for (var i = 0; i < this.m_Targets.length; i = (i + 1) | 0) {
                    // If the target isn't active, go on to the next one.
                    if (!this.m_Targets[System.Array.index(i, this.m_Targets)].gameObject.activeSelf) {
                        continue;
                    }

                    // Add to the average and increment the number of targets in the average.
                    averagePos = MiniGameAdaptor.Vector3.op_Addition(averagePos.$clone(), this.m_Targets[System.Array.index(i, this.m_Targets)].position.$clone());
                    numTargets = (numTargets + 1) | 0;
                }

                // If there are targets divide the sum of the positions by the number of them to find the average.
                if (numTargets > 0) {
                    averagePos = MiniGameAdaptor.Vector3.op_Division(averagePos.$clone(), numTargets);
                }

                // Keep the same y value.
                averagePos.y = this.transform.position.y;

                // The desired position is the average position;
                this.m_DesiredPosition = averagePos.$clone();
            },
            Zoom: function () {
                // Find the required size based on the desired position and smoothly transition to that size.
                var requiredSize = this.FindRequiredSize();

                this.m_Camera.orthographicSize = MiniGameAdaptor.Mathf.SmoothDamp(this.m_Camera.orthographicSize, requiredSize, Bridge.ref(this, "m_ZoomSpeed"), this.m_DampTime);
            },
            FindRequiredSize: function () {
                // Find the position the camera rig is moving towards in its local space.
                var desiredLocalPos = this.transform.InverseTransformPoint$1(this.m_DesiredPosition.$clone());

                // Start the camera's size calculation at zero.
                var size = 0.0;

                // Go through all the targets...
                for (var i = 0; i < this.m_Targets.length; i = (i + 1) | 0) {
                    // ... and if they aren't active continue on to the next target.
                    if (!this.m_Targets[System.Array.index(i, this.m_Targets)].gameObject.activeSelf) {
                        continue;
                    }

                    // Otherwise, find the position of the target in the camera's local space.
                    var targetLocalPos = this.transform.InverseTransformPoint$1(this.m_Targets[System.Array.index(i, this.m_Targets)].position.$clone());

                    // Find the position of the target from the desired position of the camera's local space.
                    var desiredPosToTarget = MiniGameAdaptor.Vector3.op_Subtraction(targetLocalPos.$clone(), desiredLocalPos.$clone());

                    // Choose the largest out of the current size and the distance of the tank 'up' or 'down' from the camera.
                    size = MiniGameAdaptor.Mathf.Max$2(size, MiniGameAdaptor.Mathf.Abs$1(desiredPosToTarget.y));

                    // Choose the largest out of the current size and the calculated size based on the tank being to the left or right of the camera.
                    size = MiniGameAdaptor.Mathf.Max$2(size, MiniGameAdaptor.Mathf.Abs$1(desiredPosToTarget.x) / this.m_Camera.aspect);
                }

                // Add the edge buffer to the size.
                size += this.m_ScreenEdgeBuffer;

                // Make sure the camera's size isn't below the minimum.
                size = MiniGameAdaptor.Mathf.Max$2(size, this.m_MinSize);

                return size;
            },
            SetStartPositionAndSize: function () {
                // Find the desired position.
                this.FindAveragePosition();

                // Set the camera's position to the desired position without damping.
                this.transform.position = this.m_DesiredPosition.$clone();

                // Find and set the required size of the camera.
                this.m_Camera.orthographicSize = this.FindRequiredSize();
            }
        }
    });
});
