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
    <Box>
      {userUrls.length > 0 ? (
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Original</Th>
                <Th>Shortened Link</Th>
                <Th>Expiry</Th>
              </Tr>
            </Thead>
            <Tbody>
              {userUrls.map((url, i) => {
                return (
                  <Tr>
                    <Td>{url.originalUrl.slice(0, 50)}</Td>
                    <Td>
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
                    <Td>{new Date(url.expiresAt).toUTCString()}</Td>
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
