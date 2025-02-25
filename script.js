document.addEventListener("DOMContentLoaded", function () {
  const jokeDisplay = document.getElementById('jokeDisplay');
  const jokeButton = document.getElementById('jokeButton');
  const copyButton = document.getElementById('copyButton');

  function getJoke() {
    fetch('roast.json')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        if (!data.roasts || data.roasts.length === 0) {
          throw new Error("No jokes found in JSON");
        }

        const randomIndex = Math.floor(Math.random() * data.roasts.length);
        const joke = data.roasts[randomIndex].roast;

        // Display the joke
        jokeDisplay.textContent = joke;
      })
      .catch(error => {
        console.error('Error fetching jokes:', error);
        jokeDisplay.textContent = "Failed to load a roast. Try again!";
      });
  }

  function copyJoke() {
    if (jokeDisplay.textContent !== "Click the button to get a roast!") { // Avoid copying default text
      navigator.clipboard.writeText(jokeDisplay.textContent).then(() => {
      }).catch(err => {
        console.error("Failed to copy joke: ", err);
      });
    } else {
      alert("Generate a joke first!");
    }
  }

  // Attach event listeners
  jokeButton.addEventListener("click", getJoke);
  copyButton.addEventListener("click", copyJoke);
});
