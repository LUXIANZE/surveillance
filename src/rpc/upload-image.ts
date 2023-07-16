import axios from "axios"

export const uploadImage = async (base64str: string) => {
    // https://wmiagzc77tdg4q3isyxeiqsuuq0aapwn.lambda-url.ap-southeast-1.on.aws/
    // https://70mage2swh.execute-api.ap-southeast-1.amazonaws.com/Stage/uploadimage/
    // https://cg42t7o7g5.execute-api.ap-southeast-1.amazonaws.com/dev/upload-image
    return axios.post("https://70mage2swh.execute-api.ap-southeast-1.amazonaws.com/Stage/upload-image", { data: base64str },
        // {
        //     headers: {
        //         'Access-Control-Allow-Origin': '*'
        //     }
        // }
    )
}