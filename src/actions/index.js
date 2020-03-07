export const QUERY_LISTS = 'QUERY_LISTS';
export const RECEIVE_LISTS = 'RECEIVE_LISTS';
export const LOAD_FROM_CACHE = 'LOAD_FROM_CACHE';
import {myKey} from './mykey'
const queryNum = 10
export function query(keyword, page){
    return (dispatch, getState) =>{
        dispatch({
            type: QUERY_LISTS,
            page,
            keyword
        })
        let queryUrl        
        let updateCache = getState().cache
        if(page<1){
            queryUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=${queryNum}&q=${keyword}&key=${myKey}`
            updateCache.push(page)
        }
        else{
            if (!(page in getState().pageToken)){
                let maxLoadedPage = Math.max(...getState().cache)
                let pageToken = getState().pageToken[maxLoadedPage+1]
                let queryNum = (page-maxLoadedPage)*10
               
                queryUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=${queryNum}&q=${keyword}&pageToken=${pageToken}&key=${myKey}`
                for(let i=maxLoadedPage+1; i<=page; i++){
                    updateCache.push(i)
                }
                page = maxLoadedPage+1
            } else {  
                let pageToken = getState().pageToken[page]
                queryUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=${queryNum}&q=${keyword}&pageToken=${pageToken}&key=${myKey}`
                updateCache.push(page)
            }  
        } 
        fetch(queryUrl,{
        })
        .then((res) => res.json())
        .then((json) => {
            let display = []
            let myItems = {}
            let data = json.items
            let index = page * 10
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
            let pageToken = getState().pageToken
            pageToken[page+1] = json.nextPageToken
            let items = Object.assign({}, getState().items, myItems)                            
            dispatch({
                type: RECEIVE_LISTS,
                items: items,
                display,
                catch: updateCache,
                pageToken
            })
        })
    }
}

export function clickPage(page){
    return(dispatch, getState) =>{        
        if(page in getState().cache){                  
            let display = []
            let items = getState().items
            for(let i = page*queryNum; i<(page+1)*queryNum; i++){
                display.push(items[i])                
            }            
            return dispatch({
                type: LOAD_FROM_CACHE,
                display,
                page
            })
        } else {            
            dispatch(query(getState().keyword, page))
        }
    }
}
