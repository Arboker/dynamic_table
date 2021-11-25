import React, { createElement } from 'react';
import MainView from '../view/Main'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import insertData from '../helpers/insertion'
class Main extends React.Component {

    insert = () => {
        this.props.insertData()
    }

    render() {
        return createElement(MainView, {
            next: this.next,
            insert: this.insert,
            ...this.state,
            ...this.props
        })
    }
}


const mapStateToProps = state => {
    return {
        table: state.tableReducer
    }
}

const mapDispatchToProps = dispatch => {
    return {
        dispatch,
        ...bindActionCreators({
            insertData
        }, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);