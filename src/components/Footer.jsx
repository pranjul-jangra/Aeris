const Footer = () => {
  return (
    <footer className="w-full bg-gray-900 text-gray-300 text-sm border-t border-gray-700 px-6 py-6">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3">

        <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-4">
          <span className="font-semibold text-base tracking-wide">Aeris Weather</span>
          <span className="text-xs sm:text-sm italic opacity-80">Your daily climate companion</span>
        </div>

        <p className="text-xs sm:text-sm tracking-wide opacity-75">
          Designed with precision · Built for accuracy
        </p>

      </div>
    </footer>
  );
};

export default Footer;
