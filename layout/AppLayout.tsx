import AppNavbar from '../layout/AppNavbar';
import AppFooter from '../layout/AppFooter';

export default function AppLayout({ children }: any) {
  return (
    <>
      <AppNavbar />
      <main>{children}</main>
      <AppFooter />
    </>
  )
}
