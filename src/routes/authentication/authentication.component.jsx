import { auth } from "../../utils/firebsae/firebase.utils";
import { getRedirectResult } from "firebase/auth";
import { useEffect } from "react";
import SignUpForm from "../../assets/sign-up-form/sign-up-form.component";
import SignInForm from "../../components/sign-in-form/sign-in-form.component";
import './authentication.styles.scss'

const Authentication = () => {
    useEffect(() => {
        const logreDerect = async () => {
            const response = await getRedirectResult(auth)
            console.log(response);
        }
        logreDerect();
    },[])

    return (
        <div className="authentication-container">
            <SignInForm/>
            <SignUpForm/>
        </div>
    )
}

export default Authentication;