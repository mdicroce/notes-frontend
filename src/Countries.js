import axios from "axios";
import React, { useEffect, useState } from "react";
const Countries = () => {
    const [countries, newCountries] = useState([]);
    
    const [search, newSearch] = useState("");
    useEffect(() => {
        axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
            newCountries(response.data);
        });
    }, []);
    return (
        <div>
            
            <p>Search for a country </p>
            <Search newSearch={newSearch} />
            <ShowCountries countries={countries} search={search} />
        </div>
    );
};
const Search = ({ newSearch }) => {
    const changeHandler = (status) => {
        newSearch(status.target.value);
    };
    return (
        <form>
            <input type="text" onChange={changeHandler} />
        </form>
    );
};

const ShowCountries = ({ countries, search }) => {
    const regEx = new RegExp(`${search}`, "i");
    const filteredCountries = countries.filter((country) =>
        regEx.test(country.name)
    );
    if (filteredCountries.length === 1) {
        return <ShowOneCountry country={filteredCountries[0]} />;
    } else if (filteredCountries.length <= 10) {
        return (
            <div>
                {filteredCountries.map((actual) => {
                    return (
                        <div key={actual.numericCode}>
                            <p> {actual.name} </p>
                            <ShowButton country={actual} />
                        </div>
                    );
                })}
            </div>
        );
    } else {
        return <div>Too many matches, try another filter</div>;
    }
};
const ShowOneCountry = ({ country }) => {
    const api_key = process.env.REACT_APP_API_KEY
    const capital = country.capital;
    const [climate, newClimate] = useState({})
    useEffect(() => {
        axios.get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}&m`).then((response) => {
            newClimate(response.data);
        });
    }, []);
    console.log(climate);
    return (
        <div>
            <h1> {country.name} </h1>
            <div>
                <p>
                    {" "}
          Capital <b> {country.capital} </b>{" "}
                </p>
                <p>
                    {" "}
          Population <b> {country.population} </b>{" "}
                </p>{" "}
                <div>
                    <h2> Languages </h2>
                    <ul>
                        {country.languages.map((actual) => {
                            return <li key={actual.name}>{actual.name}</li>;
                        })}
                    </ul>
                </div>
                <img src={country.flag} style={{"width" : "300px"}}/>
            </div>
            <Climate climate={climate} />
        </div>
    );
};
const Climate = ({climate}) =>{
    if(Object.entries(climate).length !== 0)
    {
        return (
            <div>
                <h2>Wheater in {climate.location.name}</h2>
                <div>
                    <p><b>Temperature: </b> {climate.current.temperature}</p>
                    <img src={climate.current.weather_icons[0]} style={{ "width": "50px" }} />
                    <p><b>Wind: </b>{climate.current.wind_speed} kmh </p>
                    <p><b>Direction</b> {climate.current.wind_dir}</p>
                </div>
            </div>
        )
    }
    else{
        return (<div></div>)
    } 

}

const ShowButton = ({ country }) => {
    const [flag, newFlag] = useState(false);
    if (!flag) {
        return (
            <div>
                <button
                    onClick={() => {
                        newFlag(!flag);
                    }}
                >
                    show
        </button>
            </div>
        );
    } else {
        return (
            <div>
                <ShowOneCountry country={country} />
                <button onClick={() => newFlag(!flag)}>
                    hide
        </button>
            </div>
        )
    }
};
export default Countries;