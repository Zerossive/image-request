import { useState } from "react";
import Alert from "./components/Alert";
import Header from "./components/Header";
import Images from "./components/Images";
import Input from "./components/Input";
import { useAutoAnimate } from "@formkit/auto-animate/react";

function App() {
	const [images, setImages] = useState([]);
	const [alert, setAlert] = useState();
	const [alertAnimationParent] = useAutoAnimate();

	return (
		<div
			className='flex min-h-screen flex-col bg-primary-1 font-semibold text-primary-5'
			ref={alertAnimationParent}
		>
			<Header />
			<Input images={images} setImages={setImages} setAlert={setAlert} />
			<Images images={images} setAlert={setAlert} />
			{alert && <Alert alert={alert} setAlert={setAlert} />}
		</div>
	);
}

export default App;
