import axios from 'axios'
import faker from 'faker'

type MockHttpReponse = {
  status: number
  data: string
}

export const mockHttpResponse = (): MockHttpReponse => ({
  status: faker.datatype.number(),
  data: faker.random.objectElement()
})

export const mockAxios = (): jest.Mocked<typeof axios> => {
  const mockedAxios = axios as jest.Mocked<typeof axios>
  mockedAxios.post.mockResolvedValue(mockHttpResponse)
  return mockedAxios
}
