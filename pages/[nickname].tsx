import { GetServerSideProps } from 'next';
import { NextSeo } from 'next-seo';
import { Browser, chromium } from 'playwright';

const OGImageSize = {
  width: 1200,
  height: 630,
};

interface SSRProps {
  imageBuffer: Buffer;
}

export default function Home({ imageBuffer }: SSRProps) {
  const b64 = Buffer.from(imageBuffer).toString('base64');
  const mimeType = 'image/png';
  return (
    <>
      <NextSeo
        openGraph={{
          images: [
            {
              url: `data:${mimeType};base64,${b64}`,
              ...OGImageSize,
              alt: 'LOL record OG Image',
            },
          ],
        }}
      />
      <div className="flex justify-center items-center">
        {/*eslint-disable-next-line */}
        <img src={`data:${mimeType};base64,${b64}`} alt="image" />
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<SSRProps> = async (ctx) => {
  const nickname = ctx.params?.nickname;
  let browser: Browser | null = null;
  try {
    if (!nickname || typeof nickname !== 'string')
      return {
        notFound: true,
      };

    browser = await chromium.launch({ headless: false, slowMo: 50 });
    const page = await browser.newPage({
      viewport: OGImageSize,
    });

    await page.goto(`${process.env.WEB_URL}/generate-image/${nickname}`);
    const imageBuffer = await page.screenshot();

    return {
      props: JSON.parse(
        JSON.stringify({
          imageBuffer,
        }),
      ),
    };
  } catch (err) {
    console.log(err);
    return {
      notFound: true,
    };
  } finally {
    if (browser) await browser.close();
  }
};
