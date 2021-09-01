import React from 'react';
import store from '../../..';

class Forecast extends React.Component {

    render() {

        const response = fetch("https://community-open-weather-map.p.rapidapi.com/forecast?q=san%20francisco%2Cus", {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "e7077a6e53msh0cbddea9f638863p1b53ebjsnd818bf47e2bf",
                "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com"
            }
        })
        const data = response.json();
        //console.log(data);

        return (
            <div> <Forecast cityName={data.city.name}/> </div>
        );
    }

}


export default Forecast;