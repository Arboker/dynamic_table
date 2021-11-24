import React, { useState } from "react";
import './css/index.css'

const Button = ({ isAllowed, next, info, validate, title }) => {
    const [loading, setLoading] = useState(false)

    let dynamicLoading = loading;
    if (info !== undefined) {
        dynamicLoading = info.loading;
    }


    const nexBlock = () => {
        if (info !== undefined) {
            next();
        }
        else {
            if (isAllowed) {
                setLoading(true)
                setTimeout(() => {
                    setLoading(false)
                    next();
                }, 400)
            }
            else {
                if (validate) {
                    validate()
                }
            }
        }
    }

    return (
        <button
            className={"continue" +
                ((!isAllowed) ? " continue_not_allowed" : " continue_allowed") +
                ((dynamicLoading ? " loading_button" : ""))}
            onClick={() => nexBlock()}>
            {dynamicLoading ? (
                <div className="loader"></div>
            ) : ""}
            {dynamicLoading ? (
                <div className="overlay_loading"></div>
            ) : ""}

            <span className="button_text">{title}</span>
            {!dynamicLoading ? (
                <div className="continue_image"></div>
            ) : ""}
        </button>
    )
}

export default Button;