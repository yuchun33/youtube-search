import Main from '../components/main.js'
import {connect} from 'react-redux'
import {firstQuery, clickPage} from '../actions'

const mapStateToProps = (state, ownProps) =>{
    return{
        searchList: state
    }
}

const dispatchToProps = (dispatch, ownProps) =>{
    return{
        query: (keyword, page)=>{            
            dispatch(firstQuery(keyword, page))

        },
        clickPage: (page)=>{            
            dispatch(clickPage(page))
        }
    }
}

const MainContainer = connect(
    mapStateToProps,
    dispatchToProps
)(Main)

export default MainContainer