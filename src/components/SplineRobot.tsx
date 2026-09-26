import { Suspense, lazy } from 'react'

const Spline = lazy(() => import('@splinetool/react-spline'))
const SCENE = 'https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode'

export function SplineRobot() {
  return <Suspense fallback={<div className="spline-loading" aria-hidden="true" />}>
    <Spline className="spline-robot" scene={SCENE} />
  </Suspense>
}
