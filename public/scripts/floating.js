document.addEventListener("DOMContentLoaded", function () {
  const floatingElements = document.querySelectorAll(".floating");

  floatingElements.forEach((element) => {
    // Decrease the speed of movement
    let xSpeed = Math.random() * 0.2 + 0.1;  
    let ySpeed = Math.random() * 0.2 + 0.1;

    // Set the initial position within the screen boundaries
    element.style.position = 'absolute';
    element.style.left = `${Math.random() * (window.innerWidth - element.offsetWidth)}px`;
    element.style.top = `${Math.random() * (window.innerHeight - element.offsetHeight)}px`;

    let directionX = Math.random() > 0.5 ? 1 : -1; // Initial X direction
    let directionY = Math.random() > 0.5 ? 1 : -1; // Initial Y direction

    function move() {
      let rect = element.getBoundingClientRect();
      
      // Check for collision with the left and right edges of the screen
      if (rect.left <= 0 || rect.right >= window.innerWidth) {
        directionX *= -1;  // Reverse the X direction
      }
      
      // Check for collision with the top and bottom edges of the screen
      if (rect.top <= 0 || rect.bottom >= window.innerHeight) {
        directionY *= -1;  // Reverse the Y direction
      }

      // Update the new position
      let newX = rect.left + xSpeed * directionX;
      let newY = rect.top + ySpeed * directionY;

      // Ensure the element stays within the screen boundaries
      element.style.left = `${Math.max(0, Math.min(newX, window.innerWidth - rect.width))}px`;
      element.style.top = `${Math.max(0, Math.min(newY, window.innerHeight - rect.height))}px`;
    }

    setInterval(move, 10); // Update the position every 100ms
  });
});