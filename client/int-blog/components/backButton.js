import { Button } from '@chakra-ui/react'
import Image from 'next/image'
import React from 'react'

export default function BackButton({handleGoBack}) {
    return (
        <Button
                onClick={handleGoBack}
                leftIcon={
                  <Image src="/backarrow.svg" width="25" height="25 " />
                }
                variant="ghost"
              >
                Voltar
              </Button>
    )
}
