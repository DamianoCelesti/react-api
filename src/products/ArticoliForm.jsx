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
    tags: [],
    // categoria: "",
};


const ArticoliForm = () => {

    const [articoli, setArticoli] = useState([]);
    const [formDati, setFormDati] = useState(formDatiInizio);


    function fetchArticoli() {
        axios.get("http://localhost:3000/posts")
            .then((res) =>
                // console.log(res.data),
                setArticoli(res.data)


            )
    }


    useEffect(fetchArticoli, []);



    function gestioneFormDati(e) {
        const value = e.target.name === "tags" ? e.target.value.split(",") : e.target.value;
        setFormDati((datiFormCorrenti) => ({
            ...datiFormCorrenti,
            [e.target.name]: value,
        }));
    }

    function gestioneInvio(e) {
        e.preventDefault();
        axios.post("http://localhost:3000/posts/", formDati)
            .then(res => {
                // console.log(res.data);
                setArticoli((articoliCorrenti) => [...articoliCorrenti, res.data])
            }
            )
            .catch(err => console.log(err))

        // setArticoli((articoliCorrenti) => [...articoliCorrenti, { id: articoliCorrenti[articoliCorrenti.length - 1].id + 1, ...formDati }]);
        setFormDati(formDatiInizio);
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
                    name="tags"
                    onChange={gestioneFormDati}
                    value={formDati.tags}
                    placeholder="tags"
                />
                <button type="submit">Add</button>
            </form>
            {articoli.map((articolo) => (
                <div key={articolo.id}>
                    <h3>{articolo.title}</h3>
                    <img src={articolo.image} alt={articolo.title}></img>
                    <p>{articolo.tags.join(", ")}</p>
                    <p>{articolo.content}</p>
                    {/* <p>{articolo.categoria}</p> */}
                </div>
            ))}
        </>
    )
}



export default ArticoliForm