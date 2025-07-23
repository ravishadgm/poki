
import Header from '@/layout/Header/Page'
import '../styles/main.scss'

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
        <footer>this is footer</footer>
      </body>
    </html>
  )
}

