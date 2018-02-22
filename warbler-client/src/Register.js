import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as api from './api';
import FormField from './FormField';

export default class Register extends Component {
    static propTypes = {
        onRegister: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            fields: {
                email: '',
                username: '',
                password: '',
                profileImageUrl: '',
            },
            error: '',
            button: this.createButtonState(),
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    createButtonState(label = 'Sign me up!', disabled = false) {
        return { label, disabled };
    }

    onChange(e) {
        this.setState({ fields: { ...this.state.fields, [e.target.name]: e.target.value } });
    }

    async onSubmit(e) {
        e.preventDefault();

        const { email, username, password, profileImageUrl } = this.state.fields;

        this.setState({ button: this.createButtonState('Signup up...', true) });

        try {
            const response = await api.register(email, username, password, profileImageUrl);
            this.props.onRegister(response);
            this.props.history.push('/');
        } catch (err) {
            this.setState({ error: err.message, button: this.createButtonState() });
        }
    }

    render() {
        const { fields, error, button } = this.state;

        return (
            <React.Fragment>
                <form onSubmit={this.onSubmit}>
                    <h2>Join Warbler today.</h2>
                    {error ? <p className='error'>{error}</p> : null}
                    <FormField type='email' label='E-mail' name='email' value={fields.email} onChange={this.onChange} />
                    <FormField label='Username' name='username' value={fields.username} onChange={this.onChange} />
                    <FormField type='password' label='Password' name='password' value={fields.password} onChange={this.onChange} />
                    <FormField label='Image URL' name='profileImageUrl' value={fields.profileImageUrl} onChange={this.onChange} />
                    <p>
                        <input type='submit' value={button.label} disabled={button.disabled} />
                    </p>
                </form>
            </React.Fragment>
        );
    }
}
