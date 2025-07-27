function getCoords(e) {
	if (e instanceof MouseEvent) {
		const rect = e.target.getBoundingClientRect();
		(coordX = e.clientX - rect.left), (coordY = e.clientY - rect.top);
		console.log("x: " + coordX + " y: " + coordY);
		return {
			x: coordX,
			y: coordY,
		};
	}
}
export function useUtils() {
	function openModal(modal,x) {
		
			modal.style.visibility = "visible";
				setTimeout(() => {
					modal.style.opacity = 1;
				}, 100);
		if(modal.style.visibility == "visible"){
           modal.querySelector("input").value = x
      }
	}
	// function closeModal(modal) {
	// 	if (modal) {
	// 		modal.style.opacity = 0;
	// 		setTimeout(() => {
	// 			modal.style.visibility = "hidden";
	// 		}, 300);
	// 	}
	// }
	return {
		openModal,
		// closeModal,
	};
}
