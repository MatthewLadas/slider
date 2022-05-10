function Slider(slider) {
	if (!(slider instanceof Element)) {
		throw new Error('No slider passed in');
	}
	// Create some variables for working with the slider
	let prev;
	let current;
	let next;

	// Select the elements needed for the slider
	const slides = slider.querySelector('.slides');
	const prevButton = slider.querySelector('.goToPrev');
	const nextButton = slider.querySelector('.goToNext');

	function startSlider() {
		current = slider.querySelector('.current') || slides.firstElementChild;
		prev = current.previousElementSibling || slides.lastElementChild;
		next = current.nextElementSibling || slides.firstElementChild;
		console.log({ current, prev, next });
	}

	function applyClasses() {
		current.classList.add('current');
		prev.classList.add('prev');
		next.classList.add('next');
	}

	function move(direction) {
		// First we need to strip all the classes off the current slides
		const classesToRemove = ['prev', 'current', 'next'];
		prev.classList.remove(...classesToRemove);
		current.classList.remove(...classesToRemove);
		next.classList.remove(...classesToRemove);
		if (direction === 'back') {
			// Make a new array of the new values, and destructure them over and into the prev, current, next variables
			[prev, current, next] = [
				// Get the prev slides, if there is none, get the last slide from the entire slider for wrapping
				prev.previousElementSibling || slides.lastElementChild,
				prev,
				current,
			];
		} else {
			// Get the next slide, or if it's at the end, loop around and grab the first slide
			[prev, current, next] = [
				current,
				next,
				next.nextElementSibling || slides.firstElementChild,
			];
		}
		applyClasses();
	}
	// When this slider is created, run the start slider function
	startSlider();
	applyClasses();

	// Event Listeners
	prevButton.addEventListener('click', () => move('back'));
	nextButton.addEventListener('click', move);
}

const mySlider = Slider(document.querySelector('.slider'));
const dogSlider = Slider(document.querySelector('.dog-slider'));

