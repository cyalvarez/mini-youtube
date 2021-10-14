window.onload = function () {
	btnSort = document.getElementById("btn-sort")

	btnSort.addEventListener("click", async () => {
		handleSortVideos()
	})

	getAllVideos()
}

var btnSort;
var sort = "asc"

const getAllVideos = async () => {
	const results = await getVideos()
	showVideos(results)
}

const handleSortVideos = async () => {
	try {
		const response = await fetch("/api/videos?sort=" + sort)
		if (response.status === 200) {
			sort = sort === "asc" ? "desc" : "asc"
			btnSort.innerText = sort === "asc" ? "Sort ↑" : "Sort ↓"
			showVideos(await response.json())
		}
	} catch (e) {
		console.log(e)
	}
}

const showVideos = async (results) => {
	const parent = document.getElementById("sec-videos")
	parent.innerHTML=""
	results.forEach((result) => {
		addVideo(result, parent)
	})
}

const getVideos = async () => {
	try {
		const res = await fetch("/api/videos")
		if (res.status === 200) {
			return res.json()
		} else {
			return []
		}
	} catch (e) {
		return []
	}
}

const addVideo = (data, parent) => {
	const divVideo = document.createElement("div")
	const h3Title = document.createElement("h3")
	const imgThumb = document.createElement("img")
	const divInfo = document.createElement("div")
	const divSocial = document.createElement("div")
	const strDate = document.createElement("strong")
	const pDesc = document.createElement("p")

	const date = new Date(data.createdAt)

	h3Title.innerText = data.title
	imgThumb.src =data.img
	strDate.innerText = date.toLocaleDateString("EN-us")
	divSocial.innerText = `❤ ${data.likes} 👎 ${data.dislikes}`
	pDesc.innerText = data.description

	divVideo.appendChild(h3Title)
	divVideo.appendChild(imgThumb)
	divVideo.appendChild(divInfo)
	divVideo.appendChild(pDesc)
	divInfo.appendChild(strDate)
	divInfo.appendChild(divSocial)

	h3Title.className = "card-title"
	divVideo.className = "card video-item me-3 p-3 mb-3"
	imgThumb.className = "card-img-top"
	divInfo.className = "d-flex justify-content-between py-2"
	pDesc.className = "m-0"

	divVideo.addEventListener("click", () => {
		goToVideo(data._id)
	})

	parent.appendChild(divVideo)
}

const goToVideo = (id) => {
	window.location.href = '/video/' + id;
}