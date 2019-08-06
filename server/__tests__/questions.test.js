const frisby = require('frisby');

describe('GET Questions', () => {
  it('should return status 200', () => frisby.get('http://localhost:3000/qa/1').expect('status', 200));
});

describe('POST Question', () => {
  it('should return status 201', () => frisby
    .fetch('http://localhost:3000/qa/1', {
      method: 'post',
      body: JSON.stringify({ body: 'Frisby Test', name: 'Frisby', email: 'email@frisby.com' }),
    })
    .expect('status', 201));
});

describe('PUT Question Helpfulness', () => {
  it('should return status 204', () => frisby.put('http://localhost:3000/qa/question/1/helpful').expect('status', 204));
});
describe('PUT Question Reported', () => {
  it('should return status 204', () => frisby.put('http://localhost:3000/qa/question/1/report').expect('status', 204));
});
