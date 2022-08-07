import { PageHead } from 'layout'
import { HeaderProvider } from 'store'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <HeaderProvider>
      <PageHead title="Welcome - LPKA Maros" description="Document Tracking" />
      <Component {...pageProps} />
    </HeaderProvider>
  )
}

export default MyApp
