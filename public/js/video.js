window.onload = function () {
  const btnLike = document.getElementById("btn-like")
  const btnDislike = document.getElementById("btn-dislike")
  const btnAddComment = document.getElementById("btn-add-comment")
  const txtComment = document.getElementById("txt-comment")

  btnLike.addEventListener("click", () => {
    likeHandler(getId())
  })

  btnDislike.addEventListener("click", () => {
    dislikeHandler(getId())
  })

  btnAddComment.addEventListener("click", () => {
    addCommentHandler(getId(), txtComment.value)
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
  if (urlArray.length) {
    return urlArray[urlArray.length - 1]
  }
  return ""
}

const addCommentHandler = async (id, comment) => {
  const body = {
    idvideo: id,
    comment: comment
  }
  try {
    const response = await fetch("/api/comment", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json"
      },
    })
    if (response.status === 200) {
      addComment(await response.json())
    }
  } catch (e) {
    console.log(e)
  }

}

const addComment = (comment) => {
  const listComments = document.getElementById("list-comments")

  const itemComment = document.createElement("li")
  const strongDate = document.createElement("strong")
  const txtComment = document.createTextNode(` ${comment.comment} `)

  strongDate.innerText = new Date(comment.createdAt).toLocaleDateString("EN-us")

  itemComment.appendChild(strongDate)
  itemComment.appendChild(txtComment)

  itemComment.className = "mb-2"

  listComments.appendChild(itemComment)
}

const setLikes = (value) => {
  const spanLikes = document.getElementById("span-likes")
  spanLikes.innerText = value;
}

const setDislikes = (value) => {
  const spanDislikes = document.getElementById("span-dislikes")
  spanDislikes.innerText = value;
}

const likeHandler = async (id) => {
  try {
    const response = await fetch("/api/likes/" + id, {
      method: "PATCH",
    })
    if (response.status === 200) {
      const value = (await response.json()).likes
      setLikes(value)
    }
  } catch (e) {
  }
}

const dislikeHandler = async (id) => {
  try {
    const response = await fetch("/api/dislikes/" + id, {
      method: "PATCH",
    })
    if (response.status === 200) {
      const value = (await response.json()).dislikes
      setDislikes(value)
    }
  } catch (e) {
    console.log(e)
  }
}