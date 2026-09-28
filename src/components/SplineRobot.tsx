import { Component, Suspense, lazy, type ReactNode } from 'react'

const Spline = lazy(() => import('@splinetool/react-spline'))
const SCENE = 'https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode'

/** Si la scène 3D ne peut pas se charger (réseau, bloqueur…), on la masque au lieu de faire tomber toute la page. */
class SceneGuard extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  render() {
    return this.state.failed ? null : this.props.children
  }
}

export function SplineRobot() {
  return <SceneGuard>
    <Suspense fallback={<div className="spline-loading" aria-hidden="true" />}>
      <Spline className="spline-robot" scene={SCENE} />
    </Suspense>
  </SceneGuard>
}
