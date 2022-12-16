import StoreNavbar from '../layout/StoreNavbar';
import StoreFooter from '../layout/StoreFooter';
import Banner from './Banner';

export default function StoreLayout({ children }: any) {
  return (
    <>
      <Banner />
      <StoreNavbar />
      <main>{children}</main>
      <StoreFooter />
    </>
  )
}
