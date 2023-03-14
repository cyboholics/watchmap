import {AppBar, Button, Toolbar, Typography} from "@mui/material";
import React from "react";
import {useRouter} from "next/router";

export const Navbar = () => {
    const router = useRouter();
    return (
        <AppBar position="static" sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingX: '1rem'
        }}>
            <Toolbar>
                <Typography>Monitor</Typography>
            </Toolbar>
            <Toolbar sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '10rem'
            }}>
                <Button variant={"contained"} color={"info"} onClick={async ()=>{
                    await router.push('/new')
                }}>
                    <Typography>New</Typography>
                </Button>
                <Button variant={"contained"} color={"info"} onClick={async ()=>{
                    await router.push('/')
                }}>
                    <Typography>Home</Typography>
                </Button>
            </Toolbar>
        </AppBar>
    )
}