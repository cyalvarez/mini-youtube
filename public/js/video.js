window.onload = function () {
  const btnLike = document.getElementById("btn-like")
  const btnDislike = document.getElementById("btn-dislike")

  btnLike.addEventListener("click", () => {
    likeHandler()
  })

  btnDislike.addEventListener("click", () => {
    console.log("Dislike!")
  })

  setStream(getId());
}

const setStream = (id) => {
  const player = document.getElementById("video-player")
  const source = document.createElement("source")

  source.src = "/api/video/" + id
  source.type = "video/mp4"

  player.appendChild(source)
}

const getId = () => {
	const urlArray = window.location.href.split("/")
	if(urlArray.length){
		return urlArray[urlArray.length - 1]
	}
  return ""
}

const likeHandler = () => {
  fetch("http://localhost:3000/api/like").then((res) => {
    console.log(res)
  }).catch((err) => {
    console.log(err)
  })
}