
import '../styles/main.scss'

export const metadata = {
  title: 'Poki',
  description: 'Play Games Online Free',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header>
          <h1>My Game Site</h1>
        </header>
        <main>{children}</main>
        <footer>this is footer</footer>
      </body>
    </html>
  )
}

