import React from "react";
import Button from '@mui/material/Button';
import {useNavigate} from 'react-router-dom';

export default function SignInButton() {
    const navigate = useNavigate();
    const handleSubmit =()=>{
        navigate('/SignIn')
    }
    return (
        <div >
        <Button
                type="button"
                fullWidth
                variant="contained"
                onClick={handleSubmit}
            >
                Sign In
            </Button>
        </div>
    );
}
