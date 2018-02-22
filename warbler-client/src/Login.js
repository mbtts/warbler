import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as api from './api';
import FormField from './FormField';
import { Link } from 'react-router-dom';

export default class Login extends Component {
    static propTypes = {
        onLogin: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            fields: {
                email: '',
                password: '',
            },
            error: '',
            button: this.createButtonState(),
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    createButtonState(label = 'Log in', disabled = false) {
        return { label, disabled };
    }

    onChange(e) {
        this.setState({ fields: { ...this.state.fields, [e.target.name]: e.target.value } });
    }

    async onSubmit(e) {
        e.preventDefault();

        const { email, password } = this.state.fields;

        this.setState({ button: this.createButtonState('Logging in...', true) });

        try {
            const response = await api.login(email, password);
            this.props.onLogin(response);
            this.props.history.push('/');
        } catch (err) {
            this.setState({ error: err.message });
            this.setState({ button: this.createButtonState() });
        }
    }

    render() {
        const { fields, error, button } = this.state;

        return (
            <React.Fragment>
                <form onSubmit={this.onSubmit}>
                    <h2>Welcome back, or <Link to='/register'>register…</Link></h2>
                    {error ? <p className='error'>{error}</p> : null}
                    <FormField type='email' label='E-mail' name='email' value={fields.email} onChange={this.onChange} />
                    <FormField type='password' label='Password' name='password' value={fields.password} onChange={this.onChange} />
                    <p>
                        <input type='submit' value={button.label} disabled={button.disabled} />
                    </p>
                </form>
            </React.Fragment>
        );
    }
}
