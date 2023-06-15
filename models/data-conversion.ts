/** CONVERT DATA FROM DATABASE INTO ARRAY */

export function stringToNumArr(str: string): number[] {
  const result = [] as number[]
  const arr = str.split(',')

  arr.map(entry => {
    result.push(+entry)
  })

  return result
}

export function stringToBoolArr(str: string): boolean[] {
  const result = [] as boolean[]
  const arr = str.split(',')

  arr.map(entry => {
    if (entry === 'true') {
      result.push(true)
    } else if (entry === 'false') {
      result.push(false)
    }
  })

  return result
}

/** CONVERT DATA FOR ENTRY INTO DATABASE */

export function arrToString(arr: number[] | boolean[]): string {
  return arr.toString()
}