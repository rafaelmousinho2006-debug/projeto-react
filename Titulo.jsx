import { useState } from "react"
function Titulo({nome, paragrafo,cor }){
    const {texto, setTexto} = useState("um titulo do estado inicial")
    return (
        <div>
            <h1 style={{color:cor}}>Oi eu sou {texto } </h1>
           { paragrafo?
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi, sed neque cupiditate culpa a perspiciatis eius commodi mollitia nulla quibusdam quod quae esse possimus nobis omnis maiores accusamus odio debitis!</p>
            :
            <p></p>
           }
        </div>
    )
}

export default Titulo