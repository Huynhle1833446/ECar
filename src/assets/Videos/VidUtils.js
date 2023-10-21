module.exports = {
    getVideoSource(videoName) {
        switch (videoName) {
            case "intro" :
                return require ('./introVideo.mp4')
        }
    }
}