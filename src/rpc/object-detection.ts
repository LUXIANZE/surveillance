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

// var myHeaders = new Headers();
// myHeaders.append("password", "test1234");
// myHeaders.append("Content-Type", "application/json");

// var raw = JSON.stringify({
//     "url": url
// });

// return fetch("https://pjei7pmfc1.execute-api.us-east-1.amazonaws.com/dev/detect-object", {
//     method: 'POST',
//     headers: myHeaders,
//     body: raw,
//     redirect: 'follow'
// })