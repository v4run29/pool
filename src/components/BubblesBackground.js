"use client";

import React, { useRef, useEffect } from "react";
import * as THREE from "three";

export default function BubblesBackground() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    
    // Ambient fog for deep dark navy blue space depth
    scene.fog = new THREE.FogExp2(0x020617, 0.0025);

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    camera.position.set(0, 0, 150);

    // 2. Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    // 3. Lights
    const ambientLight = new THREE.AmbientLight(0x0a192f, 1.5);
    scene.add(ambientLight);

    // Dynamic bright cyan/neon lights
    const cyanLight = new THREE.PointLight(0x06b6d4, 15, 200);
    cyanLight.position.set(50, 50, 50);
    scene.add(cyanLight);

    const blueLight = new THREE.PointLight(0x3b82f6, 10, 200);
    blueLight.position.set(-50, -50, 30);
    scene.add(blueLight);

    // 4. Custom GLSL Shader for Liquid Glass Wave / Splash
    // simplex noise function inside vertex shader to morph water shape dynamically
    const vertexShader = `
      uniform float uTime;
      uniform vec2 uMouse;
      varying vec3 vNormal;
      varying vec3 vViewPosition;
      varying vec3 vWorldPosition;
      varying vec2 vUv;

      // Description : Array and textureless GLSL 2D/3D/4D simplex 
      //               noise functions.
      //      Author : Ian McEwan, Ashima Arts.
      //  Maintainer : ijm
      //     Lastmod : 20110822 (ijm)
      //     License : Copyright (C) 2011 Ashima Arts. All rights reserved.
      //               Distributed under the MIT License. See LICENSE file.
      //               https://github.com/ashima/webgl-noise
      
      vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
      vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

      float snoise(vec3 v) { 
        const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
        const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

        vec3 i  = floor(v + dot(v, C.yyy) );
        vec3 x0 =   v - i + dot(i, C.xxx) ;

        vec3 g = step(x0.yzx, x0.xyz);
        vec3 l = 1.0 - g;
        vec3 i1 = min( g.xyz, l.zxy );
        vec3 i2 = max( g.xyz, l.zxy );

        vec3 x1 = x0 - i1 + C.xxx;
        vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.xxx = C.yyy
        vec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.xxx = -0.5 = -D.yyy

        i = mod289(i); 
        vec4 p = permute( permute( permute( 
                   i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
                 + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
                 + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

        float n_ = 0.142857142857; // 1.0/7.0
        vec3  ns = n_ * D.wyz - D.xzx;

        vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)

        vec4 x_ = floor(j * ns.z);
        vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)

        vec4 x = x_ *ns.x + ns.yyyy;
        vec4 y = y_ *ns.x + ns.yyyy;
        vec4 h = 1.0 - abs(x) - abs(y);

        vec4 b0 = vec4( x.xy, y.xy );
        vec4 b1 = vec4( x.zw, y.zw );

        vec4 s0 = floor(b0)*2.0 + 1.0;
        vec4 s1 = floor(b1)*2.0 + 1.0;
        vec4 sh = -step(h, vec4(0.0));

        vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
        vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

        vec3 p0 = vec3(a0.xy,h.x);
        vec3 p1 = vec3(a0.zw,h.y);
        vec3 p2 = vec3(a1.xy,h.z);
        vec3 p3 = vec3(a1.zw,h.w);

        vec4 sig = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
        p0 *= sig.x;
        p1 *= sig.y;
        p2 *= sig.z;
        p3 *= sig.w;

        vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
        m = m * m;
        return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), 
                                      dot(p2,x2), dot(p3,x3) ) );
      }

      void main() {
        vUv = uv;
        vec3 pos = position;

        // Apply multiple layers of noise to create a morphing liquid glass splash
        float noise1 = snoise(vec3(pos.x * 0.015 - uTime * 0.4, pos.y * 0.015, uTime * 0.1));
        float noise2 = snoise(vec3(pos.y * 0.02, pos.z * 0.02 - uTime * 0.3, pos.x * 0.01));
        
        // Accumulate displacements
        float displacement = noise1 * 14.0 + noise2 * 6.0;
        
        // Add interactive mouse push/pull deformation
        float d = distance(pos.xy, uMouse * 80.0);
        if (d < 70.0) {
          float force = (70.0 - d) / 70.0;
          displacement += sin(d * 0.12 - uTime * 5.0) * force * 15.0;
        }

        pos += normal * displacement;

        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
        gl_Position = projectionMatrix * mvPosition;

        vNormal = normalMatrix * normal;
        vViewPosition = -mvPosition.xyz;
        vWorldPosition = (modelMatrix * vec4(pos, 1.0)).xyz;
      }
    `;

    const fragmentShader = `
      uniform vec3 uColor;
      uniform vec3 uNeonColor;
      uniform float uTime;
      varying vec3 vNormal;
      varying vec3 vViewPosition;
      varying vec3 vWorldPosition;

      void main() {
        vec3 normal = normalize(vNormal);
        vec3 viewDir = normalize(vViewPosition);

        // Specular reflections (highly shiny glossy liquid glass)
        vec3 lightDir = normalize(vec3(1.5, 2.0, 2.0));
        vec3 halfDir = normalize(lightDir + viewDir);
        float spec = pow(max(dot(normal, halfDir), 0.0), 256.0);
        vec3 specularReflection = vec3(1.0, 1.0, 1.0) * spec * 2.5;

        // Secondary rim specular highlights (Blue Neon glow)
        vec3 lightDir2 = normalize(vec3(-2.0, -1.5, 1.0));
        vec3 halfDir2 = normalize(lightDir2 + viewDir);
        float spec2 = pow(max(dot(normal, halfDir2), 0.0), 32.0);
        vec3 specularNeon = uNeonColor * spec2 * 1.5;

        // Fresnel term for glass transparency & refraction (glancing angles reflect, facing angles transmit)
        float fresnel = pow(1.0 - max(dot(normal, viewDir), 0.0), 4.0);

        // Blend deep navy base color with bright neon refraction highlights
        vec3 baseColor = mix(uColor, uNeonColor, fresnel * 0.7);
        vec3 ambient = vec3(0.01, 0.03, 0.08);

        // Under-liquid glow
        float glow = sin(vWorldPosition.x * 0.05 + uTime) * 0.1 + 0.1;
        vec3 glowColor = uNeonColor * glow;

        vec3 finalColor = ambient + baseColor * (0.2 + fresnel * 0.8) + specularReflection + specularNeon + glowColor;

        // High transparency inside the splash, high gloss on grazing rims
        float alpha = 0.35 + fresnel * 0.6;

        gl_FragColor = vec4(finalColor, alpha);
      }
    `;

    // 5. Build meshes
    // A. The Main 3D Liquid Splash (Icosahedron shape deforms to look like morphing liquid glass splash)
    const splashGeometry = new THREE.IcosahedronGeometry(35, 5); // Dense vertices for organic flow deforms
    const splashMaterial = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uColor: { value: new THREE.Color(0x0b192f) }, // Dark navy
        uNeonColor: { value: new THREE.Color(0x06b6d4) }, // Neon cyan
      },
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: true,
      depthTest: true
    });

    const splashMesh = new THREE.Mesh(splashGeometry, splashMaterial);
    splashMesh.position.set(-15, 5, -10);
    scene.add(splashMesh);

    // B. Flowing Waves Geometry in the background (Double-layered Plane deforming horizontally)
    const wavesGeometry = new THREE.PlaneGeometry(300, 150, 60, 60);
    const wavesMaterial = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uColor: { value: new THREE.Color(0x030712) }, // Near black navy
        uNeonColor: { value: new THREE.Color(0x1d4ed8) }, // Deeper blue highlights
      },
      transparent: true,
      side: THREE.DoubleSide,
    });

    const wavesMesh = new THREE.Mesh(wavesGeometry, wavesMaterial);
    wavesMesh.position.set(0, -35, -40);
    wavesMesh.rotation.x = -Math.PI / 3; // Slanted plane
    scene.add(wavesMesh);

    // C. 3D Floating Droplets
    const dropletGeometry = new THREE.SphereGeometry(1.2, 16, 16);
    const dropletMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.95, // Glass refraction
      opacity: 1,
      transparent: true,
      roughness: 0.05,
      metalness: 0.1,
      ior: 1.333, // Water refractive index
      thickness: 1.5,
      specularIntensity: 2.0,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05
    });

    const droplets = [];
    const dropletCount = 35;
    for (let i = 0; i < dropletCount; i++) {
      const dropletMesh = new THREE.Mesh(dropletGeometry, dropletMaterial);
      
      // Random coordinates around splash
      dropletMesh.position.set(
        (Math.random() - 0.5) * 140,
        (Math.random() - 0.5) * 80,
        (Math.random() - 0.5) * 40 - 10
      );

      // Random scale and speed variables
      const scale = 0.4 + Math.random() * 0.9;
      dropletMesh.scale.set(scale, scale, scale);
      
      dropletMesh.userData = {
        speedY: 0.15 + Math.random() * 0.35,
        speedX: (Math.random() - 0.5) * 0.05,
        wobbleSpeed: 0.02 + Math.random() * 0.03,
        wobbleRange: 1 + Math.random() * 2,
        angle: Math.random() * Math.PI * 2,
        startY: dropletMesh.position.y
      };

      scene.add(dropletMesh);
      droplets.push(dropletMesh);
    }

    // 6. Interactive Mouse Movement Listener
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const handleMouseMove = (e) => {
      // Normalize to -1 to +1 coordinates
      mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // 7. Responsive scaling handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    // 8. Animation Loop
    const clock = new THREE.Clock();
    let animationFrameId;

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Interpolate mouse coordinates for smooth lagging ripple dynamics
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Update uniforms for GLSL shaders
      splashMaterial.uniforms.uTime.value = elapsedTime;
      splashMaterial.uniforms.uMouse.value.set(mouse.x, mouse.y);

      wavesMaterial.uniforms.uTime.value = elapsedTime;
      wavesMaterial.uniforms.uMouse.value.set(mouse.x, mouse.y);

      // Rotate splash mesh gently in infinite loop
      splashMesh.rotation.y = elapsedTime * 0.04;
      splashMesh.rotation.x = elapsedTime * 0.02;

      // Animate floating droplets
      droplets.forEach((d) => {
        d.position.y += d.userData.speedY;
        d.userData.angle += d.userData.wobbleSpeed;
        d.position.x += Math.sin(d.userData.angle) * 0.08 + d.userData.speedX;

        // Reset droplet when it floats too high
        if (d.position.y > 60) {
          d.position.y = -60;
          d.position.x = (Math.random() - 0.5) * 140;
        }
      });

      // Render scene
      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      container.removeChild(renderer.domElement);
      
      // Dispose resources
      splashGeometry.dispose();
      splashMaterial.dispose();
      wavesGeometry.dispose();
      wavesMaterial.dispose();
      dropletGeometry.dispose();
      dropletMaterial.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 block bg-slate-950"
      style={{
        background: "linear-gradient(to bottom, #020617, #030712 60%, #090d16)"
      }}
    />
  );
}
