let 	modalOverlay = document.getElementById('modal-overlay'),
		closeModal = 	document.getElementById('close-modal'),
		openModal = 	document.getElementById('open-modal'),
		body = document.body;

closeModal.addEventListener('click', function() {
	modalOverlay.classList.toggle('modal-hidden');
	modalOverlay.setAttribute("aria-hidden", "true");
	// Turn scrolling back on for rest of content
	body.classList.toggle('noScroll');
});
openModal.addEventListener('click', function() {
	modalOverlay.classList.toggle('modal-hidden');
	modalOverlay.setAttribute("aria-hidden", "false");
	// Prevent rest of content from scrolling
	// console.log(this.clientTop());
	body.classList.toggle('noScroll');
});
// Allow ESC key (key code 27) to close modal
document.addEventListener('keyup', function(e) {
   if (e.keyCode == 27) {
   	if(!modalOverlay.classList.contains('modal-hidden')) {
   		modalOverlay.classList.toggle('modal-hidden');		
   	}
   }
});
