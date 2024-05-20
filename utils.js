export function createElem(tag, attributes = {}, textContent = '', children = []) {
	const elem = document.createElement(tag);

	for (const attr in attributes) {
		elem.setAttribute(attr, attributes[attr]);
	}

	elem.textContent = textContent;

	children.forEach((child) => {
		!!child && elem.appendChild(child);
	});

	return elem;
}

// Returns pincode details if exists or returns error message
export async function checkPincode(pincode) {
	return fetch(`https://api.postalpincode.in/pincode/${pincode}`)
		.then((res) => res.json())
		.then((data) => {
			let success = data[0].Status === 'Success';

			if (!success) {
				return { valid: false, message: 'Enter valid pincode' };
			} else {
				let postoffices = data[0]['PostOffice'];
				let postoffice = postoffices[0];

				// Filtered Deliverable post offices
				let deliveryAvaliablePostoffices = postoffices.filter(({ DeliveryStatus }) => DeliveryStatus === 'Delivery');

				if (deliveryAvaliablePostoffices.length !== 0) {
					// Slicing it to two names
					let name = deliveryAvaliablePostoffices
						.slice(0, Math.min(2, deliveryAvaliablePostoffices.length))
						.reduce((names, { Name }, index) => (names += `${index !== 0 ? '/' : ''}${Name}`), '');

					return { valid: true, message: `Deliver to ${postoffice.Pincode}, ${name}, ${postoffice.State}.` };
				}
			}
		})
		.catch((err) => {
			console.log('Entered catch block');
			console.log(err);
			return { valid: false, message: 'Something went wrong' };
		});
}
