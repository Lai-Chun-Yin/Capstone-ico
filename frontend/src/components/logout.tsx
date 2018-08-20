import * as React from "react";
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import * as actions from '../reducers/auth/actions';

interface ILogoutProps {
    onLogout: ()=>void
}

class Logout extends React.Component<ILogoutProps, {}> {
    public componentDidMount () {
        this.props.onLogout();
    }

    public render () {
        return <Redirect to="/"/>;
    }
}

const mapDispatchToProps = (dispatch:any) => {
    return {
        onLogout: () => dispatch(actions.logout())
    };
};

export default connect(null, mapDispatchToProps)(Logout);