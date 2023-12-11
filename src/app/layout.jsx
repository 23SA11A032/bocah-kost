import { Providers } from './providers';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  weight: '400',
  subsets: ['latin'],
});

export const metadata = {
  title: 'BOCAH KOS',
  description: 'BOCAH KOST adalah platform yang dirancang untuk memudahkan pencarian kost di seluruh Indonesia. Dengan berbagai fitur yang kami tawarkan, kami berkomitmen untuk membantu Anda menemukan kost yang sesuai dengan kebutuhan dan anggaran Anda. Mulai dari kost harian, mingguan, hingga bulanan, kami memiliki berbagai pilihan yang bisa Anda pilih. Bergabunglah dengan kami dan temukan kost impian Anda hari ini!',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
