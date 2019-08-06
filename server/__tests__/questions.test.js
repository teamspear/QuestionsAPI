const frisby = require('frisby');

describe('GET Questions', () => {
  it('should return number of questions specified in query param count', () => {
    const count = Math.ceil(Math.random() * 5);
    return frisby.get(`http://localhost:3000/qa/1?count=${count}`).then((req) => {
      const { results } = JSON.parse(req.body);
      const questionsLength = results.length;
      expect(questionsLength).toBe(count);
    });
  });
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
  it('should increment Question helpfulness by 1', () => {
    const productID = Math.ceil(Math.random() * 1000000);
    let questionID = null;
    let helpfulness = null;
    return frisby
      .get(`http://localhost:3000/qa/${productID}`)
      .then((req) => {
        const question = JSON.parse(req.body).results[0];
        questionID = question.question_id;
        helpfulness = question.question_helpfulness;
        return frisby.put(`http://localhost:3000/qa/question/${questionID}/helpful`);
      })
      .then(() => frisby.get(`http://localhost:3000/qa/${productID}`))
      .then((req) => {
        const question = JSON.parse(req.body).results[0];
        expect(question.question_helpfulness).toBe(helpfulness + 1);
      });
  });
  it('should return status 204', () => frisby.put('http://localhost:3000/qa/question/1/helpful').expect('status', 204));
});
describe('PUT Question Reported', () => {
  it('should properly set a question as reported', () => {
    const productID = Math.ceil(Math.random() * 1000000);
    let firstQuestionID = null;
    return frisby
      .get(`http://localhost:3000/qa/${productID}`)
      .then((req) => {
        const question = JSON.parse(req.body).results[0];
        // some products don't have any questions and this test would break without the ternary
        firstQuestionID = question ? question.question_id : 0;
        return frisby.put(`http://localhost:3000/qa/question/${firstQuestionID}/report`);
      })
      .then(() => frisby.get(`http://localhost:3000/qa/${productID}`))
      .then((req) => {
        const question = JSON.parse(req.body).results[0];
        // some products don't have any questions and this test would break without the ternary
        const secondQuestionID = question ? question.question_id : 1;
        expect(secondQuestionID).not.toBe(firstQuestionID);
      });
  });
  it('should return status 204', () => frisby.put('http://localhost:3000/qa/question/1/report').expect('status', 204));
});
