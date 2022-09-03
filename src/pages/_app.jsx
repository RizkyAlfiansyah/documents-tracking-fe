import { PageHead } from 'layout'
import { useEffect, useMemo } from 'react'
import { HeaderProvider } from 'store'
import '../styles/globals.css'
import { getUserToken } from 'lib/authService'
import { useRouter } from 'next/router'
import ReactGA from 'react-ga'


const TRACKING_ID = "UA-239893237-1"; // YOUR_OWN_TRACKING_ID
ReactGA.initialize(TRACKING_ID);

function MyApp({ Component, pageProps }) {

  return (
    <HeaderProvider>
      <PageHead title="Welcome - LPKA Maros" description="Document Tracking" />
      <Component {...pageProps} />
    </HeaderProvider>
  )
}

export default MyApp
