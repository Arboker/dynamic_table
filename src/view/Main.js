import React from 'react';
import Select from '../components/Select/Select'
import DropDown from '../components/DropDown/DropDown'
import Table from '../components/Table/Table'
import Button from '../components/Button/Main'

class Main extends React.Component {
    render() {
        const props = this.props
        return (
            <div className="main">
                <Table
                    coeff={props.coeff.data}
                    selectedSum={props.selectedInsuredAmount}
                />
                <Button
                    isAllowed={true}
                    next={() => props.insert()}
                    title="Save"
                    info={
                        {
                            status: true,
                            loading: false
                        }
                    }
                />
            </div>
        )
    }
}

export default Main