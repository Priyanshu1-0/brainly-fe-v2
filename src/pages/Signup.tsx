import { useRef } from "react"
import { Input } from "../components/Input"
import { Button } from "../components/ui/Button"
import axios from "axios"
import { BACKEND_URL } from "../config"
import { useNavigate } from "react-router-dom"

export const Signup = () => {
        const usernameRef = useRef<HTMLInputElement>()
        const emailRef = useRef<HTMLInputElement>()
        const passwordRef = useRef<HTMLInputElement>()
        const navigate = useNavigate();
    async function signup(){
        const username = usernameRef.current?.value;
        const email = emailRef.current?.value;
        const password= passwordRef.current?.value;

        await axios.post(BACKEND_URL + "/api/v1/signup", {
                username,
                email,
                password
        })
        navigate("/signin")
    }

    return <div className="h-screen w-screen bg-gray-200
    flex justify-center items-center
    ">
        <div className="bg-white rounded border min-w-48 p-8 rounded-xl" >

            <Input reference = {usernameRef} placeholder="Username"></Input>
            <Input reference = {emailRef} placeholder="Email"></Input>
            <Input reference = {passwordRef} placeholder="Password"></Input>

            <div className="flex justify-center pt-4">
                <Button onClick={signup} loading={false} fullWidth={true} variant="primary" text="Signup"></Button>
            </div>

        </div>

    </div>
}