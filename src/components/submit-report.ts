import axios from "axios"

export const submitReport = async () => {
    return axios.post("https://70mage2swh.execute-api.ap-southeast-1.amazonaws.com/dev/submitreport", {})
}