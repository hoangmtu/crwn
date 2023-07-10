import { useState } from "react";

import { createAuthUSerWithEmailAndPassword, createUserDocimentFromAuth } from "../../utils/firebsae/firebase.utils";
import FormInput from "../../components/form-input/form-input.component";
import './sign-up-form.styles.scss';
import Button from "../../components/button/button.component";
import { BUTTON_TYPE_CLASSES } from "../../components/button/button.component";


const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields)
    const { displayName, email, password, confirmPassword } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handlesubmit = async (event) => {
        event.preventDefault();
        
        if(password !== confirmPassword) {
            alert('password do not match');
            return;
        }

        try {
            const { user } = await createAuthUSerWithEmailAndPassword(email, password);
            await createUserDocimentFromAuth(user, {displayName});
            resetFormFields();
        } catch(err) {
            if(err.code === 'auth/email-already-in-use') {
                alert('cannot create user, email alrady in use');
            }else {
                console.log('user creation encounterd an error');
            }
        }
    }

    const handleChange = (event) => {
        const { name, value }= event.target;
        setFormFields({...formFields, [name]: value});
    }

    return (
        <div className="sign-up-container">
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handlesubmit}>

                <FormInput type="text" required onChange={handleChange} name="displayName" value={displayName} label='displayName'></FormInput>
                <FormInput type="email" required onChange={handleChange} name="email" value={email} label='email'></FormInput>
                <FormInput type="password" onChange={handleChange} name="password" value={password}  label='password'></FormInput>
                <FormInput type="password" required onChange={handleChange} name="confirmPassword" value={confirmPassword} label='confirmPassword'></FormInput>

                <Button buttonType={BUTTON_TYPE_CLASSES.base} type="submit">Sign Up</Button>
            </form>
        </div>
    )
}

export default SignUpForm;