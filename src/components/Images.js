import React from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";

function Images({ images, setAlert }) {
	const [imagesAnimationParent] = useAutoAnimate();

	const handleImageClick = (url, prompt, source) => {
		// navigator.clipboard.writeText(prompt);
		setAlert(
			<div className='grid h-full max-h-fit w-full flex-col place-items-start gap-6 md:grid-cols-[auto_1fr]'>
				<img src={url} alt={prompt} className='rounded-lg' />
				<article className='grid gap-3'>
					{/* Prompt info */}
					<div className='grid gap-1'>
						<p className='text-lg'>
							<strong>Prompt:</strong>
						</p>
						<p>{prompt}</p>
						<button
							className='rounded-lg bg-secondary-4 p-3 text-secondary-1 duration-75 active:scale-95 active:bg-secondary-3'
							onClick={() =>
								navigator.clipboard.writeText(prompt)
							}
						>
							Copy Prompt to Clipboard
						</button>
					</div>

					{/* URL info */}
					<div className='grid gap-1'>
						<a href={url} className='text-lg'>
							<strong>URL:</strong>
						</a>
						<p className='truncate'>{url}</p>
						<button
							className='rounded-lg bg-secondary-4 p-3 text-secondary-1 duration-75 active:scale-95 active:bg-secondary-3'
							onClick={() => navigator.clipboard.writeText(url)}
						>
							Copy URL to Clipboard
						</button>
					</div>

					{/* Source info */}
					<div className='grid gap-1'>
						<p className='text-lg'>
							<strong>Source:</strong>
						</p>
						<p className='truncate'>{source}</p>
						<button
							className='rounded-lg bg-secondary-4 p-3 text-secondary-1 duration-75 active:scale-95 active:bg-secondary-3'
							onClick={() =>
								navigator.clipboard.writeText(source)
							}
						>
							Copy Source to Clipboard
						</button>
					</div>
				</article>
			</div>
		);
	};

	return (
		<ul
			className='flex flex-grow flex-col-reverse items-center justify-end gap-6 bg-primary-2 pb-24 md:flex-row-reverse md:flex-wrap-reverse md:items-end md:px-6'
			ref={imagesAnimationParent}
		>
			{images.map((image) => {
				return (
					<li
						key={image.prompt}
						className='group relative px-6 md:px-0'
					>
						<img
							src={image.url}
							alt={image.prompt}
							className='w-auto cursor-pointer rounded-2xl md:w-auto md:max-w-md'
							onClick={() =>
								handleImageClick(
									image.url,
									image.prompt,
									image.source
								)
							}
						/>
					</li>
				);
			})}
		</ul>
	);
}

export default Images;
