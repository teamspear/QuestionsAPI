const frisby = require('frisby');

describe('GET Answers', () => {
  it('should return status 200', () => frisby.get('http://localhost:3000/qa/1/answers').expect('status', 200));
});

describe('POST Answer', () => {
  it('should return status 201', () => frisby
    .fetch('http://localhost:3000/qa/1/answers', {
      method: 'post',
      body: JSON.stringify({
        body: 'body',
        name: 'name',
        email: 'email',
        photos: ['url1', 'url2'],
      }),
    })
    .expect('status', 201));
});

describe('PUT Answer Helpfulness', () => {
  it('should return status 204', () => frisby.put('http://localhost:3000/qa/answer/1/helpful').expect('status', 204));
});

describe('PUT Answer Reported', () => {
  it('should return status 204', () => frisby.put('http://localhost:3000/qa/answer/1/report').expect('status', 204));
});
