import {useNavigate} from 'react-router-dom';
export default function SignInHelper() {
    const navigate = useNavigate();
    const handleSubmit =()=>{
        navigate('/SignIn')
    }
    return(
        {handleSubmit}
    )
}