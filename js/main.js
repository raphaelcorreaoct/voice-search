(() => {
  const searchField = document.getElementById("search-field");
  const searchButton = document.getElementById("search-start");
  const result = document.querySelector(".table .table-body");

  const onClickSearchButton = (event, mySpeech) => {
    event.preventDefault();
    try {
      mySpeech.start();
    } catch (error) {
      console.error("Erro::", error.message);
    }
  };

  const onSpeech = (event) => {
    const text = event.results[0][0].transcript;
    searchField.value = text;
    fetchData(text);
  };

  const listComponent = (data) => {
    const html = data
      .map(
        (item) =>
          `<div class="table-row">
            <div class="table-item-body">${item.id}</div>
            <div class="table-item-body">${item.name}</div>
            <div class="table-item-body">${item.year}</div>
            <div class="table-item-body">${item.brand}</div>
          </div>`
      )
      .join("");

    console.log(html);

    result.innerHTML = html;
  };

  const fetchData = (brand) => {
    const searchBy = ["brand", "id", "year", "name"];
    const searchOption = Number(
      document.querySelector('input[name="searchBy"]:checked').value
    );

    fetch(`http://localhost:3000/posts?${searchBy[searchOption]}=${brand}`)
      .then((data) => data.json())
      .then(listComponent);
  };

  const start = (mySpeech) => {
    searchButton.addEventListener("click", (event) =>
      onClickSearchButton(event, mySpeech)
    );

    mySpeech.addEventListener("result", onSpeech);
  };

  if (window.SpeechRecognition || window.webkitSpeechRecognition) {
    const mySpeech = new webkitSpeechRecognition();
    mySpeech.lang = "pt-BR";
    start(mySpeech);
  }
})();
