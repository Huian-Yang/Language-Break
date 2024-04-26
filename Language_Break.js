let themeButton = document.getElementById("theme-button");

const toggleDarkMode = () => {
  
  document.body.classList.toggle("dark-mode");
  
}

themeButton.addEventListener("click", toggleDarkMode);

const addSignature = (person) => {

  const newSignature = document.createElement('p');
  newSignature.textContent = `🖊️ ${person.name} from ${person.hometown} supports this.`;

  const signaturesSection = document.querySelector('.signatures');

  signaturesSection.appendChild(newSignature);

  toggleModal(person);
}


const signNowButton = document.getElementById('sign-now-button');

// Attach a click event listener to the button
signNowButton.addEventListener('click', function(event) {
  event.preventDefault(); // Prevent the default button click behavior
  validateForm(); // Call the validateForm function
});

const validateForm = () => {
  let containsErrors = false;
  let petitionInputs = document.getElementById("sign-petition").elements;

  // Check if petitionInputs exist before accessing their values
  if (petitionInputs) {
    let person = {
      name: petitionInputs["fname"].value,
      hometown: petitionInputs["location"].value,
      email: petitionInputs["email"].value
    };

    for (let i = 0; i < petitionInputs.length; i++) {
      if (person.hometown.length < 2) {
        petitionInputs[i].classList.add('error');
        containsErrors = true;
      } else {
        petitionInputs[i].classList.remove('error');
      }
    }
    if (containsErrors == false) {
      addSignature(person);
      for (let i = 0; i < petitionInputs.length; i++) {
        petitionInputs[i].value = "";
      }
    }
  } else {
    console.error("Petition inputs not found");
  }
}


//new animation object

let animation = {
  revealDistance: 150,
  initialOpacity: 0,
  transitionDelay: 0,
  transitionDuration: '2s',
  transitionProperty: 'all',
  transitionTimingFunction: 'ease'
  
}

//select all element in the class 'revealable'

let revealableContainers = document.querySelectorAll('.revealable');

const reveal = () => {
  for (let i = 0; i < revealableContainers.length; i++) {
    let windowHeight = window.innerHeight;
    let topOfRevealableContainer = revealableContainers[i].getBoundingClientRect().top;

    if (topOfRevealableContainer < windowHeight - animation.revealDistance) {
      revealableContainers[i].classList.add('active');
    } else {
      revealableContainers[i].classList.remove('active');
    }
  }
}

window.addEventListener('scroll', reveal);

const toggleModal = (person) => {
  let modal = document.getElementById("thanks-modal");
  let modalContent = document.getElementById("modal-text-container");
  let modalText = document.getElementById("thanks-message");

  modal.style.display = "flex";
  modalContent.textContent = `Thank you so much ${person.name}! ${person.hometown} represent!`;

  setTimeout(() => {
    modal.style.display = "none";
  }, 4000);

  let intervalId = setInterval(scaleImage, 500);
  setTimeout(() => {
    clearInterval(intervalId);
  }, 10000);
  
}

const form = document.getElementById('sign-petition');

form.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the default form submission behavior
  validateForm(); // Call the validateForm function
});


let scaleFactor = 1; 
let modalImage = document.getElementById("modal-image");

const scaleImage = () => {
  if (scaleFactor === 1) {
    scaleFactor = 0.8;
  } else {
    scaleFactor = 1;
  }
  modalImage.style.transform = `scale(${scaleFactor})`;
}