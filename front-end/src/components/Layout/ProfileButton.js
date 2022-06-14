import classes from './ProfileButton.module.css'
import ProfileIcon from './ProfileIcon'
const ProfileButton =props =>{
    return(
        <button  onClick={props.onClick} className={classes.button}>
            <span  >
               <ProfileIcon fill='' className={classes.icon} />
            </span>
        </button>)
}
export default ProfileButton ;