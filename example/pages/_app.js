/* eslint-disable react/prop-types */
import BlockdemyUI from 'blockdemy-ui';

const { BlockdemyUIProvider } = new BlockdemyUI();

function MyApp({ Component, pageProps }) {
  return (
    <BlockdemyUIProvider>
      <Component
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...pageProps}
      />
    </BlockdemyUIProvider>
  );
}

export default MyApp;
