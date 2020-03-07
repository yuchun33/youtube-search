import React, { Component } from 'react';
import './style.css'

class Main extends Component {
    constructor(props){
        super(props);
        this.state = {
            keyword: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleChange(event){
        this.setState({ keyword: event.target.value})
    }
    handleSubmit(event){
        event.preventDefault()
        this.props.query(this.state.keyword, 0)
    }
    render(){  
        let {searchList, clickPage} = this.props 
        let pagination = [0,1,2,3,4,5]
        return(
            <>
            <div className='mainContainer'>
                <div className='queryDiv'>
                <form>
                    <input className="keyWordInput" value={this.state.keyword} name='keyword' type='text' placeholder="Youtube Search API" onChange={this.handleChange}></input>
                    <button className="queryBtn" onClick={this.handleSubmit}><img src="https://img.icons8.com/android/30/ffffff/search.png"></img></button>
                </form>
                </div>

                {
                    searchList.isFetching?
                    <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>                    :
                    <div className='videoListContainer'>
                    {searchList.display.map((item,index)=>(<div key={index} className='videoBox'>
                        <a href={`https://www.youtube.com/watch?v=${item.videoId}`} target="_blank"><img src={item.url}/></a>
                        <div className='videoTitle'>{item.title}</div>
                    </div>))}
                    </div>
                }

                {
                    (searchList.cache.length>0)?
                    <div className="pageBtns">
                    {pagination.map((page,index)=>{
                        if(searchList.page == page){
                            return <div className="presentPage" key={index} onClick={()=>{clickPage(page)}}>{page+1}</div>
                        } else {
                            return <div key={index} onClick={()=>{clickPage(page)}}>{page+1}</div>
                        }               
                    })}
                    </div>
                    :
                    <></>
                }
            </div>
            </>
            

        )
    }
}

export default Main