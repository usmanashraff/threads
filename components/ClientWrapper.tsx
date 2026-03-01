'use client';

import dynamic from 'next/dynamic';
import React from 'react';

const ClerkProvider = dynamic(
  () => import('@clerk/nextjs').then(module => module.ClerkProvider),
  { ssr: false }
);

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      {children}
    </ClerkProvider>
  );
}


