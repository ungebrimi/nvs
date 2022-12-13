import StoreNavbar from '../layout/StoreNavbar';
import StoreFooter from '../layout/StoreFooter';

export default function StoreLayout({ children }: any) {
  return (
    <>
      <StoreNavbar />
      <main>{children}</main>
      <StoreFooter />
    </>
  )
}
