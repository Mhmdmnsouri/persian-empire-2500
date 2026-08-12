export function ArtifactFallback() {
  return (
    <mesh>
      <icosahedronGeometry args={[1, 2]} />
      <meshStandardMaterial color="#b89a72" roughness={0.85} />
    </mesh>
  );
}
