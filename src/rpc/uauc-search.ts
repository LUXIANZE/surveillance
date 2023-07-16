import { AxiosResponse, AxiosResponseHeaders, InternalAxiosRequestConfig } from "axios"
import MiniSearch from 'minisearch'

export interface UAUC {
    id: number,
    category: string,
    subCategory: string,
    rule: string,
    hazardLevel: number
}

const UAUC_SAMPLE: UAUC[] = [{
    id: 1,
    category: 'electrical hazard',
    subCategory: 'exposed electric cables',
    rule: 'Wire cables are exposed without any caution sign',
    hazardLevel: 2
}, {
    id: 2,
    category: 'physical hazard',
    subCategory: 'slippery floor',
    rule: 'Floor is wet without caution sign',
    hazardLevel: 2
}, {
    id: 3,
    category: 'fall hazard',
    subCategory: 'climbing without safety harness',
    rule: 'Failure to use fall protection systems',
    hazardLevel: 3
}, {
    id: 4,
    category: 'fire hazard',
    subCategory: 'blocked firedoor',
    rule: 'Firedoor blocked by inventory, hindering evacuation during emergency',
    hazardLevel: 2
}, {
    id: 13,
    category: 'fall hazard',
    subCategory: 'unsafe protective barrier',
    rule: 'Metal barrier on plant platform not in good condition',
    hazardLevel: 3
}, {
    id: 5,
    category: 'physical hazard',
    subCategory: 'messy cables',
    rule: 'Electric cables is not organise',
    hazardLevel: 1
}, {
    id: 6,
    category: 'physical hazard',
    subCategory: 'distraction and inattentiveness',
    rule: 'Using mobile phone for non-working purposes',
    hazardLevel: 1
}, {
    id: 7,
    category: 'ergonomic hazard',
    subCategory: 'improper lifting posture',
    rule: 'Wrong technique while lifting heavy object from ground',
    hazardLevel: 1
}, {
    id: 8,
    category: 'physical hazard',
    subCategory: 'blocked walkway',
    rule: 'Dustbin located in the middle walkway',
    hazardLevel: 3
}, {
    id: 9,
    category: 'fire hazard',
    subCategory: 'smoking',
    rule: 'Smoking in non-smoking compound',
    hazardLevel: 1
}, {
    id: 10,
    category: 'ergonomic hazard',
    subCategory: 'poor lighting',
    rule: 'Insufficient lighting levels in work areas',
    hazardLevel: 1
}, {
    id: 11,
    category: 'fire hazard',
    subCategory: 'expired fire extinguisher',
    rule: 'Malfunctioning fire safety equipment',
    hazardLevel: 2
}, {
    id: 12,
    category: 'physical hazard',
    subCategory: 'equipment operation',
    rule: 'Operating machinary or equipment without proper training',
    hazardLevel: 2
}]
const minisearch = new MiniSearch({
    fields: ['rule'],
    storeFields: ['category', 'subCategory', 'rule', 'hazardLevel']
})

minisearch.addAll(UAUC_SAMPLE)

export const uaucSearch = async (searchText: string) => {
    const res = minisearch.search(searchText, { fuzzy: 0.2, prefix: true })
    // axios.get(`https://xxx.com?searchText=${searchText}`)
    return {
        data: res,
        status: 200,
        statusText: 'string',
        headers: {} as AxiosResponseHeaders,
        config: {} as InternalAxiosRequestConfig<string>,
    } as AxiosResponse
}