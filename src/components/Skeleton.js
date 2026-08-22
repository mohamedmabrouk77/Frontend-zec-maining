import React from 'react';

export const Sk = ({ className }) => (
  <div
    className={`skeleton animate-pulse bg-gray-200 rounded ${className || ''}`}
  />
);

export const SkeletonBox = Sk;

export const LoadingPage = () => (
  <div className="min-h-screen bg-gray-50 p-4 space-y-4 animate-pulse">
    <Sk className="h-48 w-full rounded-2xl" />

    <div className="grid grid-cols-2 gap-3">
      {[1, 2].map(i => (
        <div
          key={i}
          className="bg-white rounded-xl p-4 shadow-sm space-y-3"
        >
          <div className="flex items-center gap-3">
            <Sk className="h-12 w-12 rounded-full" />

            <div className="flex-1 space-y-2">
              <Sk className="h-4 w-3/4" />
              <Sk className="h-3 w-1/2" />
            </div>
          </div>

          <Sk className="h-8 w-full" />
        </div>
      ))}
    </div>

    <Sk className="h-32 w-full rounded-xl" />

    <div className="space-y-3">
      {[1, 2, 3].map(i => (
        <Sk key={i} className="h-20 w-full rounded-xl" />
      ))}
    </div>
  </div>
);