import React from 'react';
import Table from '../components/Table/Table'
import Button from '../components/Button/Main'

class Main extends React.Component {
    render() {
        const props = this.props
        return (
            <div className="main">
                <Table
                    table={props.table.data}
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