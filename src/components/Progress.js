import React from "react";

function Progress({ current, total }) {
	return (
		<div className='grid w-full gap-3'>
			<article className='flex justify-between'>
				<p>Requesting Images...</p>
				<p>
					{current} / {total}
				</p>
			</article>
			<div className='h-2 rounded-full bg-secondary-1'>
				<div
					className='h-2 rounded-full bg-secondary-3'
					style={{
						width: `${(current / total) * 100}%`,
					}}
				></div>
			</div>
		</div>
	);
}

export default Progress;
