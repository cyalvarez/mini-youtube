window.onload = function () {
  btnSort = document.getElementById("btn-sort")

	btnSort.addEventListener("click", async () => {
		handleSortSearchVideos()
	})

  showResults()
}


const handleSortSearchVideos = async () => {
	try {
    const searchterm = getSearchTerm()
    const url= `/api/videos?term=${searchterm}&sort=${sort}`
		const response = await fetch(url)
		if (response.status === 200) {
			sort = sort === "asc" ? "desc" : "asc"
			btnSort.innerText = sort === "asc" ? "Sort ↑" : "Sort ↓"
			showSearchVideos(await response.json())
		}
	} catch (e) {
		console.log(e)
	}
}

const showSearchVideos = async (results) => {
  const parent = document.getElementById("sec-results")
  parent.innerHTML=""
  results.forEach((result) => {
    addVideo(result, parent)
  })

}

const getSearchTerm = () => {
  let regexp = new RegExp('[?&]term=([^&#]*)', 'i')
  let qString = regexp.exec(window.location.href)
  return qString ? qString[1] : null
}

const showResults = async () => {
  const searchterm = getSearchTerm()
  const results = await getSearchResults(searchterm)
  showSearchVideos(results)
}


const getSearchResults = async (searchTerm) => {
  try {
    const res = await fetch("/api/videos?term=" + searchTerm)
    if (res.status === 200) {
      return res.json()
    } else {
      return []
    }
  } catch (e) {
    return []
  }
}