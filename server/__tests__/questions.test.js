const frisby = require('frisby');

describe('GET Questions', () => {
  it('should return 2 questions if given query param count of 2', () => frisby.get('http://localhost:3000/qa/1?count=2').then((data) => {
    const { results } = JSON.parse(data.body);
    const questionsLength = results.length;
    expect(questionsLength).toBe(2);
  }));
  it('should return questions for product id in url', () => {
    const num = Math.floor(Math.random() * 1000);
    return frisby.get(`http://localhost:3000/qa/${num}`).expect('json', 'product_id', num);
  });
  it('should return status 200', () => frisby.get('http://localhost:3000/qa/1').expect('status', 200));
  it('should be returned in application/json MIMETYPE', () => frisby
    .get('http://localhost:3000/qa/1')
    .expect('header', 'Content-Type', 'application/json; charset=utf-8'));
  it('should have CORS in header', () => frisby.get('http://localhost:3000/qa/1').expect('header', 'Access-Control-Allow-Origin', '*'));
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
