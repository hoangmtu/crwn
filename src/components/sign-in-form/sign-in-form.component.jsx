import { useState } from "react";

import { signInWithGooglePopup, createUserDocimentFromAuth, signInAuthUSerWithEmailAndPassword } from "../../utils/firebsae/firebase.utils";
import FormInput from "../../components/form-input/form-input.component";
import './sign-in-form.styles.scss';
import Button, { BUTTON_TYPE_CLASSES } from "../../components/button/button.component";


const defaultFormFields = {
    email: '',
    password: '',
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields)
    const { email, password } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const signInWithGoogle = async () => {
        const { user } = await signInWithGooglePopup();
        
    }

    const handlesubmit = async (event) => {
        event.preventDefault();

        try {
            const { user } = await signInAuthUSerWithEmailAndPassword(email, password)
            resetFormFields();

        } catch (err) {
            switch(err.code) {
                case 'auth/wrong-password':
                    alert('incorrect password for email');
                    break;
                case 'auth/user-not-found':
                    alert('no user associated with this email')
                    break;
                default:
                    console.log(err)    
            }
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    }

    return (
        <div className="sign-up-container">
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handlesubmit}>

                <FormInput type="email" required onChange={handleChange} name="email" value={email} label='email'></FormInput>
                <FormInput type="password" onChange={handleChange} name="password" value={password} label='password'></FormInput>
                <div className="buttons-container">
                    <Button type="submit">Sign In</Button>
                    <Button buttonType={BUTTON_TYPE_CLASSES.google} type="button" onClick={signInWithGoogle}>Google Sign In</Button>
                </div>

            </form>
        </div>
    )
}

export default SignInForm;