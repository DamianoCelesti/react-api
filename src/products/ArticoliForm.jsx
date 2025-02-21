import { useState, useEffect } from "react";
import axios from "axios";

// const articoliIniziali = [
//     {
//         id: 1,
//         titolo: "titolo JavaScript",
//         autore: "Mario",
//         contenuto: "JavaScript è un linguaggio",
//         categoria: "Programmazione"
//     },
//     {
//         id: 2,
//         titolo: "titolo CSS",
//         autore: "Luca",
//         contenuto: "CSS è un linguaggio",
//         categoria: "Design"
//     },
//     {
//         id: 3,
//         titolo: "titolo React",
//         autore: "Giulia",
//         contenuto: "React è un framework",
//         categoria: "Programmazione"
//     },
// ];


const formDatiInizio = {
    title: "",
    // autore: "",
    image: "",
    content: "",
    // categoria: "",
};


const ArticoliForm = () => {

    const [articoli, setArticoli] = useState([]);
    const [formDati, setFormDati] = useState(formDatiInizio);


    function fetchArticoli() {
        axios.get("http://localhost:3000/posts")
            .then((response) =>
                // console.log(response.data),
                setArticoli(response.data)


            )
    }


    useEffect(fetchArticoli, []);



    function gestioneFormDati(e) {
        setFormDati((datiFormCorrenti) => ({
            ...datiFormCorrenti,
            [e.target.name]: e.target.value,
        }));
    }

    function gestioneInvio(event) {
        event.preventDefault();
        setArticoli((articoliCorrenti) => [...articoliCorrenti, { id: articoliCorrenti[articoliCorrenti.length - 1].id + 1, ...formDati }]);
    }


    return (
        <>

            {/* <button onClick={fetchArticoli}>Carica articoli</button> */}

            <form action="#" onSubmit={gestioneInvio}>
                <input
                    type="text"
                    name="title"
                    onChange={gestioneFormDati}
                    value={formDati.title}
                    placeholder="inserire titolo"
                />
                <input
                    type="text"
                    name="image"
                    onChange={gestioneFormDati}
                    value={formDati.image}
                    placeholder="inserire img"
                />

                <textarea
                    type="text"
                    name="content"
                    onChange={gestioneFormDati}
                    value={formDati.content}
                    placeholder="testo"
                />
                <input
                    type="text"
                    name="categoria"
                    onChange={gestioneFormDati}
                    value={formDati.categoria}
                    placeholder="genere"
                />
                <button type="submit">Add</button>
            </form>
            {articoli.map((articolo) => (
                <div key={articolo.id}>
                    <h3>{articolo.title}</h3>
                    <img src={articolo.image} alt={articolo.title}></img>
                    {/* <p>{articolo.autore}</p> */}
                    <p>{articolo.content}</p>
                    {/* <p>{articolo.categoria}</p> */}
                </div>
            ))}
        </>
    )
}



export default ArticoliForm