// const box = document.querySelector('#box');
// const btn = document.querySelector('button');

// btn.addEventListener('click', () => {
// 	new Anime(box, {
// 		prop: 'left',
// 		value: 500, //px는 그냥 숫자만
// 		duration: 1500,
// 		callback: () => {
// 			new Anime(box, {
// 				prop: 'top',
// 				value: 300,
// 				duration: 1000,
// 			});
// 		},
// 	});
// });

// btn.addEventListener('click', () => {
// 	new Anime(window, {
// 		prop: 'scroll',
// 		value: 1000, //px는 그냥 숫자만 //%는 '50%'
// 		duration: 500,
// 	});
// });

const main = document.querySelector('main');
const btns = main.querySelectorAll('li');
const boxs = main.querySelectorAll('article');
const convertedSpeed = convertSpeed(boxs[0]);
let preventEL = false;

btns.forEach((btn, idx) => {
	btn.addEventListener('click', (e) => {
		e.preventDefault();

		const isOn = e.currentTarget.classList.contains('on');
		if (isOn || preventEL) return;
		preventEL = true;

		activation(btns, idx);
		activation(boxs, idx);
		matchHT(idx);
	});
});

function activation(arrEl, index) {
	for (const el of arrEl) el.classList.remove('on');
	arrEl[index].classList.add('on');
}

function matchHT(index) {
	const activeHT = parseInt(getComputedStyle(boxs[index]).height);

	new Anime(main, {
		prop: 'height',
		value: activeHT,
		duration: convertedSpeed,
		callback: () => {
			//모든 모션이 끝난이후에 preventEL값을 다시 flase 로 바꿔서
			//이벤트 발생시 함수 호출되도록 변경
			preventEL = false;
		},
	});
}

function convertSpeed(el) {
	return parseFloat(getComputedStyle(el).transitionDuration) * 1000;
}
