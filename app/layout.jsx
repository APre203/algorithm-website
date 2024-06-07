import Navbar from '@components/Navbar';
import '@styles/globals.css';

export const metadata = {
    title: "Algorithm Website",
    description: "This is a website shows different algorithms"
}  

const Layout = ( {children} ) => {
  return (
    <html lang="en">
        <body>
            {/* main place for all the pages */}
            <main className='app min-h-screen'>
                <Navbar/>
                {children}
                {/* <Footer /> */}
            </main>
        </body>
    </html>
  )
}

export default Layout