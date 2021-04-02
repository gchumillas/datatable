import http from '../lib/http'

export type Item = {
  id: number
  text: string
}

export const getItems = async (): Promise<Item[]> => {
  const res = await http.get('/items')

  return res.data
}
