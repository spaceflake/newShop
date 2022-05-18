import React, { useState, useEffect } from 'react'

const getLocalValue = (key: string, initValue: any) => {
  //SSR Next.js
  if (typeof window === 'undefined') return initValue

  // if a value is already stored
  const localValue = localStorage.getItem(key)
  if (localValue){
    return JSON.parse(localValue)
  }
  // return result of a function
  if (initValue instanceof Function) return initValue()

  return initValue
}

function useLocalStorage<T>(key: string, initValue: any): [T,React.Dispatch<any>] {
  const [value, setValue] = useState(() => {
    return getLocalValue(key, initValue)
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}

export default useLocalStorage
