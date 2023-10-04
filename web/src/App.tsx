import { useEffect } from 'react';
import { useNuiEvent } from './hooks/useNuiEvent';
import { RecoilRoot } from 'recoil'

import { Laptop } from './components/Laptop/Laptop'

const App: React.FC = () => {
	const resize = () => {
		//const zoom = window.innerHeight / 1080;

		/* const root = document.getElementById('root');
		if (root) {
			root.style.transform = `scale(${zoom})`;
			root.style.transformOrigin = 'top left';
			root.style.width = `${100 / zoom}%`;
			root.style.height = `${100 / zoom}%`;
			root.style.overflow = 'hidden';
			root.style.position = 'absolute';
			root.style.top = '0';
			root.style.left = '0';
		} */

		/* const body: any = document.body;
		body.style.zoom = `${zoom}`;
		body.style.transformOrigin = 'top left';
		body.style.width = `${100 / zoom}%`;
		body.style.height = `${100 / zoom}%`; */
	}

	useEffect(() => {
		resize();
	}, [])

	// Live update resize
	useEffect(() => {
		window.addEventListener('resize', resize);

		return () => {
			window.removeEventListener('resize', resize);
		}
	}, [])

	useNuiEvent("copyText", (text: string) => {
		const el = document.createElement('textarea');
		el.value = text;
		document.body.appendChild(el);
		el.select();
		document.execCommand('copy');
		document.body.removeChild(el);
	});

	return (
		<>
			<RecoilRoot>
				<Laptop />
			</RecoilRoot>
		</>
	)
}

export default App
