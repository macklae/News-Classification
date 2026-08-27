document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("classifyButton");
  const articleInput = document.getElementById("articleText");
  const resultBox = document.getElementById("result");
  const categoryText = document.getElementById("category");

  button.addEventListener("click", async () => {
    const article = articleInput.value.trim();

    if (!article) {
      alert("Please enter some news article content.");
      return;
    }

    button.disabled = true;
    button.innerHTML = "Classifying...";

    resultBox.classList.add("hidden");

    try {
      const response = await fetch("/predict", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          text: article,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Classification failed.");
      }

      categoryText.textContent = String(data.category).toUpperCase();

      resultBox.classList.remove("hidden");
    } catch (error) {
      console.error(error);

      alert("Unable to classify the article.");
    } finally {
      button.disabled = false;

      button.innerHTML = "Classify Article <span>→</span>";
    }
  });
});
