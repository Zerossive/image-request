import React from "react";

function Footer() {
	return (
		<footer className='grid items-center gap-6 bg-primary-3 p-6 text-center font-normal md:grid-cols-3'>
			<p className='md:text-left'>
				We are not responsible for the content generated, use at your
				own discretion.
			</p>
			<p className=''>Copyright © 2023 Danny Harris</p>
			<article className='md:text-right'>
				<p>Want a website designed for you or your business?</p>
				<a
					href='https://dannyharris.info/contact'
					className='text-secondary-3'
				>
					dannyharris.info
				</a>
			</article>
		</footer>
	);
}

export default Footer;
