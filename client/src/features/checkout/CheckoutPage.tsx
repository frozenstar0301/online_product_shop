import { Typography } from "@material-ui/core";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function CheckoutPage() {
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('loginstatus') !== 'true') {
            navigate('/login');
        }
    }, [navigate])

    return (
        <Typography variant='h3'>
            PAYMENT PAGE
        </Typography>
    )
}