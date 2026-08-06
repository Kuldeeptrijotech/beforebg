import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

export const metadata = {
  title: "Trijotech | SAP Solutions",
  description: "SAP implementation, support, and business technology solutions.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Poppins:100,200,300,400,500,600,700,800,900&display=swap" />
      </head>
      <body>
        <Header />
        {children}
        <Footer />
        <a href="https://wa.me/917982531976" className="whatsapp-float" target="_blank" rel="noopener noreferrer" title="Chat with us on WhatsApp">
          <i className="fa fa-whatsapp" aria-hidden="true" />
        </a>
      </body>
    </html>
  );
}
