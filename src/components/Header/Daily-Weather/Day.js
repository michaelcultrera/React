import { Center } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { Stack, HStack, VStack } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react"
import Taskbar from "../Taskbar/Taskbar";
import React, { useState } from "react";
import { connect } from 'react-redux';
import { useDispatch } from 'react-redux';

class Day extends React.Component {

    render() {
        let src = `http://openweathermap.org/img/wn/${this.props.icon}@2x.png`


        return (
            <Box bg="rgb(67, 73, 86)" w='110px' h='130px'>
                <Text color="white" ml="10" mt="10">{this.props.cityName}</Text>
                <Image ml="10" mt="-5" boxSize="30px" src={src}></Image>
                <Text fontSize="25px" color="white" ml="10" mt="5" >{this.props.maxTemp}°C</Text>
                <Text fontSize="12px" color="white" ml="10" mt="-20" >{this.props.tempDesc}</Text>
            </Box>
        );
    }

}

//pre defined function, used to connect variables in redux "store" as props in this component
function mapStateToProps(state) {
    return {
        cityName: state.city_displayed,
        maxTemp: state.max_temp,
        tempDesc: state.temp_desc,
        icon: state.icon
    }
}

export default connect(mapStateToProps)(Day);