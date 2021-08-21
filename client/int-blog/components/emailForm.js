import {
  Button,
  Flex,
  FormControl,
  HStack,
  Input,
  PinInput,
  PinInputField,
} from "@chakra-ui/react";
import React from "react";

export default function MainForm({
  action,
  id,
  value,
  fetching,
  setValue,
  email,
  pass,
  value2,
  setValue2,
  otp,
}) {
  return (
    <div>
      <>
        <form onSubmit={action}>
          <FormControl id="email">
            <Flex justifyContent="space-around" flexDirection="column">
             { email && <Input
                value={value}
                onChange={(e) => setValue(e.currentTarget.value)}
                variant="filled"
                placeholder="Email"
              />}
              {otp && (
                <HStack>
                  <PinInput
                    manageFocus
                    onChange={(e) => setValue(e)}
                    variant="filled"
                    value={value}
                    otp
                    size="lg"
                  >
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                  </PinInput>
                </HStack>
              )}

              {pass && (
                <>
                  <Input
                    value={value}
                    onChange={(e) => setValue(e.currentTarget.value)}
                    variant="filled"
                    placeholder="nova password"
                  />
                  <Input
                    value={value2}
                    onChange={(e) => setValue2(e.currentTarget.value)}
                    variant="filled"
                    placeholder="confirmar password"
                  />
                </>
              )}
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
