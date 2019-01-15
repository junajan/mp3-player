import _ from 'lodash';
import sinon from 'sinon';
import chai from 'chai';
import chaiHttp from 'chai-http';
import { logger } from '../../utils';
import { name, version }  from '../../../package';
import ApiFactory  from '../../../src/api';

const { expect } = chai

chai.use(chaiHttp);

describe('Songs routes', () => {
  const mockData = [
    {
      "id": 1,
      "name": "Pizza",
      "path": "with salami",
      "meta": {
        "length": 1234
      }
    },
    {
      "id": 2,
      "name": "Spagetti",
      "path": "carbonara",
      "meta": {
        "length": 987
      }
    }
  ]

  let server = ApiFactory({}, logger)
  let redisStub = null
  before(() => {
    const redis = server.get('services').redis
    redisStub = sinon.stub(redis, 'get')
      .returns(_.cloneDeep(mockData))
  })

  after(() => {
    redisStub.restore()
  })

  it('it should GET /songs', async () => {
    const res = await chai.request(server)
      .get('/songs/')

    expect(res.body).to.deep.equal(mockData)
  });

  it('it should GET /songs/1/info', async () => {
    const res = await chai.request(server)
      .get('/songs/1/info')

    expect(res.body).to.deep.equal(mockData[0])
  });
});