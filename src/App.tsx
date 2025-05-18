import useRoutesElements from '@/hooks/useRouterElement'
import ScrollToTop from '@/pages/scrolltotop/ScrollToTop'
function App() {
  const routerDom = useRoutesElements()

  return (
    <>
      {routerDom}
      <ScrollToTop />
    </>
  )
}

export default App
