import {useNavigate} from 'react-router-dom';
export default function SignUpHelper() {
    const navigate = useNavigate();
    const handleSubmit =()=>{
        navigate('/SignUp')
    }
    return(
        onclick={handleSubmit}
    )
}