import * as Three from "Three";
import { useState, useEffect, useRef } from "react";

export default function ThreeElement({
  height,
  width,
  fullWindow,
}: {
  height: number;
  width: number;
  fullWindow: boolean;
}) {
  const [scene, _setScene] = useState(new Three.Scene());
  const [camera, _setCamera] = useState(
    new Three.PerspectiveCamera(75, width / height, 0.1, 1000),
  );
  const containerRef = useRef(null);
  const requestRef = useRef(0);
  const [renderer, _setRenderer] = useState(new Three.WebGLRenderer());

  const [cube, _setCube] = useState(
    new Three.Mesh(
      new Three.BoxGeometry(2, 2, 2),
      new Three.MeshBasicMaterial({ color: 0x00ff00 }),
    ),
  );

  function animate() {
    requestAnimationFrame(() => renderer.render(scene, camera));
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    requestRef.current = requestAnimationFrame(animate);
  }

  function resize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.updateProjectionMatrix();
  }

  useEffect(() => {
    if (fullWindow) {
      resize();
      window.addEventListener("resize", () => {
        resize();
      });
    } else {
      renderer.setSize(width, height);
    }

    scene.add(cube);

    camera.position.z = 5;

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      const container: HTMLElement = containerRef.current;
      container.append(renderer.domElement);
    }
  }, [containerRef, renderer.domElement]);

  return <div ref={containerRef}></div>;
}
