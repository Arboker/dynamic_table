import React, { createElement } from 'react';
import MainView from '../view/Main'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { addToSelect, chooseSelect } from '../store/actions/selectAction'
import { changeCoeff } from '../store/actions/coefficientAction'
import CoefficientService from '../services/CoefficientService'
import insertData from '../helpers/insertion'
import NomenclatureService from '../services/NomenclatureService'
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
        data: state.selectReducer,
        coeff: state.coefficientReducer
    }
}

const mapDispatchToProps = dispatch => {
    return {
        dispatch,
        ...bindActionCreators({
            addToSelect, chooseSelect, insertData, changeCoeff
        }, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);