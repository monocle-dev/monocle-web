export function DashboardSkeleton() {
  return (
    <div className="h-screen flex flex-col overflow-hidden animate-pulse">
      <div className="flex-shrink-0 px-4 sm:px-6 lg:px-8 py-2 sm:py-4 border-b border-gray-700/50">
        <div className="app-container">
          <div className="h-12 sm:h-16 lg:h-20 bg-gray-800/50 rounded-xl"></div>
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        <div className="app-container">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 sm:gap-4 lg:gap-6 xl:gap-8 h-full py-3 sm:py-4 lg:py-6">
            <section className="flex flex-col min-h-0">
              <div className="flex items-center justify-between mb-2 sm:mb-3 lg:mb-4 flex-shrink-0">
                <div className="h-5 sm:h-6 w-20 sm:w-24 bg-gray-800/50 rounded"></div>
                <div className="h-7 sm:h-8 lg:h-10 w-20 sm:w-24 lg:w-32 bg-gray-800/50 rounded-lg"></div>
              </div>
              <div className="flex-1 overflow-hidden border border-gray-700/30 rounded-xl sm:rounded-2xl bg-gray-900/40">
                <div className="p-3 sm:p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-3 sm:gap-4">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div
                        key={i}
                        className="h-[200px] sm:h-[220px] lg:h-[240px] bg-gray-800/50 rounded-xl"
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section className="flex flex-col min-h-0">
              <div className="flex items-center justify-between mb-2 sm:mb-3 lg:mb-4 flex-shrink-0">
                <div className="h-5 sm:h-6 w-24 sm:w-28 lg:w-36 bg-gray-800/50 rounded"></div>
              </div>
              <div className="flex-1 overflow-hidden border border-gray-700/30 rounded-xl sm:rounded-2xl bg-gray-900/40">
                <div className="p-3 sm:p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-3 sm:gap-4">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div
                        key={i}
                        className="h-[180px] sm:h-[200px] lg:h-[220px] bg-gray-800/50 rounded-xl"
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
