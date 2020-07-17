Bridge.assembly("minigame-adaptor-project", function ($asm, globals) {
    "use strict";

    Bridge.define("Complete.GameManager", {
        inherits: [MiniGameAdaptor.MonoBehaviour],
        fields: {
            m_NumRoundsToWin: 0,
            m_StartDelay: 0,
            m_EndDelay: 0,
            m_CameraControl: null,
            m_TankPrefab: null,
            m_Tanks: null,
            m_PhyWorld: null,
            m_RoundNumber: 0,
            m_StartWait: null,
            m_EndWait: null,
            m_RoundWinner: null,
            m_GameWinner: null
        },
        ctors: {
            init: function () {
                this.m_NumRoundsToWin = 5;
                this.m_StartDelay = 3.0;
                this.m_EndDelay = 3.0;
            }
        },
        methods: {
            Start: function () {
                // Create the delays so they only have to be made once.
                this.m_StartWait = new MiniGameAdaptor.WaitForSeconds(this.m_StartDelay);
                this.m_EndWait = new MiniGameAdaptor.WaitForSeconds(this.m_EndDelay);

                this.SpawnAllTanks();
                this.SetCameraTargets();

                // Once the tanks have been created and the camera is using them as targets, start the game.
                this.StartCoroutine(this.GameLoop());

                var audio = this.gameObject.GetComponent(MiniGameAdaptor.AudioSource);
                MiniGameAdaptor.Resources.Load("BackgroundMusic", function (result) {
                    audio.clip = result;
                    audio.Play();
                });
            },
            SpawnAllTanks: function () {
                var Player1 = MiniGameAdaptor.GameObject.Find("Player1");
                var Player2 = MiniGameAdaptor.GameObject.Find("Player2");

                // For all the tanks...
                for (var i = 0; i < this.m_Tanks.length; i = (i + 1) | 0) {
                    this.m_Tanks[System.Array.index(i, this.m_Tanks)].m_PlayerNumber = (i + 1) | 0;
                    // 某个版本的插件动态初始化Prefab有问题，这里暂且改成不动态初始化prefab
                    // ... create them, set their player number and references needed for control.
                    //m_Tanks[i].m_Instance = Instantiate(m_TankPrefab, m_Tanks[i].m_SpawnPoint.position, m_Tanks[i].m_SpawnPoint.rotation) as GameObject;

                    if (i === 0) {
                        this.m_Tanks[System.Array.index(i, this.m_Tanks)].m_Instance = Player1;
                    } else {
                        this.m_Tanks[System.Array.index(i, this.m_Tanks)].m_Instance = Player2;
                    }
                    var phy = this.m_PhyWorld.GetComponent(PhyWorld);
                    var m_Movement = this.m_Tanks[System.Array.index(i, this.m_Tanks)].m_Instance.GetComponent(Complete.TankMovement);
                    var m_Shooting = this.m_Tanks[System.Array.index(i, this.m_Tanks)].m_Instance.GetComponent(Complete.TankShooting);
                    m_Movement.m_PhyWorld = phy;
                    m_Shooting.m_PhyWorld = phy;
                    phy.AddPlayer(this.m_Tanks[System.Array.index(i, this.m_Tanks)].m_Instance.GetComponent(MiniGameAdaptor.BoxCollider));

                    this.m_Tanks[System.Array.index(i, this.m_Tanks)].Setup();
                }
            },
            SetCameraTargets: function () {
                // Create a collection of transforms the same size as the number of tanks.
                var targets = System.Array.init(this.m_Tanks.length, null, MiniGameAdaptor.Transform);

                // For each of these transforms...
                for (var i = 0; i < targets.length; i = (i + 1) | 0) {
                    // ... set it to the appropriate tank transform.
                    targets[System.Array.index(i, targets)] = this.m_Tanks[System.Array.index(i, this.m_Tanks)].m_Instance.transform;
                }

                // These are the targets the camera should follow.
                this.m_CameraControl.m_Targets = targets;
            },
            GameLoop: function () {
                var $step = 0,
                    $jumpFromFinally,
                    $returnValue,
                    $async_e;

                var $enumerator = new Bridge.GeneratorEnumerator(Bridge.fn.bind(this, function () {
                    try {
                        for (;;) {
                            switch ($step) {
                                case 0: {
                                    // Start off by running the 'RoundStarting' coroutine but don't return until it's finished.
                                        $enumerator.current = this.StartCoroutine(this.RoundStarting());
                                        $step = 1;
                                        return true;
                                }
                                case 1: {
                                    // Once the 'RoundStarting' coroutine is finished, run the 'RoundPlaying' coroutine but don't return until it's finished.
                                        $enumerator.current = this.StartCoroutine(this.RoundPlaying());
                                        $step = 2;
                                        return true;
                                }
                                case 2: {
                                    // Once execution has returned here, run the 'RoundEnding' coroutine, again don't return until it's finished.
                                        $enumerator.current = this.StartCoroutine(this.RoundEnding());
                                        $step = 3;
                                        return true;
                                }
                                case 3: {
                                    // This code is not run until 'RoundEnding' has finished.  At which point, check if a game winner has been found.
                                        if (this.m_GameWinner != null) {
                                            // If there is a game winner, restart the level.
                                            //SceneManager.LoadScene (0);
                                            MiniGameAdaptor.Debug.Log("Game Over");
                                        } else {
                                            // If there isn't a winner yet, restart this coroutine so the loop continues.
                                            // Note that this coroutine doesn't yield.  This means that the current version of the GameLoop will end.
                                            this.StartCoroutine(this.GameLoop());
                                        }

                                }
                                default: {
                                    return false;
                                }
                            }
                        }
                    } catch($async_e1) {
                        $async_e = System.Exception.create($async_e1);
                        throw $async_e;
                    }
                }));
                return $enumerator;
            },
            RoundStarting: function () {
                var $step = 0,
                    $jumpFromFinally,
                    $returnValue,
                    $async_e;

                var $enumerator = new Bridge.GeneratorEnumerator(Bridge.fn.bind(this, function () {
                    try {
                        for (;;) {
                            switch ($step) {
                                case 0: {
                                    // As soon as the round starts reset the tanks and make sure they can't move.
                                        this.ResetAllTanks();
                                        this.DisableTankControl();

                                        // Snap the camera's zoom and position to something appropriate for the reset tanks.
                                        this.m_CameraControl.SetStartPositionAndSize();

                                        // Increment the round number and display text showing the players what round it is.
                                        this.m_RoundNumber = (this.m_RoundNumber + 1) | 0;
                                        //m_MessageText.text = "ROUND " + m_RoundNumber;

                                        // Wait for the specified length of time until yielding control back to the game loop.
                                        $enumerator.current = this.m_StartWait;
                                        $step = 1;
                                        return true;
                                }
                                case 1: {

                                }
                                default: {
                                    return false;
                                }
                            }
                        }
                    } catch($async_e1) {
                        $async_e = System.Exception.create($async_e1);
                        throw $async_e;
                    }
                }));
                return $enumerator;
            },
            RoundPlaying: function () {
                var $step = 0,
                    $jumpFromFinally,
                    $returnValue,
                    $async_e;

                var $enumerator = new Bridge.GeneratorEnumerator(Bridge.fn.bind(this, function () {
                    try {
                        for (;;) {
                            switch ($step) {
                                case 0: {
                                    // As soon as the round begins playing let the players control the tanks.
                                        this.EnableTankControl();

                                        // Clear the text from the screen.
                                        //m_MessageText.text = string.Empty;

                                        // While there is not one tank left.
                                    $step = 1;
                                    continue;
                                }
                                case 1: {
                                    if ( !this.OneTankLeft() ) {
                                            $step = 2;
                                            continue;
                                        } 
                                        $step = 4;
                                        continue;
                                }
                                case 2: {
                                    // ... return on the next frame.
                                        $enumerator.current = null;
                                        $step = 3;
                                        return true;
                                }
                                case 3: {
                                    
                                        $step = 1;
                                        continue;
                                }
                                case 4: {

                                }
                                default: {
                                    return false;
                                }
                            }
                        }
                    } catch($async_e1) {
                        $async_e = System.Exception.create($async_e1);
                        throw $async_e;
                    }
                }));
                return $enumerator;
            },
            RoundEnding: function () {
                var $step = 0,
                    $jumpFromFinally,
                    $returnValue,
                    $t,
                    message,
                    $async_e;

                var $enumerator = new Bridge.GeneratorEnumerator(Bridge.fn.bind(this, function () {
                    try {
                        for (;;) {
                            switch ($step) {
                                case 0: {
                                    MiniGameAdaptor.Debug.Log("RoundEngind");
                                        // Stop tanks from moving.
                                        this.DisableTankControl();

                                        // Clear the winner from the previous round.
                                        this.m_RoundWinner = null;

                                        // See if there is a winner now the round is over.
                                        this.m_RoundWinner = this.GetRoundWinner();

                                        // If there is a winner, increment their score.
                                        if (this.m_RoundWinner != null) {
                                            ($t = this.m_RoundWinner).m_Wins = ($t.m_Wins + 1) | 0;
                                        }

                                        // Now the winner's score has been incremented, see if someone has one the game.
                                        this.m_GameWinner = this.GetGameWinner();

                                        // Get a message based on the scores and whether or not there is a game winner and display it.
                                        message = this.EndMessage();
                                        //m_MessageText.text = message;

                                        // Wait for the specified length of time until yielding control back to the game loop.
                                        $enumerator.current = this.m_EndWait;
                                        $step = 1;
                                        return true;
                                }
                                case 1: {

                                }
                                default: {
                                    return false;
                                }
                            }
                        }
                    } catch($async_e1) {
                        $async_e = System.Exception.create($async_e1);
                        throw $async_e;
                    }
                }));
                return $enumerator;
            },
            OneTankLeft: function () {
                // Start the count of tanks left at zero.
                var numTanksLeft = 0;

                // Go through all the tanks...
                for (var i = 0; i < this.m_Tanks.length; i = (i + 1) | 0) {
                    // ... and if they are active, increment the counter.
                    if (this.m_Tanks[System.Array.index(i, this.m_Tanks)].m_Instance.activeSelf) {
                        numTanksLeft = (numTanksLeft + 1) | 0;
                    }
                }

                // If there are one or fewer tanks remaining return true, otherwise return false.
                return numTanksLeft <= 1;
            },
            GetRoundWinner: function () {
                // Go through all the tanks...
                for (var i = 0; i < this.m_Tanks.length; i = (i + 1) | 0) {
                    MiniGameAdaptor.Debug.Log(Bridge.box(this.m_Tanks[System.Array.index(i, this.m_Tanks)].m_Instance.activeSelf, System.Boolean, System.Boolean.toString));
                    // ... and if one of them is active, it is the winner so return it.
                    if (this.m_Tanks[System.Array.index(i, this.m_Tanks)].m_Instance.activeSelf) {
                        return this.m_Tanks[System.Array.index(i, this.m_Tanks)];
                    }
                }

                // If none of the tanks are active it is a draw so return null.
                return null;
            },
            GetGameWinner: function () {
                // Go through all the tanks...
                for (var i = 0; i < this.m_Tanks.length; i = (i + 1) | 0) {
                    // ... and if one of them has enough rounds to win the game, return it.
                    if (this.m_Tanks[System.Array.index(i, this.m_Tanks)].m_Wins === this.m_NumRoundsToWin) {
                        return this.m_Tanks[System.Array.index(i, this.m_Tanks)];
                    }
                }

                // If no tanks have enough rounds to win, return null.
                return null;
            },
            EndMessage: function () {
                // By default when a round ends there are no winners so the default end message is a draw.
                var message = "DRAW!";

                // If there is a winner then change the message to reflect that.
                if (this.m_RoundWinner != null) {
                    message = (this.m_RoundWinner.m_ColoredPlayerText || "") + " WINS THE ROUND!";
                }

                // Add some line breaks after the initial message.
                message = (message || "") + "\n\n\n\n";

                // Go through all the tanks and add each of their scores to the message.
                for (var i = 0; i < this.m_Tanks.length; i = (i + 1) | 0) {
                    message = (message || "") + (((this.m_Tanks[System.Array.index(i, this.m_Tanks)].m_ColoredPlayerText || "") + ": " + this.m_Tanks[System.Array.index(i, this.m_Tanks)].m_Wins + " WINS\n") || "");
                }

                // If there is a game winner, change the entire message to reflect that.
                if (this.m_GameWinner != null) {
                    message = (this.m_GameWinner.m_ColoredPlayerText || "") + " WINS THE GAME!";
                }

                return message;
            },
            ResetAllTanks: function () {
                for (var i = 0; i < this.m_Tanks.length; i = (i + 1) | 0) {
                    this.m_Tanks[System.Array.index(i, this.m_Tanks)].Reset();
                }
            },
            EnableTankControl: function () {
                for (var i = 0; i < this.m_Tanks.length; i = (i + 1) | 0) {
                    this.m_Tanks[System.Array.index(i, this.m_Tanks)].EnableControl();
                }
            },
            DisableTankControl: function () {
                for (var i = 0; i < this.m_Tanks.length; i = (i + 1) | 0) {
                    this.m_Tanks[System.Array.index(i, this.m_Tanks)].DisableControl();
                }
            }
        }
    });
});
