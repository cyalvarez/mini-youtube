(function () {
  const btnSearch = document.getElementById("btn-search")
  const txtSearch = document.getElementById("txt-search")

  btnSearch.addEventListener("click", () => {
    searchHandler()
  })

  const searchHandler = () => {
    window.location.href = '/search?term=' + txtSearch.value;
  }
})()