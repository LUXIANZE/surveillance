import axios from "axios"

export const suggestUAUC = async (imageUrl: string) => {
    return axios.post("https://ixg08dwm53.execute-api.us-east-1.amazonaws.com/dev/get-suggested-rules", { url: imageUrl })
}