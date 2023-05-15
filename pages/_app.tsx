import '../styles/globals.css';

import { AppProps } from 'next/app';

import CommonLayout from 'components/layout/CommonLayout';

export default function App({ Component, pageProps }: AppProps) {
  const Layout = (Component as any).Layout || CommonLayout;
  const LayoutProps = (Component as any).LayoutProps || undefined;

  return (
    <Layout {...LayoutProps}>
      <Component {...pageProps} />
    </Layout>
  );
}
