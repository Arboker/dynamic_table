import React from 'react';
import './css/index.css'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { chooseSelect } from '../../store/actions/selectAction'
class DropDown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        }
    }

    addItem = item => {
        let ignoreChanging = !this.props.coeff.loadedCoeff;

        if (this.props.ignoreChanging) {
            ignoreChanging = this.props.ignoreChanging;
        }
        if (ignoreChanging) {
            if (this.props.find) {
                this.props.find()
            }
            this.props.chooseSelect(this.props.keyValue, item)
        }
        else {
            const confirmAction = window.confirm("Вы уверены, что хотите изменить данные?")
            if (confirmAction) { 
                this.props.chooseSelect(this.props.keyValue, item)
            }
        }
        this.close()
    }

    open = () => {
        if (this.props.openedDropDown.key === this.props.keyValue) {
            this.props.toggleDD(!this.props.openedDropDown.value)
        }
        else {
            this.props.toggleDD(true)
        }

        document.addEventListener('click', this.handleOutsideClick, false);
    }

    close = () => {
        this.props.toggleDD(false)
    }

    handleOutsideClick = (e) => {
        if (this.props.openedDropDown.value && this.props.openedDropDown.key === this.props.keyValue) {
            if (!e.target.closest(".drop_down_container")) {
                this.close()
            }
        }
    }

    render() {
        const selected = this.props.selectedValue
        let title = Object.values(selected).length !== 0 ? selected.name || selected : "Выбрать"

        if (this.props.array) {
            title = selected || "Выбрать"
        }
        return (
            <div className="drop_down_container">
                <div className="drop_down_block" onClick={this.open}>
                    <span className="dd_title">{title}</span>
                    <div className="arrow_down"></div>
                </div>
                {this.props.openedDropDown.value && this.props.openedDropDown.key === this.props.keyValue ? (
                    <ul className="drop_down_list dropw_down_width">
                        {this.props.data.map((item, index) => {
                            return (
                                <li
                                    className="list_dd"
                                    onClick={() => this.addItem(item)}
                                    key={index}
                                >
                                    {item.name || item}
                                </li>
                            )
                        })}
                    </ul>
                ) : ""}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        coeff: state.coefficientReducer
    }
}

const mapDispatchToProps = dispatch => {
    return {
        dispatch,
        ...bindActionCreators({ chooseSelect }, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DropDown);