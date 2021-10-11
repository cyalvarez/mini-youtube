window.onload = function () {
	showVideos()
}

const showVideos = async () => {
	const results = await getVideos()
	const parent = document.getElementById("sec-videos")
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
		console.log(e)
		return []
	}
}

const addVideo = (data, parent) => {
	const divVideo = document.createElement("div")
	const h3Title = document.createElement("h3")
	const imgThumb = document.createElement("img")

	h3Title.innerText = data.title
	imgThumb.src = "data:image/jpeg;charset=utf-8;base64," + data.img

	divVideo.appendChild(imgThumb)
	divVideo.appendChild(h3Title)

	h3Title.className = "card-title"
	divVideo.className = "card video-item me-3 p-2 mb-3	"
	imgThumb.className = "card-img-top"

	divVideo.addEventListener("click", () => {
		goToVideo(data._id)
	})

	parent.appendChild(divVideo)
}

const goToVideo = (id) => {
	window.location.href = 'http://localhost:3000/video/' + id;
}