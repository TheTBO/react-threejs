import ThreeElement from "./Three.tsx";
import WebGL from "three/addons/capabilities/WebGL.js";

function App() {
  if (WebGL.isWebGLAvailable()) {
    return <ThreeElement fullWindow={true} />;
  } else {
    return <p>WebGL is not available</p>;
  }
}

export default App;
