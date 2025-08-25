export default function Navbar() {
  return (
    <nav
      className="bg-white flex justify-between items-center px-8 mx-auto w-full max-w-[1512px]"
      style={{
        height: "92px",
        borderRadius: "64px",
        boxShadow: "0px 4px 4px 0px #00000040",
        marginTop: "-10px",
      }}
    >
      {/* Left: Logo + Name */}
      <div
        className="flex items-center justify-center text-black font-bold text-xl"
        style={{
          width: "165px",
          height: "52.8px",
          borderRadius: "12px",
        }}
      >
        <img
          src="/logo.png"
          alt="Cerope Logo"
          className="w-40 h-18 object-contain"
        />
        <span>Cerope</span>
      </div>

      {/* Right: Explore More + Avatar */}
      <div className="flex items-center space-x-6">
        <a
          href="/explore"
          className="text-gray-700 text-lg font-medium"
        >
          Explore More
        </a>
        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-300">
          <img
            src="/avatar_nav.png"
            alt="User Avatar"
            className="w-full h-full object-cover rotate-[-0deg]"
          />
        </div>
      </div>
    </nav>
  );
}