import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Heading,
  useToast,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Flex,
  Button,
} from "@chakra-ui/react";
import { shortenUrl } from "../redux/urlReducer/action";

export const Home = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const token = useSelector((store) => store.authReducer.token);
  const generated = useSelector((store) => store.urlReducer.recent);
  const [originalUrl, setOriginalUrl] = useState("");
  const [customName, setCustomName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    if (originalUrl) {
      let obj = { originalUrl, customName };
      console.log(obj);
      dispatch(shortenUrl(token, obj, toast));
    }
  };

  return (
    <Box
      w="min(40rem,100%)"
      mx="auto"
      my={20}
      border="1px solid #6666"
      borderRadius={"xl"}
      p={8}
    >
      <>
        <Heading textTransform={"uppercase"} mb="2rem" size="lg">
          Enter your url below and optionally add an alias
        </Heading>
        <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
            <FormControl>
              <FormLabel>Your URL</FormLabel>
              <Input
                type="text"
                placeholder="Enter your URL"
                value={originalUrl}
                onChange={(e) => setOriginalUrl(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Alias ( Optional )</FormLabel>
              <Input
                type="text"
                placeholder="Enter an alias for you link"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
              />
            </FormControl>
            <Button type="submit" colorScheme="blue" width="min-content">
              Generate Link
            </Button>
          </Stack>
        </form>
      </>
      <Box>
        {generated && (
          <>
            <Box pt={10}>
              <Flex
                flexDir={"column"}
                gap="2rem"
                justifyContent={"space-between"}
              >
                <Heading as="h3">Your shortened URL is here</Heading>
                <Flex alignItems={"center"} gap="1rem">
                  <Button
                    colorScheme="blue"
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `${process.env.REACT_APP_API_URL}/${generated.shortUrl}`
                      );
                      toast({
                        title: "Link Copied To Clipboard",
                        status: "success",
                        duration: 3000,
                        isClosable: true,
                      });
                    }}
                  >
                    Copy Link
                  </Button>
                  <a
                    href={`${process.env.REACT_APP_API_URL}/${generated.shortUrl}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Button colorScheme="blue" variant="outline">
                      Visit
                    </Button>
                  </a>
                </Flex>
              </Flex>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};
