
function FooterLink({ href, children }) {
  return (
    <a
      href={href}
      className="text-gray-400 hover:text-white transition-colors duration-200"
    >
      {children}
    </a>
  );
}


export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="mx-auto w-full max-w-[1512px] px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand + Description */}
          <div>
            <div className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="Cerope logo"
                className="h-15 w-auto white"
              />
              <span className="text-4xl font-semibold">Cerope</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-gray-400 max-w-xs">
              Revolutionizing fashion with AI-powered styling solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li><FooterLink href="#">Home</FooterLink></li>
              <li><FooterLink href="#">Contact Us</FooterLink></li>
              <li><FooterLink href="#">About</FooterLink></li>
              <li><FooterLink href="#">Features</FooterLink></li>
              <li><FooterLink href="#">FAQ's</FooterLink></li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Products</h3>
            <ul className="space-y-3">
              <li>
                <FooterLink href="#">User Styling</FooterLink>
                <div className="text-xs text-purple-400 mt-1">~ Launching Soon</div>
              </li>
              <li><FooterLink href="#">Price Comparison</FooterLink></li>
              <li><FooterLink href="#">Creator Space</FooterLink></li>
            </ul>

          </div>

          {/* Policies */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Policies</h3>
            <ul className="space-y-3">
              <li><FooterLink href="#">Privacy Policy</FooterLink></li>
              <li><FooterLink href="#">Copyright Policy</FooterLink></li>
              <li><FooterLink href="#">Cookie Policy</FooterLink></li>
              <li><FooterLink href="#">Terms and Conditions</FooterLink></li>
            </ul>
          </div>
        </div>

        <hr className="border-gray-800 mt-12 mb-6" />

        <div className="text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Cerope. All rights reserved.
        </div>
      </div>
    </footer>
  );
}