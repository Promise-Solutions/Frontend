import logo from "../../assets/logo-branco-bg-sonoro.png";

const NotFound = () => {
    return (
        <main className="min-w-screen min-h-screen flex items-center justify-center">
            <div className="flex flex-col items-center justify-center w-[60%] h-full">
                <img src={logo} className="h-46 w-96"/>
                <h1  
                    className="text-[42px] text-transparent font-bold"
                    style={{ WebkitTextStroke: "1px cyan" }}>
                        Página não encontrada...
                </h1>
            </div>
        </main>
    )
}

export default NotFound;