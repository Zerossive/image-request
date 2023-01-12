import React from "react";

function Alert({ alert, setAlert }) {
	const handleClickAlert = (e) => {
		if (e.target.id === "closeAlert") {
			setAlert("");
		}
	};

	return (
		<div
			className='fixed bottom-0 right-0 flex max-h-[75%] w-screen flex-col justify-start md:pt-0'
			onClick={(e) => handleClickAlert(e)}
			id='alertBackground'
		>
			{/* Alert body */}
			<div
				className='overflow-auto rounded-t-3xl bg-secondary-2 p-6 text-secondary-4'
				id='alertForeground'
			>
				{alert}
			</div>

			{/* Close button */}
			<div className='flex bg-secondary-2 p-6'>
				<button
					className='w-full rounded-lg bg-secondary-3 p-3 text-secondary-1 md:p-3'
					onClick={() => setAlert("")}
				>
					Close
				</button>
			</div>
		</div>
	);
}

export default Alert;
