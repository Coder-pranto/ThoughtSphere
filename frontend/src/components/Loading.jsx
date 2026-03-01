export default function Loader() {
    return (
        <div className="flex items-center justify-center min-h-screen ">
            <div className="backdrop-blur-xl bg-white/10 p-10 rounded-2xl shadow-2xl flex flex-col items-center">
                <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-4 text-yellow-500 font-medium tracking-wide">
                    Please wait...
                </p>
            </div>
        </div>
    );
}
