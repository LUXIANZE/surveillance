import axios from "axios"

export const suggestUAUC = async () => {
    return axios.post("https://ixg08dwm53.execute-api.us-east-1.amazonaws.com/dev/get-suggested-rules", { url: "https://previews.123rf.com/images/mimagephotography/mimagephotography1709/mimagephotography170900165/87300906-full-length-portrait-of-man-walking-and-holding-mobile-phone-with-headphones.jpg" })
}