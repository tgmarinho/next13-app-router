import { ReactNode, Suspense } from 'react';
import './globals.css';



export default async function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt_br">
      {/* favicon */}
      <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />

      <body className="bg-black text-white selection:bg-blue-600">
        <Suspense>
          <main className="relative flex flex-col justify-between">{children}</main>
        </Suspense>
      </body>
    </html>
  );
}
