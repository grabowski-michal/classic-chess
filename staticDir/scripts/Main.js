function Main() {
    var gameEnabled = false;
    var nickLogged;
    var wins;
    var draws;
    var losses;
    var points;

    this.setStatistics = function (Wins, Draws, Losses, Points) {
        wins = Wins;
        draws = Draws;
        losses = Losses;
        points = Points;
    }

    this.getStatistics = function () {
        object = {
            wins: wins,
            draws: draws,
            losses: losses,
            points: points,
        }
        return object;
    }

    var szachownica =
    [
    [0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0],
    ];
    var pola_tab = [];
    for (let i = 0; i < 8; i++) { // generates 8x8 array
        pola_tab.push([]);
        for (let j = 0; j < 8; j++) {
            pola_tab[i].push('');
        }
    }
    var orbitControl;
    var ognie = [];

    var canvas;

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight);

    this.getNick = function () {
        return nickLogged;
    }

    this.changeColorOfPlace = function (x, y, color) {
        pola_tab[x][y].material = new THREE.MeshPhongMaterial({ side: THREE.DoubleSide, color: color, shininess: 60, });
    }

    this.clearColors = function () {
        for (var w = 0; w < szachownica.length; w++) {
            for (var k = 0; k < szachownica[0].length; k++) {
                if (szachownica[w][k] == 1) {
                    pola_tab[w][k].material = new THREE.MeshPhongMaterial({ side: THREE.DoubleSide, color: "#180000", shininess: 60, });
                }
                else {
                    pola_tab[w][k].material = new THREE.MeshPhongMaterial({ side: THREE.DoubleSide, color: 0xffffff, shininess: 60, });
                }
            }
        }
    }

    this.movePawn = function (x, y, xDes, yDes) {
        for (var i = 0; i < scene.children.length; i++) {
            if (scene.children[i].pawnData != undefined) {
                if (scene.children[i].pawnData.position.x == x && scene.children[i].pawnData.position.y == y) {
                    // console.log("poszed");
                    scene.children[i].pawnData.position.x = xDes;
                    scene.children[i].pawnData.position.y = yDes;
                    scene.children[i].position.set(pola_tab[xDes - 1][yDes - 1].position.x, 10, pola_tab[xDes - 1][yDes - 1].position.z);
                    game.getLocalTable[y - 1, x - 1];
                    // console.log(scene.children[i]);
                }
            }
        }
    }

    this.deletePawn = function (x, y) {
        for (var i = 0; i < scene.children.length; i++) {
            if (scene.children[i].pawnData != undefined) {
                if (scene.children[i].pawnData.position.x == x && scene.children[i].pawnData.position.y == y) {
                    // console.log("usuniety");
                    scene.remove(scene.children[i]);
                    game.getLocalTable[y - 1, x - 1];
                }
            }
        }
    }
	
	this.changeModel = function (x, y, type) {
        for (var i = 0; i < scene.children.length; i++) {
            if (scene.children[i].pawnData != undefined) {
                if (scene.children[i].pawnData.position.x == x && scene.children[i].pawnData.position.y == y) {
					// console.log ("zamiana modelu pionka");
                    scene.remove(scene.children[i]);
					var model = new Piece(game.getLocalTable()[y - 1][x - 1].type);
                    model.name = game.getLocalTable()[y - 1][x - 1].type + (y-1).toString() + (x-1).toString();
                    model.pawnData = { position: { x: game.getLocalTable()[y - 1][x - 1].position.x, y: game.getLocalTable()[y - 1][x - 1].position.y, }, type: game.getLocalTable()[y - 1][x - 1].type, color: game.getLocalTable()[y - 1][x - 1].color };

                    model.loadModel(game.getLocalTable()[y - 1][x - 1].src, function (modelData) {
						modelData.children[0].children[0].geometry.computeFaceNormals();              
						modelData.children[0].children[0].geometry.mergeVertices();
						modelData.children[0].children[0].geometry.computeVertexNormals();
							
                        modelData.children[0].children[0].material = new THREE.MeshPhongMaterial({
                            color: 0xFFFFFF,
							specular: 0x101010,
                            shininess: 60,
							polygonOffset: true,  
							polygonOffsetUnits: 1,
							polygonOffsetFactor: 1,
							shading: THREE.SmoothShading,
                            // wireframe: true,
                        });
                        modelData.position.set(pola_tab[modelData.pawnData.position.x - 1][modelData.pawnData.position.y - 1].position.x, 10, pola_tab[modelData.pawnData.position.x - 1][modelData.pawnData.position.y - 1].position.z);
                        scene.add(modelData);
                    })
                }
            }
        }
	}

    function createLight(x, y, z, lightColor, fireColor, distance, intensity, visibility) {
        var fire = new Fireplace(lightColor, fireColor, distance, intensity);
        fire.generateFireplace(x, y, z);
        if (visibility == false) fire.makeInvisible();
        ognie.push(fire);
    }

    function createChessboard() {
        var y = -350;
        var w = 0;

        for (var i = 0; i < 8; i++) {
            var k = 0;
            var x = -350;
            for (var j = 0; j < 8; j++) {
                var geometry = new THREE.BoxGeometry(100, 100, 20);
                if (szachownica[w][k] == 1) {
                    var material = new THREE.MeshPhongMaterial({ side: THREE.DoubleSide, color: "#180000", shininess: 60, });
                    var nazwa = 'sc' + i + j + '';
                }
                else {
                    var material = new THREE.MeshPhongMaterial({ side: THREE.DoubleSide, color: 0xFFFFFF, shininess: 60, });
                    var nazwa = 'sb' + i + j + '';
                }

                podloga = new THREE.Mesh(geometry, material);
                scene.add(podloga);
                podloga.position.set(x, 0, y);
                podloga.rotation.x = Math.PI / 2;
                podloga.name = nazwa;
                pola_tab[i][j] = podloga;
                x += 100;
                k++;
            }
            y += 100;
            w += 1;
        }
    }

    this.createPawns = function () { createPawns(); }

    function createPawns() {
        for (var i = 0; i < 8; i++) {
            for (var j = 0; j < 8; j++) {
                if (game.getLocalTable()[i][j] == 0) { } else {
                    if (game.getLocalTable()[i][j].color == "black") {
                        var model = new Piece(game.getLocalTable()[i][j].type);
                        model.name = game.getLocalTable()[i][j].type + i.toString() + j.toString();
                        model.pawnData = { position: { x: game.getLocalTable()[i][j].position.x, y: game.getLocalTable()[i][j].position.y, }, type: game.getLocalTable()[i][j].type, color: game.getLocalTable()[i][j].color };

                        model.loadModel(game.getLocalTable()[i][j].src, function (modelData) {
                            modelData.children[0].children[0].geometry.computeFaceNormals();
                            modelData.children[0].children[0].geometry.mergeVertices();
                            modelData.children[0].children[0].geometry.computeVertexNormals();

                            modelData.children[0].children[0].material = new THREE.MeshPhongMaterial({
                                color: "#180000",
                                specular: 0x101010,
                                shininess: 60,
                                polygonOffset: true,
                                polygonOffsetUnits: 1,
                                polygonOffsetFactor: 1,
                                shading: THREE.SmoothShading,
                                // wireframe: true,
                            });
                            if (modelData.pawnData.type == "King") {
                                modelData.rotation.y = 90 * Math.PI / 180;
                            }
                            modelData.position.set(pola_tab[modelData.pawnData.position.x - 1][modelData.pawnData.position.y - 1].position.x, 10, pola_tab[modelData.pawnData.position.x - 1][modelData.pawnData.position.y - 1].position.z);
                            scene.add(modelData);

                        })
                        // console.log('Dodano czarnego o nazwie: ' + model.name)
                    }
                    if (game.getLocalTable()[i][j].color == "white") {
                        var model = new Piece(game.getLocalTable()[i][j].type);
                        model.name = game.getLocalTable()[i][j].type + i.toString() + j.toString();
                        model.pawnData = { position: { x: game.getLocalTable()[i][j].position.x, y: game.getLocalTable()[i][j].position.y, }, type: game.getLocalTable()[i][j].type, color: game.getLocalTable()[i][j].color };

                        model.loadModel(game.getLocalTable()[i][j].src, function (modelData) {
                            modelData.children[0].children[0].geometry.computeFaceNormals();
                            modelData.children[0].children[0].geometry.mergeVertices();
                            modelData.children[0].children[0].geometry.computeVertexNormals();

                            modelData.children[0].children[0].material = new THREE.MeshPhongMaterial({
                                color: 0xFFFFFF,
                                specular: 0x101010,
                                shininess: 60,
                                polygonOffset: true,
                                polygonOffsetUnits: 1,
                                polygonOffsetFactor: 1,
                                shading: THREE.SmoothShading,
                                // wireframe: true,
                            });
                            modelData.rotation.y = Math.PI * 180 / 180;
                            if (modelData.pawnData.type == "King") {
                                modelData.rotation.y = (-90) * Math.PI / 180;
                            }
                            modelData.position.set(pola_tab[modelData.pawnData.position.x - 1][modelData.pawnData.position.y - 1].position.x, 10, pola_tab[modelData.pawnData.position.x - 1][modelData.pawnData.position.y - 1].position.z);
                            scene.add(modelData);
                        })
                        // console.log('Dodano białego o nazwie: ' + model.name)
                    }
                };
            }
        }
    }

    this.setCameraPosition = function (x, y, z) {
        camera.position.set(x, y, z);
        camera.lookAt(new THREE.Vector3());
    }

    function deletePawns() {
        for (var i = 0; i < scene.children.length; i++) {
            if (scene.children[i].pawnData != undefined) {
                scene.remove(scene.children[i]);
            }
        }
    }

    function init() {
        var renderer = new THREE.WebGLRenderer({ antialias: true, });
        renderer.setPixelRatio(2);

        orbitControl = new THREE.OrbitControls(camera, renderer.domElement);
        orbitControl.addEventListener('change', function () {
            renderer.render(scene, camera)
        });

        var s = window.getComputedStyle(document.getElementById("view"));
        var h = parseInt(s.getPropertyValue("height"));
        var w = parseInt(s.getPropertyValue("width"));
        renderer.setClearColor(0x000000);
        renderer.setSize(w, h);
        document.getElementById("view").appendChild(renderer.domElement);

        camera.position.set(0, 600, -600);
        camera.lookAt(new THREE.Vector3());

        createChessboard();
        createLight(50, 10, 525, "#eeaa66", 0xff0077, 300, 3, true);
        createLight(50, 10, -425, "#eeaa66", 0xff0077, 300, 3, true);
        createLight(-600, 100, 50, "#eeeeee", 0xffffff, 300, 1.5, false);
        createLight(600, 100, 50, "#eeeeee", 0xffffff, 300, 1.5, false);
        createLight(0, 300, 0, "#eeeeee", 0xffffff, 300, 1.25, false);
        // createPawns();

        function animateScene() {
            requestAnimationFrame(animateScene);
            renderer.render(scene, camera);

            var s = window.getComputedStyle(document.getElementById("view"));
            var h = parseInt(s.getPropertyValue("height"));
            var w = parseInt(s.getPropertyValue("width"));

            renderer.setSize(w, h);

            for(var i = 0; i < ognie.length; i++) {
                ognie[i].update();
            } 

            camera.updateProjectionMatrix();

            if (canvas != undefined) canvas.canvasUpdate(nickLogged, wins, draws, losses, points);
        }

        function onWindowResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }

        animateScene();
        camera.lookAt(scene.position);

        document.addEventListener("mousedown", onMouseDown, false);
        function onMouseDown(e) {
            if (game.isGameEnabled()) {
				if (e.button == 0) {
					var raycaster = new THREE.Raycaster();
					var mouseVector = new THREE.Vector2();

					mouseVector.x = (e.clientX / (window.innerWidth)) * 2 - 1;
					mouseVector.y = -(e.clientY / window.innerHeight) * 2 + 1;

					raycaster.setFromCamera(mouseVector, camera);

					intersects = raycaster.intersectObjects(scene.children, true);

					if (intersects[0] != undefined) {
						// console.log(intersects[0]);
						if (intersects[0].object.parent.parent != undefined) {
							if (intersects[0].object.parent.parent.pawnData != undefined) {
								var pos = intersects[0].object.parent.parent.pawnData.position;
								game.placeClicked(pos.x, pos.y);
							}
						} else {
							if (intersects[0].object.name[0] == 's') {
								var idd = intersects[0].object.name;
								var x = parseInt(idd[2]) + 1;
								var y = parseInt(idd[3]) + 1;
								game.placeClicked(x, y);
							}
						}
					}
				}
			}
        }
    }

    document.getElementById("rejestruj").addEventListener("click", function () {
        if (document.getElementById("user_reg").value != "") {
            if (document.getElementById("pass_reg").value != "") {
                net.getForRegister();
            } else {
                net.window.showWindow("Wpisz hasło!");
            }
        } else {
            net.window.showWindow("Wpisz nick!");
        }
    })

    document.getElementById("loguj").addEventListener("click", function () {
        if (document.getElementById("user_log").value != "") {
            if (document.getElementById("pass_log").value != "") {
                net.login(document.getElementById("user_log").value, document.getElementById("pass_log").value);
            } else {
                net.window.showWindow("Wpisz hasło!");
            }
        } else {
            net.window.showWindow("Wpisz nick!");
        }
    })

    this.zalogowano = function (nick) {
        nickLogged = nick;
        document.getElementById("pass_log").style.display = "none";
        document.getElementById("user_log").style.display = "none";
        document.getElementById("pass_reg").style.display = "none";
        document.getElementById("user_reg").style.display = "none";
        document.getElementById("loguj").style.display = "none";
        document.getElementById("rejestruj").style.display = "none";
        document.getElementById("szukajGracza").style.display = "initial";
        // document.getElementById("bariera").style.display = "none";

        canvas = new Canvas(0, 0);
        document.body.appendChild(canvas.canvas());

        document.getElementById("szukajGracza").addEventListener("click", function () {
            document.getElementById("szukajGracza").style.display = "none";
            document.getElementById("close").style.display = "none";
            net.window.showWindow("Czekaj na gracza...");
            net.searchForGames();
        });
    }

    init();
    net.checkAdmin();
}