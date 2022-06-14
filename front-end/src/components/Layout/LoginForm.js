import AuthForm from "../Auth/AuthForm";
import Modal from "../UI/Modal";
import { useContext } from "react";
import authContex from "../../store/cart-contex";
import Profile from "../Profile/Profile";
const LoginForm = props =>{
const authCtx= useContext(authContex);
    return(
    <Modal >
    {!authCtx.isLoggedIn ?<AuthForm onDeactivate={props.onDeactivate}/> : <Profile onDeactivate={props.onDeactivate}/>}
    </Modal>)
}
export default LoginForm ;