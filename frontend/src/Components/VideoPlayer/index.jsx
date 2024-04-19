import React from 'react'

export const VideoPlayer =  () => {
  return (
    <div>
      <div>
      <video class="h-64 w-80 " controls>
      <source
        src="https://docs.material-tailwind.com/demo.mp4"
        type="video/mp4"
      />
      Your browser does not support the video tag.
    </video>
      </div>


      <div className='h-24 w-80 p-3 flex bg-blue-gray-500'>
<div> <img src="https://img.freepik.com/free-photo/blue-wall-background_53876-88663.jpg?t=st=1713498982~exp=1713502582~hmac=451e6ededf4e907ac6a5e862459fd20a714f5644788304b73c0497ee4b32a312&w=360" alt="avatar" className='rounded-full w-11 h-11'  /></div>


<div className='pl-4'><p className='text-wrap text-xl '>videdfdo title</p>
<p >uploader name</p>
<div className='flex'>
  <p>views</p>
  <p>upload date</p>
</div>
</div>
      </div>
    

    </div>
  )
}
