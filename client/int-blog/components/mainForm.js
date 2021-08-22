import {
  Button,
  Center,
  Flex,
  FormControl,
  FormHelperText,
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
                <>
                                <Center><FormHelperText p='5' bgColor='green.50' >Verifique o seu email, pelo codigo otp</FormHelperText></Center>

                <Flex mt='5' justifyContent='center'>
                <HStack>
                  <PinInput
                    manageFocus
                    onChange={(e) => setValue(e)}
                    variant="filled"
                    value={value}
                    otp
                    size="lg"
                    autoFocus
                  >
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                  </PinInput>
                  
                </HStack>
                
                </Flex>

                </>
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
                  mt='5'
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
