import useRoutesElements from '@/hooks/useRouterElement'
import AutoScrollToTop from '@/components/common/autoScroll'

function App() {
  const routerDom = useRoutesElements()

  return (
    <>
      <AutoScrollToTop behavior='smooth' />
      {routerDom}
    </>
  )
}

export default App
