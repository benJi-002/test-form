import { Inter } from "next/font/google";
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';

import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500', '600']
});

export const metadata = {
  title: 'Einzelwerk-form',
  description: 'Test app from Einzelwerk'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body className={`${inter.className} ${inter.variable}`}>
        <MantineProvider>{children}</MantineProvider>
      </body>
    </html>
  );
}
