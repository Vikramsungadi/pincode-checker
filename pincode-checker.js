import { styles } from './styles.js';
import { checkPincode, createElem } from './utils.js';

class PincodeChecker extends HTMLElement {
	// static observedAttributes = ['value'];
	constructor() {
		super();
	}
	connectedCallback() {
		console.log('pincode-checker is connected');

		// CREATED SHADOW DOM
		let shadow = this.attachShadow({ mode: 'open' });

		// CREATED ALL ELEMENTS IN THE ORDER OF CHILD TO PARENT
		let input = createElem('input', {
			type: 'text',
			maxlength: '6',
			required: true,
			placeholder: 'Enter Pincode',
			id: 'pincode-input',
			autocomplete: 'off',
		});

		let icon = createElem('img', { class: 'icon', src: './assets/check-mark-icon.svg', alt: '' });
		let div = createElem('div', { class: 'input-wrapper' }, '', [input, icon]);

		let button = createElem('button', { id: 'check-btn' }, 'Check');
		let form = createElem('form', { class: 'pincode-form' }, '', [div, button]);
		let p = createElem('p', { class: 'delivery-details' }, '');
		let wrapper = createElem('div', { class: 'wrapper' }, '', [form, p]);

		let style = createElem('style', {}, styles);
		// const sheet = new CSSStyleSheet();
		// sheet.replaceSync(styles);
		// shadow.adoptedStyleSheets = [sheet];

		/*
		 =============== JS LOGIC START ===============
		*/
		input.addEventListener('input', (e) => {
			removeDescription();
			this.setAttribute('value', input.value);
			this.setAttribute('valid', 'null');
		});

		// ON CLICKING CHECK PINCODE
		form.addEventListener('submit', async (e) => {
			e.preventDefault();

			if (isNaN(input.value)) {
				insertDescription('Enter numbers only', false);
				return;
			}
			toggleLoading();

			let { valid, message: deliveryDescription } = await checkPincode(input.value);
			// let isValid = deliveryDescription !== 'Enter valid pincode'  ;

			this.setAttribute('valid', valid ? 'true' : 'false');

			// removeDescription();
			toggleLoading();
			insertDescription(deliveryDescription, valid);
		});

		// REMOVES DELIVERY DESCRIPTION
		function removeDescription() {
			p.innerText = '';
			input.style.borderColor = '#000040';
			input.style.backgroundColor = 'initial';
			icon.style.visibility = 'hidden';
		}

		// ADDS DELIVERY DESCRIPTION
		function insertDescription(message, valid) {
			let validationColor = !valid ? 'rgb(172, 3, 3)' : 'rgb(11, 126, 46)';
			icon.src = !valid ? './assets/wrong-icon.svg' : './assets/check-mark-icon.svg';
			p.style.color = validationColor;
			input.style.borderColor = validationColor;
			input.style.backgroundColor = !valid ? 'rgba(220, 8, 8,0.2)' : 'rgba(11, 126, 46,0.2)';
			p.innerText = message;
			icon.style.visibility = 'visible';
		}

		function toggleLoading() {
			icon.src = './assets/loading-icon.svg';
			if (button.classList.contains('loading')) {
				icon.style.visibility = 'hidden';
				icon.classList.remove('rotate-anim');
				button.classList.remove('loading');
			} else {
				button.classList.add('loading');
				icon.style.visibility = 'visible';
				icon.classList.add('rotate-anim');
			}
		}
		/*
		 =============== JS LOGIC END ===============
		*/

		shadow.appendChild(style);
		shadow.appendChild(wrapper);
	}
}

customElements.define('pincode-checker', PincodeChecker);
