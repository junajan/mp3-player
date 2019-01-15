import _ from 'lodash'
import sinon from 'sinon'
import { expect } from 'chai'
import { SongsModel } from '../../src/models/songs'

describe('Songs model', () => {
  const mockData = [{
    id: 123,
    name: 'makaroni'
  }]


  it('should return a song detail', async () => {
    const model = new SongsModel({ get: () => ({}) }, {})
    const stub = sinon.stub(model, 'getAll').returns(mockData)
    // TODO add cleanup of stubs

    const info = await model.getInfo(123)
    expect(info).to.deep.equal({
      id: 123,
      name: 'makaroni'
    })

    stub.restore()
  })
})