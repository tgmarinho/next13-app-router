import Base from 'components/container-base';
import { Metadata } from 'next';
import { Suspense } from 'react';

const { SITE_NAME, SITE_URL, SITE_DESCRIPTION } = process.env;
export const runtime = 'edge';

export const metadata: Metadata = {
  openGraph: {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [
      {
        url: `/api/og?title=${encodeURIComponent(process.env.SITE_NAME || '')}`,
        width: 1200,
        height: 630
      }
    ],
    type: 'website'
  }
};

async function getData() {
  try {
    const [news, premiums] = await Promise.all([getNewProducts(), getPremiumProducts()]);
    return {
      newProducts: news,
      premiumProducts: premiums
    };
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch data');
  }
}

export default async function HomePage() {

  return (
    <>
      <Suspense>
        <Base>
        </Base>
      </Suspense>
    </>
  );
}
