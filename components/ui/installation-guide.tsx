import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { X } from 'lucide-react';

interface InstallationGuideProps {
  isIOS: boolean;
  isAndroid: boolean;
  onClose: () => void;
}

export function InstallationGuide({ isIOS, isAndroid, onClose }: InstallationGuideProps) {
  return (
    <Card className="w-full max-w-md mx-auto shadow-md">
      <CardHeader className="flex flex-row items-start justify-between space-y-0">
        <CardTitle className="font-bold">Installation Guide</CardTitle>
        <Button variant="default" size="icon" onClick={onClose} aria-label="Close" className="bg-white text-black hover:bg-white">
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {isIOS && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="w-6 h-6 fill-black">
                  <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
                </svg>
              </div>
              <h4 className="font-bold text-lg">How to install on iOS:</h4>
            </div>
            <ol className="space-y-3 list-decimal pl-6 font-bold">
              <li className="pb-2 border-b">Tap the <span className="px-2 py-1 bg-white rounded text-black text-sm font-bold">Share</span> button at the bottom of the screen</li>
              <li className="pb-2 border-b">Scroll down and tap <span className="px-2 py-1 bg-white rounded text-black text-sm font-bold">Add to Home Screen</span></li>
              <li>Tap <span className="px-2 py-1 bg-white rounded text-black text-sm font-bold">Add</span> in the top right corner</li>
            </ol>
          </div>
        )}
        
        {isAndroid && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="w-6 h-6 fill-black">
                  <path d="M420.55,301.93a24,24,0,1,1,24-24,24,24,0,0,1-24,24m-265.1,0a24,24,0,1,1,24-24,24,24,0,0,1-24,24m273.7-144.48,47.94-83a10,10,0,1,0-17.27-10h0l-48.54,84.07a301.25,301.25,0,0,0-246.56,0L116.18,64.45a10,10,0,1,0-17.27,10h0l47.94,83C64.53,202.22,8.24,285.55,0,384H576c-8.24-98.45-64.54-181.78-146.85-226.55"/>
                </svg>
              </div>
              <h4 className="font-bold text-lg">How to install on Android:</h4>
            </div>
            <ol className="space-y-3 list-decimal pl-6 font-bold">
              <li className="pb-2 border-b">Tap the menu button (<span className="px-2 py-1 bg-white rounded text-black text-sm font-bold">⋮</span>) in the top right</li>
              <li className="pb-2 border-b">Tap <span className="px-2 py-1 bg-white rounded text-black text-sm font-bold">Add to Home screen</span></li>
              <li>Tap <span className="px-2 py-1 bg-white rounded text-black text-sm font-bold">Add</span> when prompted</li>
            </ol>
          </div>
        )}
      </CardContent>
      
      <CardFooter>
        <div className="w-full flex gap-4 justify-center">
          <Button variant="default" className="w-full bg-white text-black hover:bg-white font-bold" asChild>
            <Link href="/instructions/ios">
              iOS Guide
            </Link>
          </Button>
          <Button variant="default" className="w-full bg-white text-black hover:bg-white font-bold" asChild>
            <Link href="/instructions/android">
              Android Guide
            </Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
} 