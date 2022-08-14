import * as THREE from 'three'
import { useRef,useEffect } from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { render } from 'react-dom';
import { directionalLightHelper, PCFShadowMap } from 'three';
export default function Home() {
  const mountRef = useRef(null);



  useEffect(() => {
    
    
    // Scene
    const scene = new THREE.Scene()
    //Fog
    const fog=new THREE.Fog('#262837',1,15)
    scene.fog=fog    
    //Texture
      //DoorTextures
    const textureLoader=new THREE.TextureLoader()
    const doorColor=textureLoader.load('textures/door/color.jpg')
    const doorAlpha=textureLoader.load('textures/door/alpha.jpg')
    const doorAmbient=textureLoader.load('textures/door/ambientOcclusion.jpg')
    const doorHeight=textureLoader.load('textures/door/height.jpg')
    const doorNormal=textureLoader.load('textures/door/normal.jpg')
    const doorMetal=textureLoader.load('textures/door/metalness.jpg')
    const doorRough=textureLoader.load('textures/door/roughness.jpg')
      //WallTextures
    const bricksColor=textureLoader.load('textures/bricks/color.jpg')
    const bricksAmbient=textureLoader.load('textures/bricks/ambientOcclusion.jpg')
    const bricksNormal=textureLoader.load('textures/bricks/normal.jpg')
    const bricksRough=textureLoader.load('textures/bricks/roughness.jpg')
    
    //GrassTextures
    const grassColor=textureLoader.load('textures/grass/color.jpg')
    const grassAmbient=textureLoader.load('textures/grass/ambientOcclusion.jpg')
    const grassNormal=textureLoader.load('textures/grass/normal.jpg')
    const grassRough=textureLoader.load('textures/grass/roughness.jpg')
    
    grassColor.repeat.set(8,8)
    grassAmbient.repeat.set(8,8)
    grassNormal.repeat.set(8,8)
    grassRough.repeat.set(8,8)

    grassColor.wrapS=THREE.RepeatWrapping
    grassAmbient.wrapS=THREE.RepeatWrapping
    grassNormal.wrapS=THREE.RepeatWrapping
    grassRough.wrapS=THREE.RepeatWrapping
    
    grassColor.wrapT=THREE.RepeatWrapping
    grassAmbient.wrapT=THREE.RepeatWrapping
    grassNormal.wrapT=THREE.RepeatWrapping
    grassRough.wrapT=THREE.RepeatWrapping
    /**
    /**
     * Sizes
     */
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight
    }
    
    window.addEventListener('resize', () =>
    {
      // Update sizes
      sizes.width = window.innerWidth
      sizes.height = window.innerHeight
      
      // Update camera
      camera.aspect = sizes.width / sizes.height
      camera.updateProjectionMatrix()
      
      // Update renderer
      renderer.setSize(sizes.width, sizes.height)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    })
    
/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 10
camera.position.z = 10
scene.add(camera)


/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer()
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearColor('#262837')
renderer.shadowMap.enabled=true

mountRef.current.appendChild(renderer.domElement);

// Controls
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
//Lights
const ambientLight=new THREE.AmbientLight('#b9d5ff',0.12)
scene.add(ambientLight)


const directionalLight=new THREE.DirectionalLight('#b9d5ff',0.12)
directionalLight.position.x=5;
directionalLight.position.y=5;
directionalLight.position.z=-2;
scene.add(directionalLight)

ambientLight.castShadow=true


//doorlight

const doorlight=new THREE.PointLight('#ff7d46',1,7)
doorlight.position.set(2.6,1.5,0)
doorlight.castShadow=true

//Ghosts
const ghost1=new THREE.PointLight('#ff00ff',2,3)
const ghost2=new THREE.PointLight('#00ffff',2,3)
const ghost3=new THREE.PointLight('#ffff00',2,3)
ghost1.castShadow=true
ghost2.castShadow=true
ghost3.castShadow=true
scene.add(ghost1,ghost2,ghost3)
//House

const house = new THREE.Group()
scene.add(house)
house.add(doorlight)

//Walls

const walls=new THREE.Mesh(
  new THREE.BoxBufferGeometry(4,3,4),
  new THREE.MeshStandardMaterial({
    map:bricksColor,
    aoMap:bricksAmbient,
    normalMap:bricksNormal,
    roughnessMap:bricksRough
  })
)
walls.castShadow=true
walls.geometry.setAttribute('uv2',new THREE.Float32BufferAttribute(walls.geometry.attributes.uv.array,2))
house.position.y=0.9
house.add(walls)

//Roof

const roof=new THREE.Mesh(
  new THREE.ConeBufferGeometry(3.5,1,4),
  new THREE.MeshStandardMaterial({color:'#b35f45'})
)
roof.position.y=2
roof.rotation.y=Math.PI/4
house.add(roof)

//Door

const door=new THREE.Mesh(
  new THREE.PlaneBufferGeometry(2,2.5),
  new THREE.MeshStandardMaterial(
    {
      map:doorColor,
      transparent:true,
      alphaMap:doorAlpha,
      aoMap:doorAmbient,
      displacementMap:doorHeight,
      displacementScale:0.2,
      normalMap:doorNormal,
      metalnessMap:doorMetal,
      roughnessMap:doorRough 
    }
  )
)
door.geometry.setAttribute('uv2',new THREE.Float32BufferAttribute(door.geometry.attributes.uv.array,2))
door.position.x=2.01
door.position.y=-0.5
door.rotation.y=Math.PI/2
house.add(door)

//Bushes

const bush1=new THREE.Mesh(
  new THREE.SphereBufferGeometry(1,16,16),
  new THREE.MeshStandardMaterial({color:'#89c854'})
)
bush1.scale.set(0.4,0.4,0.4)
bush1.position.set(2.6,-1.4,-1)

const bush2=new THREE.Mesh(
  new THREE.SphereBufferGeometry(1,16,16),
  new THREE.MeshStandardMaterial({color:'#89c854'})
)
bush2.scale.set(0.2,0.2,0.2)
bush2.position.set(3,-1.4,-1.3)
const bush3=new THREE.Mesh(
  new THREE.SphereBufferGeometry(1,16,16),
  new THREE.MeshStandardMaterial({color:'#89c854'})
)
bush3.scale.set(0.25,0.25,0.25)
bush3.position.set(2.6,-1.4,1.5)

const bush4=new THREE.Mesh(
  new THREE.SphereBufferGeometry(1,16,16),
  new THREE.MeshStandardMaterial({color:'#89c854'})
)
bush4.scale.set(0.5,0.5,0.5)
bush4.position.set(2.6,-1.4,1)
bush1.castShadow=true
bush2.castShadow=true
bush3.castShadow=true
bush4.castShadow=true
house.add(bush1,bush3,bush2,bush4)

//Graves

const graves=new THREE.Group()
scene.add(graves)

const graveGeometry=new THREE.BoxBufferGeometry(0.6,0.8,0.2)
const graveMaterial=new THREE.MeshStandardMaterial({color:"#b2b6b1"})


for(let i=0;i<50;i++)
{
  const angle=Math.random()*Math.PI*2;
  const x = Math.sin(angle)*(4+Math.random()*3)
  const z = Math.cos(angle)*(4+Math.random()*3)
  const graveMesh=new THREE.Mesh(graveGeometry,graveMaterial)
  graveMesh.position.set(x ,-0.3,z)
  graveMesh.rotation.y=(Math.random()-0.5)*0.4
  graveMesh.rotation.z =(Math.random()-0.5)*0.4
  graveMesh.castShadow=true
  graves.add(graveMesh)
}
//Objects
    //Material
camera.lookAt(bush1.position)
const material=new THREE.MeshStandardMaterial({
  map:grassColor,
  aoMap:grassAmbient,
  normalMap:grassNormal,
  roughnessMap:grassRough
})

    //Geometry

const plane=new THREE.Mesh(
  new THREE.PlaneBufferGeometry(20,20),
  material
)
plane.rotation.x=-Math.PI*0.5;
plane.position.y=- 0.65;

plane.receiveShadow=true
plane.geometry.setAttribute('uv2',new THREE.Float32BufferAttribute(plane.geometry.attributes.uv.array,2))

scene.add(plane)
//Shadows

doorlight.shadow.mapSize.width=256
doorlight.shadow.mapSize.height=256
doorlight.shadow.camera.far=7

ghost1.shadow.mapSize.width=256
ghost1.shadow.mapSize.height=256
ghost1.shadow.camera.far=7

ghost2.shadow.mapSize.width=256
ghost2.shadow.mapSize.height=256
ghost2.shadow.camera.far=7

ghost3.shadow.mapSize.width=256
ghost3.shadow.mapSize.height=256
ghost3.shadow.camera.far=7

renderer.shadowMap.type=THREE.PCFSoftShadowMap

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    //Animate Ghosts
    const ghost1Angle=elapsedTime*0.5
    ghost1.position.x=Math.cos(ghost1Angle)*4
    ghost1.position.z=Math.sin(ghost1Angle)*4
    ghost1.position.y=Math.sin(elapsedTime*3)

    const ghost2Angle=elapsedTime*0.32
    ghost2.position.x=Math.cos(ghost2Angle)*5
    ghost2.position.z=Math.sin(ghost2Angle)*5
    ghost2.position.y=Math.sin(elapsedTime*4)+Math.sin(elapsedTime*2.5)

    const ghost3Angle=elapsedTime*0.18
    ghost3.position.x=Math.cos(ghost3Angle)*4
    ghost3.position.z=Math.sin(ghost3Angle)*4
    ghost3.position.y=Math.sin(elapsedTime*3)
   
    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()




    return () => mountRef.current.removeChild(renderer.domElement);
  },[])

  return (
    <div ref={mountRef} >

     
    </div>
  )
}
