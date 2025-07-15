import { useRef } from "react"
import { Input } from "../components/Input"
import { Button } from "../components/ui/Button"
import { BACKEND_URL } from "../config"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export const Signin = () => {
        const emailRef = useRef<HTMLInputElement>()
        const passwordRef = useRef<HTMLInputElement>()
        const navigate = useNavigate();
    async function signin(){
        const email = emailRef.current?.value;
        const password= passwordRef.current?.value;

       const response =  await axios.post(BACKEND_URL + "/api/v1/signin", {
                email,
                password
        })
       const jwt = response.data.token
       localStorage.setItem("token",jwt);
       navigate("/dashboard")
    }
    return <div className="h-screen w-screen bg-gray-200
    flex justify-center items-center
    ">
        <div className="bg-white rounded border min-w-48 p-8 rounded-xl" >

            <Input reference={emailRef} placeholder="Email"></Input>
            <Input reference={passwordRef} placeholder="Password"></Input>

            <div className="flex justify-center pt-4">
                <Button onClick={signin} loading={false} fullWidth={true} variant="primary" text="Signin"></Button>
            </div>

        </div>

    </div>
}