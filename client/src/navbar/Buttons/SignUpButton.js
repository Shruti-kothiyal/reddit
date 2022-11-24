import React from "react";
import Button from '@mui/material/Button';
import {useNavigate} from 'react-router-dom';

export default function SignUpButton() {
    const navigate = useNavigate();
    const handleSubmit =()=>{
        navigate('/SignUp')
    }
    return (
        <div >
        <Button
                type="button"
                fullWidth
                variant="contained"
                onClick={handleSubmit}
            >
                Sign Up
            </Button>
        </div>
    );
}
