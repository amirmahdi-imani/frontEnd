import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { ReduxProvider } from './Providers';
import { ToastProviderWrapper } from "./components/ui/toast"
import { SessionLoader } from './components/sessionLoader';


const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Next',
  description: '...my Next project...',
};

export default function MainLayout({ children }) {
  return (
    <html lang="en">
      
      <body className={`${inter.className} bg-background text-foreground`}>
          
          <ReduxProvider>
          <SessionLoader/>
          <ToastProviderWrapper>
          <Navbar />
          <main className="min-h-screen px-6 py-10 bg-gray-900/90 backdrop-blur-md text-gray-100 font-sans shadow-inner">
          {children}
          </main>
          <Footer />
          </ToastProviderWrapper>
          </ReduxProvider>
          
      </body>
      
    </html>
  );
}
