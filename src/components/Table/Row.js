import React from 'react';

class Row extends React.Component {
    changeValue = (e, i, exists) => {
        const key = e.target.getAttribute("data-id");
        this.props.changeValue(e.target.value, i, key, exists)
    }
    remove = (i) => {
        this.props.remove(i)
    }
    touch = (i, startIndex) => {
        this.props.clipboarPasteData(i, startIndex)
    }
    call = (e) => {
        var key = e.which || e.keyCode;
        var ctrl = e.ctrlKey ? e.ctrlKey : ((key === 17) ? true : false);
        var cmdHeld = e.metaKey;

        if (key === 37) {
            this.props.navigate("left")
        }
        if (key === 38) {
            this.props.navigate("top")
        }
        if (key === 39) {
            this.props.navigate("right")
        }
        if (key === 40) {
            this.props.navigate("down")
        }
        if (key === 8) {
            this.props.navigate("delete")
        }

        if (key === 86 && ctrl || cmdHeld && key === 86) {
            this.props.pasteAction()
        }
    }

    render() {
        const { item, i, headerData, currentIndex } = this.props
        if (item.action !== "delete") {
            return (
                <tr
                    key={i}
                >
                    {headerData.map((header, inx) => {
                        const elementValue = item.values["field" + inx];
                        return (
                            <td
                                onClick={(e) => this.touch(i, inx)}
                                onKeyDown={e => this.call(e)}
                                tabIndex="0"
                                className={currentIndex.row === i && currentIndex.index === inx ? "active_td" : ""}
                            >
                                {this.props.isEditable ? (
                                    <input type="text"
                                        value={elementValue ? elementValue.value : ""}
                                        onChange={e => this.changeValue(e, i, elementValue)}
                                        data-id={"field" + inx}
                                        className="td_input"
                                    />
                                ) : elementValue ? elementValue.value : ""}
                            </td>
                        )
                    })}

                    <td className="remove_icon" onClick={() => this.remove(item.uid || i)}></td>
                </tr >
            )
        }
        return ""
    }
}

export default Row;