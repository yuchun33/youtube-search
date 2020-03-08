import {QUERY_LISTS, RECEIVE_LISTS, LOAD_FROM_CACHE, FIRST_QUERY_LISTS} from '../actions'
import * as data from '../data.json'
let defaultData = data.default
function defaultDisplay(json) {
    let display = []
    let myItems = {}
    let data = json.items
    let index = 0
    for (let d in data) {
        myItems[index] = {
            videoId: data[d].id.videoId,
            url: data[d].snippet.thumbnails.medium.url,
            title: data[d].snippet.title
        }
        display.push(
            {
                videoId: data[d].id.videoId,
                url: data[d].snippet.thumbnails.medium.url,
                title: data[d].snippet.title
            }
        )
        index += 1
    }
    return {
        display,
        myItems
    }
}

let defaultList = defaultDisplay(defaultData)
const searchList = (state={
    keyword: '',
    isFetching: false,
    cache: [],
    items: {},
    display: [],
    pageToken: {},
    page: 0
},action) => {
    switch (action.type) {
        case FIRST_QUERY_LISTS:
            return Object.assign({},state,{
                isFetching: true,
                page: action.page,
                keyword: action.keyword,
                cache: [],
                items: {},
                display: [],
                pageToken: {},
            })
        case QUERY_LISTS:
            return Object.assign({},state,{
                isFetching: true,
                page: action.page,
                keyword: action.keyword,
            })
        case RECEIVE_LISTS:
            return Object.assign({},state,{
                isFetching: false,
                items: action.items,
                display: action.display,
                catch: action.catch,
                pageToken: action.pageToken
            })
        case LOAD_FROM_CACHE:
            return Object.assign({},state,{
                display: action.display,
                page: action.page
            })
        default:
            return state
    }
}

export default searchList