import React from "react";

export default function Loader() {
  return (
    <div className="w-full relative animate-pulse">
      <div className="mx-auto max-w-6xl px-4 md:px-10 relative py-10 md:py-32 flex gap-10 mt-10">
        <div className="w-2/3">
          <div className="h-10 bg-gray-300 rounded w-3/4 mb-5"></div>
          <div className="flex text-sm gap-3 mb-5">
            <div className="flex gap-2">
              <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
              <div className="h-4 bg-gray-300 rounded w-24"></div>
            </div>
            <span>|</span>
            <div className="flex gap-2">
              <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
              <div className="h-4 bg-gray-300 rounded w-24"></div>
            </div>
          </div>
          <div className="w-full h-72 bg-gray-300 rounded-lg mb-8"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-300 rounded w-full"></div>
            <div className="h-4 bg-gray-300 rounded w-5/6"></div>
            <div className="h-4 bg-gray-300 rounded w-4/6"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          </div>
        </div>
        <div className="w-1/3">
          <div className="h-6 bg-gray-300 rounded w-1/2"></div>
          <div className="mt-6 space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="border-t-2 border-gray-200 py-4 flex gap-4"
              >
                <div className="flex-none">
                  <div className="w-20 h-16 bg-gray-300 rounded"></div>
                </div>
                <div className="flex-grow space-y-2">
                  <div className="h-4 bg-gray-300 rounded w-full"></div>
                  <div className="h-3 bg-gray-300 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
