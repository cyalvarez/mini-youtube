window.onload = function () {
  showResults()
}

const getSearchTerm = () => {
  let regexp = new RegExp('[?&]term=([^&#]*)', 'i')
  let qString = regexp.exec(window.location.href)
  return qString ? qString[1] : null
}

const showResults = async () => {
  const searchterm = getSearchTerm()
  const results = await getSearchResults(searchterm)
  const parent = document.getElementById("sec-results")
  results.forEach((result) => {
    addVideo(result, parent)
  })
}

const getSearchResults = async (searchTerm) => {
  try {
    //const res = await fetch("/api/search?s=" + searchTerm)
    const res = await fetch("/api/videos?term=" + searchTerm)
    if (res.status === 200) {
      return res.json()
    } else {
      return []
    }
  } catch (e) {
    console.log(e)
    return []
  }
}