type LoadingComProps = {
  message?: string;
};

const LoadingCom = ({
  message = "Loading...",
}: LoadingComProps) => {
  return (
    <div className="fixed top-6 right-6 z-[9999] animate-in fade-in slide-in-from-top-3 duration-300">
      <div className="relative overflow-hidden rounded-2xl border border-lime-400/30 bg-black/80 backdrop-blur-xl px-5 py-4 shadow-[0_0_30px_rgba(163,230,53,0.18)]">
        
        {/* Glow */}
        <div className="absolute inset-0 bg-lime-400/5 pointer-events-none" />

        <div className="relative flex items-center gap-4">
          
          {/* Spinner */}
          <div className="relative flex items-center justify-center">
            <div className="h-10 w-10 rounded-full border-2 border-lime-400/20"></div>

            <div className="absolute h-10 w-10 rounded-full border-2 border-transparent border-t-lime-400 animate-spin"></div>

            <div className="absolute h-2 w-2 rounded-full bg-lime-400 shadow-[0_0_10px_#a3e635]"></div>
          </div>

          {/* Text */}
          <div className="flex flex-col">
            <p className="text-sm font-semibold tracking-wide text-lime-300">
              {message}
            </p>

            <p className="text-xs text-zinc-400">
              Please wait a moment...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingCom;