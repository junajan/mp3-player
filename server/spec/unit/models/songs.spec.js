import sinon from 'sinon'
import { expect } from 'chai'
import { SongsModel } from '../../../src/models/songs'

describe('Songs model', () => {
  const mockApp = { get: () => ({}) }
  const mockData = [{
    id: 123,
    name: 'makaroni',
    path: 'path/to/file'
  }]

  let model = null
  beforeEach(() => {
    model = new SongsModel(mockApp, {})
  })

  it('should fetch list of all songs using redis and save to cache', async () => {
    model.redisClient = {
      get: sinon.stub().returns(mockData)
    }

    expect(model.songsListCache).to.deep.equal(null)

    // should get from redis service
    const list = await model.getAll()
    expect(list).to.deep.equal(mockData)

    // should store in cache
    expect(model.songsListCache).to.deep.equal(list)

    const list2 = await model.getAll()
    expect(list2).to.deep.equal(mockData)

    // should use redisClient only once
    expect(model.redisClient.get.callCount).to.equal(1)
  })

  it('should return a file details', async () => {
    sinon.stub(model, 'getAll').returns(mockData)
    sinon.stub(model, '_getSongFilePath').returns('file/path')

    const info = await model.getSongFileInfo(123)
    expect(info).to.deep.equal({
      file: 'file/path',
      name: 'makaroni.mp3'
    })

    // no stub cleanup needed - we create new model for every test
  })

  it('should return a song detail', async () => {
    sinon.stub(model, 'getAll').returns(mockData)

    const info = await model.getInfo(123)
    expect(info).to.deep.equal({
      id: 123,
      name: 'makaroni',
      path: 'path/to/file'
    })
  })
})