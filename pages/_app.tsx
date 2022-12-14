import '../styles/globals.css'
import AppLayout from '../layout/AppLayout'
import StoreLayout from '../layout/StoreLayout'
import { AuthProvider } from '../context/AuthContext'
import { MatterportProvider } from '../context/MatterportContext'
import { StoreProvider } from '../context/StoreContext'
import { MapProvider } from '../context/MapContext'
const layouts: any = {
  L1: AppLayout,
  L2: StoreLayout,
}

export default function App({ Component, pageProps }: any) {
  const Layout: any = layouts[Component.layout] || (({ children }: any) => <>{children}</>)

  return (
    <AuthProvider>
      <MatterportProvider>
        <StoreProvider >
          <MapProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </MapProvider>
        </StoreProvider>
      </MatterportProvider>
    </AuthProvider>
  )
}
