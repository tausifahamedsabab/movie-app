import logo from "../../assets/logo.png";

function Loading() {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-950 flex flex-col items-center justify-center">
      <div className="relative flex items-center justify-center">
        <div className="absolute w-32 h-32 rounded-full border-4 border-gray-800 border-t-red-500 border-r-red-500 animate-spin" />

        <div className="w-20 h-20 rounded-full bg-gray-900 flex items-center justify-center shadow-[0_0_40px_rgba(239,68,68,0.25)]">
          <img
            src={logo}
            alt="Movie App"
            className="w-12 h-12 object-contain invert"
          />
        </div>
      </div>

      <h2 className="mt-8 text-xl font-semibold text-white">Loading Movies</h2>

      <div className="flex gap-1 mt-3">
        <span className="w-2 h-2 bg-red-500 rounded-full animate-bounce" />
        <span className="w-2 h-2 bg-red-500 rounded-full animate-bounce [animation-delay:150ms]" />
        <span className="w-2 h-2 bg-red-500 rounded-full animate-bounce [animation-delay:300ms]" />
      </div>

      <p className="mt-4 text-sm text-gray-500">
        Finding something great to watch...
      </p>
    </div>
  );
}

export default Loading;
