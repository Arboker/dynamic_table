import React from 'react';
import { connect } from 'react-redux'
import './css/index.css'
import Row from './Row'
import { updateCoeff, changeCoeff, changeDataCoeff } from '../../store/actions/coefficientAction'
import { bindActionCreators } from 'redux'

import AddIcon from '../svg/AddIcon'
import DoneIcon from '../svg/DoneIcon'
import EditIcon from '../svg/EditIcon'

import CoefficientService from '../../services/CoefficientService'
class Table extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditable: false,
            current: this.props.coeff,
            currentIndex: {
                row: -1,
                index: -1
            },
            allowPaste: false,
            headerData: [
                {
                    key: "Value 1"
                },
                {
                    key: "Value 2"
                },
                {
                    key: "Value 3"
                },
                {
                    key: "Value 4"
                }
            ]
        }
    }

    componentDidMount = () => {
        this.callTableCycle()
    }

    callTableCycle = () => {
        const newData = this.props.coefficient.data.map((item, index) => {
            item.uid = index
            return item;
        })
        this.props.changeCoeff("data", newData)
    }

    edit = (bool) => {
        this.setState({
            isEditable: bool
        })
    }

    changeValue = (value, i, keyValue, exists) => {
        const key = keyValue

        const data = this.formatCurrentData()
        const current = data[i].values
        if (current !== undefined) {
            const re = /^[0-9]*\.?[0-9]*$/;
            if (value === '' || re.test(value)) {
                current[key] = {
                    value: value,
                    action: current[key] ? "update" : "insert"
                };

                this.props.changeCoeff("data", data)
            }
        }
    }

    remove = index => {
        let data = [...this.props.coeff]
        data.map((item, i) => {
            if (i === index) {
                item.action = "delete"
            }
        })
        this.props.changeCoeff("data", data)
    }

    add = () => {
        const data = this.props.coeff
        const obj = {
            values: {},
            ownCreated: true,
            uid: data.length
        }

        this.props.changeCoeff("data", [...data, obj])
    }

    formatCurrentData = () => {
        return this.props.coeff;
    }

    clipboarPasteData = (indexToInsert, startIndex) => {
        this.setState({
            currentIndex: {
                row: indexToInsert,
                index: startIndex
            }
        })
    }

    getLinebreak = () => {
        if (navigator.userAgent.indexOf("Windows") != -1) {
            return "\r\n";
        }
        return "\n";
    }

    pasteAction = () => {
        const indexToInsert = this.state.currentIndex.row
        const startIndex = this.state.currentIndex.index
        if (window.isSecureContext) {
            navigator.clipboard.readText().then(res => {
                const resArr = res.split(this.getLinebreak())
                const currentData = this.props.coefficient.data.filter((item, index) => index >= indexToInsert);
                if (currentData.length !== 0) {
                    const difference = resArr.length - currentData.length
                    if (difference > 0) {
                        for (let i = 0; i < difference; i++) {
                            this.add();
                        }
                    }
                }
                resArr.map((item, index) => {
                    let arrData = this.props.coefficient.data[indexToInsert]?.values

                    if (arrData !== undefined) {
                        item.split("\t").map((el, ind) => {
                            const elementIndex = startIndex + ind

                            this.changeValue(el, indexToInsert + index, "field" + elementIndex)
                        })
                    }
                })
            })
        }
        else {
            alert("It is not safe!")
        }
    }

    navigate = (direction) => {
        const currentPos = this.state.currentIndex;
        const data = this.props.coefficient.data
        const currentData = this.props.coefficient.data[currentPos.row]
        if (data !== undefined) {
            const values = Object.keys(currentData.values)
            let currIndex, indexTONavigate;

            if (direction === "right") {
                currIndex = values[currentPos.index + 1]
                indexTONavigate = currentPos.index + 1
            }

            if (direction === "left") {
                currIndex = values[currentPos.index - 1]
                indexTONavigate = currentPos.index - 1
            }
            if (direction === "down") {
                const dataRow = this.props.coefficient.data[currentPos.row + 1]
                if (dataRow) {
                    const dataRowValues = Object.keys(dataRow.values)
                    const valueIndex = dataRowValues[currentPos.index]
                    if (valueIndex !== undefined) {
                        currentPos.row = currentPos.row + 1
                    }
                }
            }
            if (direction === "top") {
                const dataRow = this.props.coefficient.data[currentPos.row - 1]
                if (dataRow) {
                    const dataRowValues = Object.keys(dataRow.values)
                    const valueIndex = dataRowValues[currentPos.index]
                    if (valueIndex !== undefined) {
                        currentPos.row = currentPos.row - 1
                    }
                }
            }
            if (direction === "delete") {
                if (!this.state.isEditable) {
                    const current = data[this.state.currentIndex.index];
                    const indexToInsert = this.state.currentIndex.row
                    const index = this.state.currentIndex.index

                    if (current !== undefined) {
                        this.changeValue("", indexToInsert, "field" + index)
                    }
                }
            }
            if (currIndex !== undefined) {
                currentPos.index = indexTONavigate;
            }

            this.setState({
                currentIndex: currentPos
            })
        }
    }

    componentDidUpdate = () => {
        if (this.props.coefficient.inserted) {
            this.callTableCycle();

            this.props.changeCoeff("inserted", false)
        }
    }

    render() {
        const formatedCurrent = this.formatCurrentData()
        return (
            <div>
                <table className="table">
                    <tbody>
                        <tr>
                            {this.state.headerData.map((item, index) => {
                                return (
                                    <th key={index}>{item.key}</th>
                                )
                            })}
                            <th className="action_th"></th>
                        </tr>
                        {formatedCurrent.map((item, i) => {
                            return (
                                <Row
                                    item={item}
                                    isEditable={this.state.isEditable}
                                    changeValue={this.changeValue}
                                    remove={this.remove}
                                    clipboarPasteData={this.clipboarPasteData}
                                    currentIndex={this.state.currentIndex}
                                    pasteAction={this.pasteAction}
                                    navigate={this.navigate}
                                    headerData={this.state.headerData}
                                    key={i}
                                    i={i}
                                />
                            )
                        })}
                    </tbody>
                </table>

                <div className="edit_table">
                    <AddIcon className="icon_table" onClick={this.add} />
                    {!this.state.isEditable ? (
                        <EditIcon className="icon_table" onClick={() => this.edit(true)} />
                    ) : (
                        <DoneIcon className="icon_table" onClick={() => this.edit(false)} />
                    )}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        data: state.selectReducer,
        coefficient: state.coefficientReducer
    }
}


const mapDispatchToProps = dispatch => {
    return {
        dispatch,
        ...bindActionCreators({ updateCoeff, changeCoeff, changeDataCoeff }, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Table);