import React, { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon, PlayIcon } from "lucide-react";

export const PhotoKTPSection = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const mediaItems = [
    { 
      id: 1, 
      type: 'image',
      src: "https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=800", 
      alt: "Foto KTP",
      title: "Foto KTP"
    },
    { 
      id: 2, 
      type: 'image',
      src: "https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=800", 
      alt: "Foto Diri dengan KTP",
      title: "Foto Diri dengan KTP"
    },
    { 
      id: 3, 
      type: 'image',
      src: "https://images.pexels.com/photos/261763/pexels-photo-261763.jpeg?auto=compress&cs=tinysrgb&w=800", 
      alt: "Gambar Tanda Tangan",
      title: "Gambar Tanda Tangan"
    },
    { 
      id: 4, 
      type: 'video',
      src: "https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg?auto=compress&cs=tinysrgb&w=800", 
      alt: "Rekaman Video Pernyataan Diri",
      title: "Rekaman Video Pernyataan Diri"
    },
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % mediaItems.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + mediaItems.length) % mediaItems.length);
  };

  const currentItem = mediaItems[currentImageIndex];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Media Verifikasi</h2>
      
      <div className="relative">
        {/* Main Media Display */}
        <div className="relative w-full h-[400px] bg-gray-100 rounded-lg overflow-hidden mb-4">
          <img
            src={currentItem.src}
            alt={currentItem.alt}
            className="w-full h-full object-cover"
          />
          
          {/* Video Play Button Overlay */}
          {currentItem.type === 'video' && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20">
              <button className="bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-4 transition-all duration-200 shadow-lg">
                <PlayIcon className="w-8 h-8 text-gray-800 ml-1" />
              </button>
            </div>
          )}
          
          {/* Media Type Badge */}
          <div className="absolute top-4 left-4">
            <span className="bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm font-medium">
              {currentItem.title}
            </span>
          </div>
        </div>
        
        {/* Navigation Arrows */}
        <button
          onClick={prevImage}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-90 hover:bg-white rounded-full p-2 shadow-md transition-all duration-200"
        >
          <ChevronLeftIcon className="w-5 h-5 text-gray-600" />
        </button>
        
        <button
          onClick={nextImage}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-90 hover:bg-white rounded-full p-2 shadow-md transition-all duration-200"
        >
          <ChevronRightIcon className="w-5 h-5 text-gray-600" />
        </button>
        
        {/* Thumbnail Navigation */}
        <div className="flex space-x-3 justify-center">
          {mediaItems.map((item, index) => (
            <button
              key={item.id}
              onClick={() => setCurrentImageIndex(index)}
              className={`relative w-20 h-16 rounded-lg border-2 overflow-hidden transition-all duration-200 ${
                index === currentImageIndex 
                  ? "border-blue-500 shadow-md" 
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-full object-cover"
              />
              
              {/* Video Icon for Video Thumbnail */}
              {item.type === 'video' && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                  <PlayIcon className="w-4 h-4 text-white" />
                </div>
              )}
              
              {/* Thumbnail Label */}
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white text-xs px-1 py-0.5 truncate">
                {item.title}
              </div>
            </button>
          ))}
        </div>
        
        {/* Media Counter */}
        <div className="text-center mt-3">
          <span className="text-sm text-gray-500">
            {currentImageIndex + 1} dari {mediaItems.length}
          </span>
        </div>
      </div>
    </div>
  );
};