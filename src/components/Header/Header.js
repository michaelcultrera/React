import { Center } from "@chakra-ui/react";
import { Stack, HStack, VStack } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react"
import React from "react";
import { connect } from 'react-redux';

class Header extends React.Component {
    
    render() {
        let src = `http://openweathermap.org/img/wn/${this.props.icon}@2x.png`

        return (
            <Box mt={50}>
                <VStack spacing={2}>
                    <Center h="20px">
                        <h3>{this.props.cityName}</h3>
                    </Center>
                    <Center h="40px">
                        <h1>{this.props.maxTemp}°C &nbsp;</h1>
                        <Image src={src} boxSize="35px" alt="Weather Logo" />
                    </Center>
                    <Center h="20px">
                        <h3>{this.props.tempDesc}</h3>
                    </Center>
                </VStack>
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

export default connect(mapStateToProps)(Header);
