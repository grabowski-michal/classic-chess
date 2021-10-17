function Fireplace(lightColor, fireColor, distance, intensity) {
    var material = new THREE.MeshBasicMaterial({
        color: fireColor,
        transparent: true,
        opacity: 0.5,
        depthWrite: false,
        blending: THREE.AdditiveBlending // kluczowy element zapewniający mieszanie kolorów poszczególnych cząsteczek
    });

    var geometry0 = new THREE.TetrahedronGeometry(5, 0);
    var geometry1 = new THREE.OctahedronGeometry(5, 0);
    var geometry2 = new THREE.DodecahedronGeometry(5, 0);

    var particles = [];
    var container = new THREE.Object3D();

    this.generateFireplace = function (x, y, z) {
        var fireLight = new THREE.SpotLight(lightColor, intensity, 2.5 * distance, 3.14);
        fireLight.position.set(0, 20, 0);
        fireLight.name = "fireLight";
        fireLight.castShadow = true;
        container.add(fireLight);
        for (var i = 0; i < 200; i++) {
            var random = Math.round(Math.random() * 3);
            var particle = new THREE.Mesh(geometry0, material.clone());
            switch (random) {
                case 0:
                    particle = new THREE.Mesh(geometry0, material.clone());
                    break;
                case 1:
                    particle = new THREE.Mesh(geometry1, material.clone());
                    break;
                case 2:
                    particle = new THREE.Mesh(geometry2, material.clone());
                    break;
            }
            particle.name = "fireplace";
            particle.position.y = (Math.random() * 0.1);
            particle.position.x = (Math.random() * 80) - 80;
            particle.position.z = (Math.random() * 80) - 80;
            particle.material.opacity = 1;
            particle.speed = (Math.random() * 10) + 2;
            var random1 = Math.floor((Math.random() * 10) + 1);
            particle.scale.set(random1*0.5, random1*0.5, random1*0.5);
            particles.push(particle);
            container.add(particle);
        }
        container.position.set(x, y, z);
        scene.add(container);
    }

    this.makeInvisible = function () {
        for (var i = 0; i < particles.length; i++) {
            container.remove(particles[i]);
        }
        particles = [];
    }

    this.update = function () {
        for (var i = 0; i < particles.length; i++) {
            if (particles[i].speed == undefined) particles[i].speed = (Math.random() * 10) + 2;
            particles[i].position.y += particles[i].speed;
            particles[i].material.opacity -= 0.015;
            if (particles[i].position.y > 500) {
                particles[i].position.y = (Math.random() * 0.1);
                particles[i].position.x = (Math.random() * 80) - 80;
                particles[i].position.z = (Math.random() * 80) - 80;
                particles[i].material.opacity = 1;
                particles[i].speed = (Math.random() * 10) + 2;
                var random1 = Math.floor((Math.random() * 10) + 1);
                particles[i].scale.set(random1 * 0.5, random1 * 0.5, random1 * 0.5);
            }
        }
    }

    this.getLight = function () {
        return container;
    }
}