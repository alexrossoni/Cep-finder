import { Fragment, useState } from "react";
import { FaSearchLocation } from "react-icons/fa";
import Api from "../../services/Api";

function SearchBox() {
    const [input, setInput] = useState('');
    const [cep, setCep] = useState({})

    async function clickSearch() {
        if (input === '' || input.length < 8 || input.length > 8) {
            alert('Preencha um CEP válido!');
            return;
        }

        try {
            const r = await Api.get(`${input}/json`);
            function verification() {
                if (Object.keys(r.data).length === 1) {
                    alert("Verifique o campo preenchido e tente novamente!");
              }
            }
            verification(r);
            setCep(r.data);
            setInput('');
        } catch {
            alert('Ops! Ocorreu um erro com sua busca.');
            setInput('');
        }
    }

    return (
    <Fragment>
        <div className="search-box">
            <h1 className="app-title">CEP Finder</h1>
            <div className="input-and-btn">
                <input type="text" id="input-cep" name="input-cep" placeholder="Digite um CEP" value={input} onChange={(event) => setInput(event.target.value)}></input>
                <button id="search-btn" onClick={clickSearch}>
                    <FaSearchLocation id="icon-btn"/>
                </button>
            </div>
        </div>
        <div className="result-box">
            {Object.keys(cep).length > 1 && (
                <div className="cep-info">
                    <h1>CEP: {cep.cep}</h1>
                    {Object.keys(cep.logradouro).length > 1 &&(
                        <p>Rua: {cep.logradouro}</p>
                    )}
                    {Object.keys(cep.complemento).length > 1 &&(
                        <p>Complemento: {cep.complemento}</p>
                    )}
                    {Object.keys(cep.bairro).length > 1 &&(
                        <p>Bairro: {cep.bairro}</p>
                    )}
                    <p>{cep.localidade} - {cep.uf}</p>
                </div>
            )}
        </div>
    </Fragment>
    )
}

export default SearchBox;