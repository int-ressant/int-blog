import React from 'react'
import { View, Text } from 'react-native'

export default function OtpForm() {
    return (
        <form onSubmit={handleSubmitOtp}>
        <FormControl id="otp">
          <Flex justifyContent="space-around" flexDirection="column">
            <HStack>
              <PinInput
                manageFocus
                onChange={(e) => setOtp(e)}
                variant="filled"
                value={otp}
                otp
                size="lg"
              >
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
              </PinInput>
            </HStack>
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
    )
}
