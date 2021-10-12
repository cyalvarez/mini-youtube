window.onload = function () {
    const btnUpload = document.getElementById("btn-upload")
    btnUpload.addEventListener("click", (e) => {
        handleUploadVideo();
    })
}

const handleUploadVideo = async () => {
    const formData = new FormData(document.getElementById("form-upload"))
    try {
        const response = await fetch("/api/video", {
            method: "POST",
            body: formData,
        })
        switch (response.status) {
            case 200:
                alert("Video uploaded successfully")
                window.location.href = "/"
                break;
            default:
                alert("Error: " + (await response.json()).error)
        }
    } catch (e) {
        alert("An error occurred, try again")
    }
}