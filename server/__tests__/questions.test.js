const frisby = require('frisby');

describe('GET Questions', () => {
  it('should return status 200', () => frisby.get('http://localhost:3000/qa/1').expect('status', 200));
});

// TODO: Figure out how to get Frisby to send json in request body
// describe('POST Question', () => {
//   it('should return status 201', () => frisby
//     .post('http://localhost:3000/qa/1', { body: 'body', name: 'name', email: 'email' })
//     .inspectRequest()
//     .inspectBody()
//     .expect('status', 201));
// });

describe('PUT Question Helpfulness', () => {
  it('should return status 204', () => frisby.put('http://localhost:3000/qa/question/1/helpful').expect('status', 204));
});
describe('PUT Question Reported', () => {
  it('should return status 204', () => frisby.put('http://localhost:3000/qa/question/1/report').expect('status', 204));
});
