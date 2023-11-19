import '../styles/globals.css'
import { AppProps } from 'next/app'
import Modal from 'react-modal'
import { useEffect } from 'react'
import { ThemeProvider } from './context/themeContext';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    Modal.setAppElement('#__next') // #__next: Next.js의 기본 루트 엘리먼트 ID
  }, [])

  return (<ThemeProvider>
  <Component {...pageProps} />
</ThemeProvider> );
}

export default MyApp
