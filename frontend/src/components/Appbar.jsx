function AppBar() {
    return (
        <div className="flex justify-between items-center bg-gradient-to-r from-pink-500 to-pink-600 h-16 px-4 md:px-6 shadow-lg">
            <div className="text-white text-2xl font-bold tracking-wider hover:text-pink-200 transition-colors duration-300 cursor-pointer">
                InstaPay
            </div>
            
            <div className="flex items-center gap-6">
                <div className="text-white font-medium hover:text-pink-200 transition-colors duration-300 cursor-pointer">
                    hello
                </div>
                <div className="relative group">
                    <button className="w-10 h-10 bg-white hover:bg-gray-100 rounded-full flex items-center justify-center text-pink-500 font-semibold shadow-md transition-all duration-300 hover:shadow-lg transform hover:scale-105">
                        A
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AppBar;