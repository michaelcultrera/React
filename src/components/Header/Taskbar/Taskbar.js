import React, { useState, useEffect } from "react";
import { Box, InputGroup, InputRightAddon } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useSelector, useDispatch } from 'react-redux';
import { set_city_action } from '../actions';
import store from "../../..";
import { set_max_temp_action } from "../actions/setMaxTempAction";
import { set_desc_action } from "../actions/setDescriptionAction";
import { set_icon_action } from "../actions/setIconAction";

function Taskbar(props) {

    const dispatch = useDispatch();

    const [city, setCity] = useState("");
    const [maxTemp, setTemp] = useState(null);
    const [tempDesc, setDesc] = useState(""); //description of weather
    const [icon, setIcon] = useState("");
    const [clicked, setClick] = useState(0); //used to trigger useEffect function every time user searches

    //update "city" state on every key stroke of search bar
    const handleChange = (event) => {
        setCity(event.target.value);
    }

    const handleClick = () => {
        setClick((clicked + 1));
    }

    useEffect(() => {
        dispatch(set_city_action(city)) //set name of city

        //api call to get weather
        fetch(`https://community-open-weather-map.p.rapidapi.com/forecast?q=${city}&units=standard`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "e7077a6e53msh0cbddea9f638863p1b53ebjsnd818bf47e2bf",
                "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com"
            }
        })
            .then(response => response.json())
            .then(data => {setTemp(parseInt(data.list[0].main.temp_max - 273.15))
            setDesc(data.list[0].weather[0].description)
            setIcon(data.list[0].weather[0].icon)})
            .catch(err => {
                console.error(err);
            });

            dispatch(set_desc_action(tempDesc)); //set temp description in redux store
            dispatch(set_max_temp_action(maxTemp)); //set max temp in redux store
            dispatch(set_icon_action(icon)); //set icon in redux store
    }, [clicked])

    return (
        <Box bg="rgb(67, 73, 86)" w="100%" height={40} d="flex" alignItems="baseline">
            <Text ml={20} mt={10}>Forecast</Text>
            <InputGroup>
                <Input value={city} onChange={handleChange} placeholder="City name" ml={1000}></Input>
                <InputRightAddon addonType="append">
                    <Button onClick={handleClick}>
                        <SearchIcon></SearchIcon>
                    </Button>
                </InputRightAddon>
            </InputGroup>
        </Box>
    )
}

export default Taskbar;