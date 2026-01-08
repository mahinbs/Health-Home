export default function NotFound() {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#FFE9E4] to-[#E4F7E9] flex flex-col items-center justify-center text-center px-4">
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-12 max-w-md border border-white/50">
          <div className="w-24 h-24 bg-gradient-to-br from-pink-100 to-rose-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <i className="ri-error-warning-line text-5xl text-pink-600"></i>
          </div>
          <h1 className="text-6xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent mb-4">404</h1>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">This page has not been generated</h2>
          <p className="text-lg text-gray-600 mb-6">Tell me what you would like on this page</p>
        </div>
      </div>
    );
  }