import axios from 'axios'

export type Item = {
  id: number
  text: string
}

export const getItems = async (): Promise<Item[]> => {
  const res = await axios.get('http://localhost:8000/items')

  return res.data
}
