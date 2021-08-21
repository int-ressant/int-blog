import { Button, Flex, FormControl, Input } from "@chakra-ui/react";
import React from "react";

export default function EmailForm({ action, id, value, fetching, setValue }) {
  return (
    <div>
      <>
        <form onSubmit={action}>
          <FormControl id="email">
            <Flex justifyContent="space-around" flexDirection="column">
              <Input
                value={value}
                onChange={(e) => setValue(e.currentTarget.value)}
                variant="filled"
                placeholder="Email"
              />
            </Flex>
            <Flex mt="5" alignItems="center" justifyContent="center">
              <Button
                isLoading={fetching}
                type="submit"
                bgColor="green.light"
                color="white"
              >
                Confirmar
              </Button>
            </Flex>
          </FormControl>
        </form>
      </>
    </div>
  );
}
