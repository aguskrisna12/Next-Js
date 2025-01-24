import Logo from "@/Images/logo.png";
import Link from "next/link";
import '@/styles/header.css'

export default function Header() {
  return (
    <header>
      <nav className="w-full px-4 lg:px-6 py-4 h-[200px]">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="flex justify-between w-full sm:w-auto items-center">
            <Link href="/" className="flex items-center">
              <img
                src={Logo.src}
                className="img-logo"
                alt="Logo"
                loading="eager"
              />
            </Link>
            {/* Mobile menu button could go here */}
          </div>
          
          <ul className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 mt-4 sm:mt-0">
            <li>
              <Link
                href="/"
                className="text-gray-700 hover:text-blue-600 font-medium text-sm sm:text-base transition-colors"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="./categories"
                className="text-gray-700 hover:text-blue-600 font-medium text-sm sm:text-base transition-colors"
              >
                Store
              </Link>
            </li>
            <li>
              <Link
                href="./cart"
                className="text-gray-700 hover:text-blue-600 font-medium text-sm sm:text-base transition-colors"
              >
                Cart
              </Link>
            </li>
          </ul>
          
          <Link 
            href="/login"
            className="mt-4 sm:mt-0 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 hover:scale-105 hover:shadow-lg transform transition-all duration-300 ease-in-out text-sm sm:text-base animate-pulse"
          >
            Login
          </Link>
        </div>
      </nav>
    </header>
  );
}
