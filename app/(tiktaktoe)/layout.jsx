import '@styles/globals.css';

export const metadata = {
    title: "Algorithms Website",
    description: "This is a website shows different algorithms"
}  

const Layout = ( {children} ) => {
  return (
    <html lang="en">
        <body>
            {/* main place for all the pages */}
            <main className='app min-h-screen'>
                {/* <Nav /> */}
                {children}
                {/* <Footer /> */}
            </main>
        </body>
    </html>
  )
}

export default Layout