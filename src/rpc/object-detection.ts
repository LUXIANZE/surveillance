import axios from 'axios'
export const detectObject = async (url: string) => {
    // https://c8.alamy.com/comp/EG51H5/man-climbing-ladder-EG51H5.jpg
    return axios.post('https://pjei7pmfc1.execute-api.us-east-1.amazonaws.com/dev/detect-object', {
        url: url
    }, {
        headers: {
            'password': 'test1234'
        }
    })
}