import React from 'react';
import './css/index.css'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { addToSelect, removeFromSelect, removeAllSelect, removeElement } from '../../store/actions/selectAction'
import { actionCoeff, changeCoeff } from '../../store/actions/coefficientAction'

class Select extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isAdding: false,
            selected: [
                {
                    id: 1,
                    name: "test"
                }
            ]
        }
    }

    remove = (item) => {
        const id = item.id || item;
        if (this.props.isCoefficient) {
            this.props.actionCoeff(this.props.keyValue, item)
        }
        else {
            this.props.removeFromSelect(this.props.keyValue, id)
        }
    }

    openDropDown = () => {
        this.setState({
            isAdding: true
        })
        document.addEventListener('click', this.handleOutsideClick, false);
    }

    handleOutsideClick = (e) => {
        if (this.state.isAdding) {
            const expression = (typeof e.target.className === "string" && e.target.className.trim() === "list_countries")
            if (!e.target.closest(".selected_container") && !e.target.closest(".add") && !expression) {
                this.close();
            }
        }
    }

    close = () => {
        this.setState({
            isAdding: false
        })
    }

    addItem = (item, exists) => {
        if (!exists) {
            if (this.props.isCoefficient) {
                this.props.actionCoeff(this.props.keyValue, item)
            }
            else {
                this.props.addToSelect(this.props.keyValue, item)
            }
            this.close()
        }
    }

    checkIfExists = (id) => {
        let exists = false;
        this.props.selectedData.map(item => {
            const el = item.id || item;
            if (el === id) {
                exists = true;
            }
        })
        return exists;
    }

    removeAll = () => {
        if (this.props.isCoefficient) {
            const data = [...this.props.data].map(item => {
                item.selected = false
                return item
            })
            this.props.changeCoeff(this.props.keyValue, data)
        }
        else {
            this.props.removeAllSelect(this.props.keyValue)
        }
    }

    render() {
        return (
            <div className="selected_container">
                <div className="selected_list">
                    <div className="select">
                        {this.props.selectedData.length !== 0 ? (
                            this.props.selectedData.map((item, index) => {
                                return (
                                    <div className="selected_text_block" key={index}>
                                        <span>{item.name || item}</span>
                                        <div className="close_icon" onClick={() => this.remove(item)}></div>
                                    </div>
                                )
                            })
                        ) : ""}

                        {!this.state.isAdding ? (
                            <div className="selected_text_block add" onClick={this.openDropDown}>
                                <div className="add_icon_map"></div>
                                <span>Добавить</span>
                            </div>
                        ) : ""}
                    </div>
                    <div className="close_all" onClick={this.removeAll}>
                        <div className="close_icon"></div>
                    </div>
                </div>

                {this.state.isAdding ? (
                    <ul className="drop_down_list">
                        {this.props.data.length !== 0 ? (
                            this.props.data.map((el, index) => {
                                let exists = this.checkIfExists(el.id || el)
                                return (
                                    <li
                                        onClick={() => this.addItem(el, exists)}
                                        key={index}
                                        className={
                                            (exists ? " exists " : "") + " list_dd"}>
                                        {el.name || el}
                                    </li>
                                )
                            })
                        ) : ""}
                    </ul>
                ) : ""}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {}
}

const mapDispatchToProps = dispatch => {
    return {
        dispatch,
        ...bindActionCreators({ addToSelect, removeFromSelect, 
            removeAllSelect, removeElement, actionCoeff, changeCoeff }, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Select);