import React, { useRef } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import * as THREE from 'three'

import EarthDayMap from '../../assets/textures/8k_earth_daymap.jpg'
import EarthNormalMap from '../../assets/textures/8k_earth_normal_map.jpg'
import EarthSpecularMap from '../../assets/textures/8k_earth_specular_map.jpg'
import EarthCloudsMap from '../../assets/textures/8k_earth_clouds.jpg'
import MoonSpecularMap from '../../assets/textures/moonbump1k.jpg'
import MoonDayMap from '../../assets/textures/moonmap1k.jpg'
import MoonNormalMap from '../../assets/textures/moon_normal.jpg'
import { TextureLoader } from 'three'

export function Earth() {
  const [
    colorMap,
    normalMap,
    specularMap,
    cloudsMap,
    moonDayMap,
    moonSpecularMap,
    moonNormalMap,
  ] = useLoader(TextureLoader, [
    EarthDayMap,
    EarthNormalMap,
    EarthSpecularMap,
    EarthCloudsMap,
    MoonDayMap,
    MoonSpecularMap,
    MoonNormalMap,
  ])

  const earthRef = useRef()
  const cloudsRef = useRef()
  const moonRef = useRef()

  var r = 3.5
  var theta = 0
  var dTheta = (2 * Math.PI) / 1000

  useFrame(() => {
    earthRef.current.rotation.y -= 0.0005
    cloudsRef.current.rotation.y -= 0.0005
    theta += dTheta
    moonRef.current.position.x = r * Math.cos(theta)
    moonRef.current.position.z = r * Math.sin(theta)
  })

  return (
    <>
      <pointLight color="#f6f3ea" position={[2, 0, 5]} intensity={1.2} />
      <Stars
        radius={300}
        depth={60}
        count={20000}
        factor={7}
        saturation={0}
        fade={true}
      />
      <mesh ref={cloudsRef}>
        <sphereGeometry args={[2.5005, 50, 50]} />
        <meshPhongMaterial
          map={cloudsMap}
          opacity={0.4}
          depthWrite={true}
          transparent={true}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh ref={earthRef}>
        <sphereGeometry args={[2.5, 50, 50]} />
        <meshPhongMaterial specularMap={specularMap} />
        <meshStandardMaterial
          map={colorMap}
          normalMap={normalMap}
          metalness={0.4}
          roughness={0.7}
        />
      </mesh>
      <mesh ref={moonRef} postiton={[3.5, 0, 0]}>
        <sphereGeometry args={[0.35, 50, 50]} />
        <meshPhongMaterial specularMap={moonSpecularMap} />
        <meshStandardMaterial
          map={moonDayMap}
          normalMap={moonNormalMap}
          metalness={0.4}
          roughness={0.7}
        />
      </mesh>
    </>
  )
}
