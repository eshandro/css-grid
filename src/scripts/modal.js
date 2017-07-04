let 	modalOverlay = document.getElementById('modal-overlay'),
		closeModal = document.getElementById('close-modal'),
		openModal = document.getElementById('open-modal');

closeModal.addEventListener('click', function() {
	modalOverlay.classList.toggle('modal-hidden');
});
openModal.addEventListener('click', function() {
	modalOverlay.classList.toggle('modal-hidden');
});
// Handle ESC key (key code 27) to close modal
document.addEventListener('keyup', function(e) {
   if (e.keyCode == 27) {
   	if(!modalOverlay.classList.contains('modal-hidden')) {
   		modalOverlay.classList.toggle('modal-hidden');		
   	}
   }
});