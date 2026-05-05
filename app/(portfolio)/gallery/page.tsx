import Image from 'next/image'
import React from 'react'
import galleryBg2 from '@/public/gallery-bg-2.svg'
import galleryIcon from '@/public/gallery-avatar.svg'

export default function GalleryPage() {
  return (
    <div>
            <div>
              <div>
                <div className="relative w-full h-48 sm:h-60 md:h-72">
                  <Image
                    src={galleryBg2}
                    alt="Default Background"
                    fill
                    className="object-cover"
                  />
                </div>
        
                <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-40">
                  <Image src={galleryIcon} alt="Gallery Icon" width={80} height={80} />
                </div>
              </div>
              </div>
    </div>

  
  )
}
