import React from "react";

function Header() {
	const handleHeaderClick = () => {
		window.location.reload();
	};

	return (
		<header className='flex flex-col flex-wrap bg-primary-1'>
			{/* Header stuff */}
			<div className='flex w-full items-center gap-6 p-6'>
				{/* Logo */}
				<img
					// src='/android-chrome-192x192.png'
					src='https://i.postimg.cc/SNwVLsL0/AIIR-Logo.png'
					alt='website logo'
					className='h-12 cursor-pointer'
					onClick={handleHeaderClick}
				/>

				{/* Title */}
				<h1 className='cursor-pointer text-center text-xl md:text-left md:text-2xl'>
					<a href='/'>AI Image Requestor</a>
				</h1>

				{/* Spacer on larger screens */}
				<div className='hidden flex-grow md:inline-block'></div>

				{/* Extra text on larger screens */}
				<p className='hidden md:inline-block'>
					Request images from various huggingface endpoints
				</p>
			</div>

			{/* top of body */}
			<div className='w-full rounded-t-3xl bg-primary-2 p-3'></div>
		</header>
	);
}

export default Header;
