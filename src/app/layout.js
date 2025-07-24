
import Header from '@/layout/Header/Page'
import '../styles/main.scss'
import Footer from '@/layout/Footer/Page'

export const metadata = {
  title: 'Poki',
  description: 'Play Games Online Free',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* <Header /> */}
        <main>{children}</main>

        <Footer />
      </body>
    </html>
  )
}

