import init, {PhysicsClient, getFPS, } from './pkg/rust_physics_wasm.js';

async function run() {
	await init();
	
	const canvas = document.getElementById('rustCanvas');
	
    const gl = canvas.getContext(
        'webgl', {
            antialias: false // NOTE: this is for performance impact
        }) || (() => {
            // if WebGL is not supported, make an alert, and throw an error
            const ALERT_MESSAGE = "Unable to initialize WebGL. Your browser or machine may not support it.";
            alert(ALERT_MESSAGE);
            throw new Error(ALERT_MESSAGE);
        })();
    
	const FPS = getFPS();
	const FRAME_TIME_MILLISECONDS = 1000 / FPS;

	let lastFrameTimeMilliseconds = -1;

	const startTime = window.performance.now();
	const physicsClient = new PhysicsClient();

	canvas.addEventListener('mousedown', (event) => {
		physicsClient.on_mouse_down(
			event.clientX, event.clientY,
			canvas.clientWidth, canvas.clientHeight
		);
	});

	canvas.addEventListener('mouseup', (event) => {
		physicsClient.on_mouse_up();
	});

	canvas.addEventListener('mousemove', (event) => {
		physicsClient.on_mouse_move(
			event.clientX, event.clientY,
			canvas.clientWidth, canvas.clientHeight
		);
	});

	function render() {
		window.requestAnimationFrame(render);
		const currentTime = window.performance.now();
		
		if (currentTime - lastFrameTimeMilliseconds > FRAME_TIME_MILLISECONDS) {
			if (window.innerHeight !== canvas.height || window.innerWidth !== canvas.width) {
				canvas.width = window.innerWidth;
				// canvas.clientWidth = window.innerWidth;
				canvas.style.width = window.innerWidth + 'px';
				
				canvas.height = window.innerHeight;
				// canvas.clientHeight = window.innerHeight;
				canvas.style.height = window.innerHeight + 'px';
				
				gl.viewport(0, 0, window.innerWidth, window.innerHeight);
			}
			
			const startUpdateTime = window.performance.now();
			physicsClient.update(currentTime - startTime);
			physicsClient.render(canvas.width, canvas.height);
			const endUpdateTime = window.performance.now();
			// console.log(Math.round(100/(endUpdateTime - startUpdateTime))*10 + "fps\r");
			
			lastFrameTimeMilliseconds = currentTime;
		}
	}

	render();
}

run();
