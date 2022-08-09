import { PageHead } from 'layout'
import { useEffect, useMemo } from 'react'
import { HeaderProvider } from 'store'
import '../styles/globals.css'
import { getUserToken } from 'lib/authService'
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }) {

  return (
    <HeaderProvider>
      <PageHead title="Welcome - LPKA Maros" description="Document Tracking" />
      <Component {...pageProps} />
    </HeaderProvider>
  )
}

export default MyApp
