import React, { useRef, useState } from "react";
import Progress from "./Progress";

function Input({ images, setImages, setAlert }) {
	const [formPrompt, setFormPrompt] = useState("a fantasy landscape");
	const [formCount, setFormCount] = useState(1);
	const [formSource, setFormSource] = useState(
		"https://hexequin-openjourney.hf.space/run/predict"
	);
	const [progressValues, setProgressValues] = useState({});

	// Request state
	const [requesting, setRequesting] = useState(false);
	// used in async for loop to correctly update request state
	const reference = useRef();
	reference.current = requesting;

	const endpoints = [
		{
			url: "https://hexequin-openjourney.hf.space/run/predict",
			name: "Openjourney",
		},
		{
			url: "https://hexequin-openjourney-v2.hf.space/run/predict",
			name: "Openjourney V2",
		},
		{
			url: "https://hexequin-flax-midjourney-v4-diffusion.hf.space/run/predict",
			name: "Midjourney V4 Diffusion",
		},
		{
			url: "https://hexequin-nitrosocke-redshift-diffusion.hf.space/run/predict",
			name: "Redshift Diffusion",
		},
		{
			url: "https://hexequin-linaqruf-anything-v3-0.hf.space/run/predict",
			name: "Anything V3",
		},
		{
			url: "https://hexequin-claudfuen-photorealistic-fuen-v1.hf.space/run/predict",
			name: "Photorealistic Fuen V1",
		},
	];

	// setup controller to cancel fetch
	const controller = new AbortController();
	const signal = controller.signal;

	// Handle for submission
	const handleSubmit = async (e) => {
		e.preventDefault();

		// Create temporary input values
		const prompt = formPrompt;
		const count = formCount;
		const source = formSource;

		// Start progress bar
		setProgressValues({ current: 0, total: count });
		setRequesting(true);
		let currentCount = 0;

		// Make desired amount of API calls
		for (let index = 1; index <= count; index++) {
			if (!reference.current && index > 1) {
				console.log("Request cancellation successful");
				break;
			}

			const total = count;
			try {
				await getImage(index, total);
			} catch (error) {
				console.log("There was an error requesting an image:");
				setAlert(
					<p>
						Oops, there was an error generating an image. Try using
						a difference source, or simply wait and try again.
					</p>
				);
				setRequesting(false);
			}
		}

		// Get image from huggingface space and add to images state
		async function getImage(index, total) {
			total = Number(total);
			const seed = new Date().getTime();
			const seedPrompt = prompt + ", " + seed + index;

			// make request
			let response = await fetch(source, {
				method: "POST",
				signal: signal,
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					data: [seedPrompt],
				}),
			});
			const image = await response.json();

			// set new state
			image.data[0] &&
				setImages((prev) => [
					...prev,
					{
						url: image.data[0],
						prompt: seedPrompt,
						source: source,
					},
				]);

			// Handle progress bar
			currentCount++;
			if (currentCount === total) {
				setProgressValues({});
				setRequesting(false);
			} else {
				setProgressValues({ current: currentCount, total: total });
			}

			console.log("Generated:", seedPrompt);
		}
	};

	// Cancel the following requests
	const handleCancel = () => {
		controller.abort();
		setRequesting(false);
		setAlert(
			<p>Image request cancelled (one final image may still generate)</p>
		);
		console.log("Image request cancelled");
	};

	// Remove all current images from the page
	const handleClearImages = () => {
		setImages([]);
		console.log("Images cleared");
	};

	return (
		<form
			className='flex flex-col gap-6 rounded-t-3xl bg-primary-2 p-6'
			onSubmit={handleSubmit}
		>
			{/* Prompt input */}
			<label htmlFor='prompt' className='flex flex-col gap-3'>
				<p>
					Prompt{" "}
					<em className='text-primary-4'>
						(a unique seed will be appended to the end)
					</em>
				</p>
				<input
					type='text'
					name='prompt'
					className='rounded-lg bg-primary-3 p-3 font-normal focus:outline focus:outline-2 focus:outline-primary-4'
					value={formPrompt}
					onChange={(e) => setFormPrompt(e.target.value)}
				/>
			</label>

			{/* Image Count Input */}
			<label htmlFor='count' className='flex flex-col gap-3'>
				<p>
					Number of Images to Generate{" "}
					<em className='text-primary-4'>(maximum of 20)</em>
				</p>
				<input
					type='number'
					name='count'
					min={1}
					max={20}
					className='appearance-none rounded-lg bg-primary-3 p-3 font-normal focus:outline focus:outline-2 focus:outline-primary-4'
					style={{ MozAppearance: "textfield" }}
					value={formCount}
					onChange={(e) => {
						if (e.target.value > 20) {
							e.target.value = 20;
						}
						setFormCount(e.target.value);
					}}
					required
				/>
			</label>

			{/* Generation Source Input */}
			<label htmlFor='source' className='flex flex-col gap-3'>
				<p>
					Select Generation Source{" "}
					<em className='text-primary-4'>(or enter your own)</em>
				</p>

				{/* Preset set source selection */}
				<ul className='flex flex-wrap gap-3'>
					{endpoints.map((endpoint) => {
						return (
							<li key={endpoint.name}>
								<button
									type='button'
									className='rounded-lg bg-primary-5 p-3 text-primary-2 duration-75 active:scale-95 active:bg-primary-3'
									onClick={() => setFormSource(endpoint.url)}
								>
									{endpoint.name}
								</button>
							</li>
						);
					})}
				</ul>

				{/* Custom source input */}
				<input
					type='url'
					name='source'
					className='rounded-lg bg-primary-3 p-3 font-normal focus:outline focus:outline-2 focus:outline-primary-4'
					value={formSource}
					onChange={(e) => setFormSource(e.target.value)}
					required
				/>
			</label>

			{/* Submit button */}
			{!requesting && (
				<button
					type='submit'
					className='flex-grow rounded-lg bg-secondary-3 p-3 text-secondary-1 duration-75 active:scale-95 active:bg-secondary-2'
				>
					Submit
				</button>
			)}

			{/* Progress */}
			{requesting && (
				<div className='flex flex-row flex-wrap gap-6'>
					{/* Progress bar */}
					<Progress
						current={progressValues.current}
						total={progressValues.total}
					/>

					{/* Cancel button */}
					<button
						type='button'
						className='flex-grow rounded-lg bg-secondary-3 p-3 text-secondary-1 duration-75 active:scale-95 active:bg-secondary-2'
						onClick={handleCancel}
					>
						Cancel
					</button>
				</div>
			)}

			{/* Clear images button */}
			{images[0] && (
				<button
					type='button'
					className='rounded-lg bg-primary-5 p-3 text-primary-1 duration-75 active:scale-95 active:bg-primary-4'
					onClick={handleClearImages}
				>
					Clear Images
				</button>
			)}
		</form>
	);
}

export default Input;
