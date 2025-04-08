import { FcGoogle } from "react-icons/fc"


const GoogleAuth = () => {



    const google = () => {
        window.open("http://localhost:4000/auth/google/callback", "_self");
        localStorage.setItem("isAuthenticated", true);
        
        
    }

    return (
        <div>

            <div className=" flex w-full items-center gap-4 text-center my-4">
                <hr className=" w-full" />
                OR
                <hr className=" w-full" />
            </div>

            <div onClick={google} className="flex my-4 border-2 justify-center cursor-pointer border-primary rounded-full px-4 py-2 items-center gap-4">
                <FcGoogle size={30} />
                Sign With Google
            </div>

        </div>
    )
}

export default GoogleAuth