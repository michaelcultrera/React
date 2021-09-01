import { Center } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { Stack, HStack, VStack } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react"
import Day from './Day';

function Daily(props) {
    return (
        <VStack>
            <Box mt={100} mr={1100}>Daily</Box>
            <HStack spacing="18px">
                <Day/>
                {/* <Day/>
                <Day/>
                <Day/>
                <Day/>
                <Day/>
                <Day/>
                <Day/>
                <Day/> */}
            </HStack>
        </VStack>
    );
}

export default Daily;