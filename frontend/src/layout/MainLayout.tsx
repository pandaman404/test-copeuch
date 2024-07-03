import React from 'react';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <main className='mx-auto max-w-[1000px] my-20 flex flex-col items-center'>
      <h1 className='text-2xl border-b w-full text-center mb-10'>TODO LIST</h1>
      {children}
    </main>
  );
};
