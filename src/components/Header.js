import React from "react";

function Header() {
	return (
		<header className='flex items-center gap-6 px-6 py-6'>
			<img
				src='https://i.postimg.cc/SNwVLsL0/AIIR-Logo.png'
				alt=''
				className='h-12'
			/>
			<h1 className='text-center text-xl md:text-left md:text-2xl'>
				AI Image Requestor
			</h1>
			<div className='hidden flex-grow md:inline-block'></div>
			<p className='hidden md:inline-block'>
				Request images from various huggingface endpoints
			</p>
		</header>
	);
}

export default Header;
