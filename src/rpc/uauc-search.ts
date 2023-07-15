import { AxiosResponse, AxiosResponseHeaders, InternalAxiosRequestConfig } from "axios"


export const uaucSearch = async (searchText: string) => {
    const mocks = [{
        id: 1,
        rule: 'rule 1'
    }, {
        id: 2,
        rule: 'rule 2'
    }, {
        id: 3,
        rule: 'rule 3'
    }, {
        id: 4,
        rule: 'rule 4'
    }, {
        id: 5,
        rule: 'rule 5'
    },]
    // axios.get(`https://xxx.com?searchText=${searchText}`)
    return {
        data: mocks,
        status: 200,
        statusText: 'string',
        headers: {} as AxiosResponseHeaders,
        config: {} as InternalAxiosRequestConfig<string>,
    } as AxiosResponse
}