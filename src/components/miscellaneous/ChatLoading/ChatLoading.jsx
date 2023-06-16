import { Skeleton, Stack } from '@chakra-ui/react'
import React from 'react'

export const ChatLoading = () =>{
  return (
    <Stack my={2}>
    <Skeleton height='45px'/>
    <Skeleton height='45px'/>
    <Skeleton height='45px'/>
    <Skeleton height='45px'/>
    <Skeleton height='45px'/>
    <Skeleton height='45px'/>
    <Skeleton height='45px'/>
    <Skeleton height='45px'/>
    <Skeleton height='45px'/>
    <Skeleton height='45px'/>
    <Skeleton height='45px'/>
    </Stack>
  )
}
