import Image from 'next/image'
import defaultAvatar from '@/public/default-avatar.png'
import { Label } from '../ui/label'
import butterfly from '@/public/butterfly.png'

export default function Hero() {
  return (
    <div>
    <div className='flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left'>
      
      
        <Image
          src={defaultAvatar}
          alt="Default Avatar"
          width={100}
          height={100}
          className='sm:-mt-14 z-10'
        />

        <div className='flex-col items-center mt-2'>
          <div className='flex flex-row gap-3'>
                      <Label className='text-3xl sm:text-4xl md:text-5xl font-light font-heading'>Hi, I'm <span className='ml-2 inline-block font-cursive'>Celest</span></Label>     
                      <Image src={butterfly} alt="Butterfly" className='hidden sm:block w-8 h-auto mb-5' />

          </div>
          <Label className='text-lg font-light -mt-1 mb-2'>Frontend Developer | UI Enthusiast.</Label>   
        </div>

       
    </div>
            <Label className=' bg-primary py-1.5 px-2 rounded-sm font-mono font-light text-xs'>Hello! Grab a coffee and take a look at some of the digital magic I’ve been working on</Label>

    </div>
  )
}
