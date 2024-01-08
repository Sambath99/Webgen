import React, { useState, useEffect } from "react";
import { Box, Flex, Text, Input, Button, VStack, Heading, Textarea, useColorModeValue, Container, FormControl, FormLabel, InputGroup, InputRightElement } from "@chakra-ui/react";
import { FaCog, FaRocket, FaPlay, FaCopy } from "react-icons/fa";

const Index = () => {
  const [input, setInput] = useState("");
  const [apiEndpoint, setApiEndpoint] = useState("");
  const [output, setOutput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleInputChange = (e) => setInput(e.target.value);
  const handleApiEndpointChange = (e) => {
    const newApiEndpoint = e.target.value;
    setApiEndpoint(newApiEndpoint);
    localStorage.setItem("apiEndpoint", newApiEndpoint);
  };

  useEffect(() => {
    const savedApiEndpoint = localStorage.getItem("apiEndpoint");
    if (savedApiEndpoint) {
      setApiEndpoint(savedApiEndpoint);
    }
  }, []);

  const generateCode = async () => {
    setIsGenerating(true);
    // Placeholder for API call
    // You would typically make an API request here with the input and apiEndpoint
    // but for this example we'll just mimic a generated code response.
    setTimeout(() => {
      setOutput(`Generated code for input: "${input}" using API: "${apiEndpoint}"`);
      setIsGenerating(false);
    }, 2000);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
  };

  const bgColor = useColorModeValue("gray.50", "gray.800");
  const colorScheme = useColorModeValue("purple", "orange");

  return (
    <Container maxW="container.xl" py={10} style={{ background: "linear-gradient(180deg, rgba(135,206,235,1) 0%, rgba(175,238,238,1) 50%, rgba(255,255,255,1) 100%)" }}>
      <VStack spacing={8}>
        <Heading as="h1" size="2xl" textAlign="center" color={colorScheme}>
          <FaRocket /> Website Generator <FaCog />
        </Heading>
        <Box p={6} bg={bgColor} borderRadius="lg" w="100%" boxShadow="xl">
          <VStack spacing={4}>
            <FormControl id="api-endpoint">
              <FormLabel>API Endpoint</FormLabel>
              <InputGroup>
                <Input placeholder="Enter the API endpoint" value={apiEndpoint} onChange={handleApiEndpointChange} />
                <InputRightElement children={<FaCog color="gray.300" />} />
              </InputGroup>
            </FormControl>
            <FormControl id="input-prompt">
              <FormLabel>Input Prompt</FormLabel>
              <Textarea placeholder="Enter your prompt" value={input} onChange={handleInputChange} />
            </FormControl>
            <Button leftIcon={<FaPlay />} colorScheme={colorScheme} onClick={generateCode} isLoading={isGenerating} loadingText="Generating">
              Generate
            </Button>
          </VStack>
        </Box>
        <Flex direction="column" p={6} bg={bgColor} borderRadius="lg" w="100%" boxShadow="xl">
          <Text mb={4} fontSize="lg" fontWeight="semibold" color={colorScheme}>
            Output Result
          </Text>
          <Textarea value={output} placeholder="Generated code will appear here" readOnly />
          <Button mt={4} leftIcon={<FaCopy />} colorScheme={colorScheme} onClick={copyToClipboard} isDisabled={!output}>
            Copy to Clipboard
          </Button>
        </Flex>
      </VStack>
    </Container>
  );
};

export default Index;
