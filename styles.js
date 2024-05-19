export let styles = `
.wrapper {
	--navy: 0, 0, 64;
	// max-width: fit-content;
	font-size: 0.85rem;
	color: green;
	font-weight: 500;
	margin-inline: auto;
}

.pincode-form {
	display: flex;
	// max-width: fit-content;
	// border: 1px solid rgba(var(--navy), 0.5);
	// border-radius: 0.3rem;
	overflow: hidden;
	transition: border-color ease 200ms;
}

.pincode-form > * {
	font-family: sans-serif;
}



#pincode-input:focus-within {
	border: 1px solid rgba(var(--navy), 1);
}

.input-wrapper{
	// display: flex;
	// align-items: center;
	position: relative;
}

#pincode-input {
	outline: none;
	// border: none;
	border: 1px solid rgba(var(--navy), 0.5);

	font-size: 1.2rem;
	padding: 0.7rem 1.4rem 0.7rem 1rem;
	border-radius: 0.3rem 0 0 0.3rem;
	flex-shrink:1;
}
#pincode-input:focus {
	outline: none;
}

#pincode-input::placeholder {
	margin-left: 1rem;
	font-weight: 500;
	font-family:sans-serif;
}

.icon {
	width:1rem;
	height:1rem;
	// margin-right:0.5rem;
	visibility: hidden;
	position: absolute;
	top: calc(50% - 1rem/2);
	right:0.5rem;

}
#check-btn {
	border: none;
	padding: 0.5rem 1.5rem;
	color: white;
	font-weight: 500;
	border-radius: 0 0.3rem 0.3rem 0;
	font-size: 1.2rem;
	background: rgba(var(--navy), 1);
	cursor: pointer;
	font-family: sans-serif;
	transition: opacity ease 200ms;
}

.loading {
	opacity:0.6
}

#check-btn:active {
	opacity: 0.8;
}

.delivery-details {
	height:2ch;
	animation: fade-in ease-out 0.5s;
	font-family: sans-serif;
	font-size: 1rem;
	margin-top:0.8rem;
	max-width: 380px;
}

@media (max-width:450px){
	.delivery-details {
		font-size:0.8rem;
	}

	#pincode-input,
	#check-btn{
		font-size:1rem;
	}
}

@keyframes fade-in {
	0% {
		opacity: 0;
	}
	100% {
		opacity: 1;
	}
}
`;
