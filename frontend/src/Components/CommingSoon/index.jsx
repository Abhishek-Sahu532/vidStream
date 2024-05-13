import { Button } from '@material-tailwind/react'
import React from 'react'
import { Link } from 'react-router-dom'

export const CommingSoon = () => {
  return (
<div className="w-full h-full bg-cover bg-no-repeat"  style={{backgroundImage: `url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/257418/andy-holmes-698828-unsplash.jpg)`}}
>
    <div className="container h-screen flex flex-col justify-center items-center">
        <div className="row">
            <div className="xs-12 text-white md-6 mx-auto flex flex-col justify-center items-center ">
                <div  className="flex flex-col justify-center items-center h-full">
                    <div className="number text-4xl font-semibold">404</div>
                    <div className="font-medium text-xl">Page not found</div>
                    <div className="text-xl font-light">This may not mean anything.</div>
                    <div className="text-xl font-light">I'm probably working on something that has blown up.</div>

                </div>
                <Link to='/'>
                <Button className='mt-4 bg-transparent shadow-md text-1xl hover:scale-125'>Home</Button></Link>
            </div>
        </div>
    </div>
</div>            
                
)
}

