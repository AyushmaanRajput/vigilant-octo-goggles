import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Heading, useToast } from "@chakra-ui/react";
import { getAll } from "../redux/urlReducer/action";
import {
  Table,
  Thead,
  Tbody,
  Button,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import { CheckCircleIcon, WarningIcon } from "@chakra-ui/icons";

export const Dashboard = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const userUrls = useSelector((store) => store.urlReducer.all);
  console.log(userUrls);
  const token = useSelector((store) => store.authReducer.token);

  useEffect(() => {
    dispatch(getAll(token, toast));
  }, [token, dispatch, toast]);

  return (
    <Box p={4}>
      {userUrls.length > 0 ? (
        <TableContainer border='1px solid #6663' borderRadius={'xl'}>
          <Table variant="striped">
            <Thead>
              <Tr>
                <Th>Original</Th>
                <Th textAlign={"center"}>Shortened Link</Th>
                <Th textAlign={"center"}>Expiry</Th>
                <Th textAlign={"center"}>Active</Th>
              </Tr>
            </Thead>
            <Tbody>
              {userUrls.map((url, i) => {
                return (
                  <Tr>
                    <Td>{url.originalUrl.slice(0, 50)}</Td>
                    <Td textAlign={"center"}>
                      <a
                        href={`${process.env.REACT_APP_API_URL}/${url.shortUrl}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Button colorScheme="blue" variant="outline">
                          Visit
                        </Button>
                      </a>
                    </Td>
                    <Td textAlign={"center"}>
                      {new Date(url.expiresAt).toUTCString()}
                    </Td>
                    <Td textAlign={"center"}>
                      {new Date() > url.expiresAt ? (
                        <WarningIcon color="red.500" w="1.5rem" h="1.5rem" />
                      ) : (
                        <CheckCircleIcon
                          color="green.500"
                          w="1.5rem"
                          h="1.5rem"
                        />
                      )}
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      ) : (
        <Heading as="h1">No Urls Found</Heading>
      )}
    </Box>
  );
};
