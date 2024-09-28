require('dotenv').config();
const Ajv = require('ajv');
const DataBase = require('../src/dataBase/DataBase');

const FastifyWrapper = require('../src/fastify');
const schema = require('../src/schemas/deleteModels');

const ajv = new Ajv();
const validateUserDoesntExist = ajv.compile(schema.response[401]);
const { errorCodes } = require('../src/errors/UserManagerErrors');
const randomEmail = require('random-email');


describe('DELETE models tests', () => {
  let app;

  test('DELETE /models route remove model created by user', async () => {
    app = new FastifyWrapper();
    const email = randomEmail({ domain: 'example.com' });
    const name = 'philip';
    const surname = 'fry';
    await DataBase.addUser(email, name, surname);

    // Adding model
    const modelName = 'MobileNet-Stego';
    const modelURL = 'https://www.kaggle.com/models/user/mobilenet-stego/TfJs/default/1';
    const modelImageSize = 512
    const modelThreshold = 0.8
    const body = {
      email,
      modelName,
      modelURL,
      modelImageSize,
      modelThreshold
    }

    const response = await app.inject('POST', '/models', body);
    expect(response.statusCode).toBe(201);
    const responseBody = JSON.parse(response.payload);
    expect(responseBody.models.length).toBe(1)

    // Remove model
    const model = responseBody.models[0];
    const responseDelete = await app.inject('DELETE', `/models?email=${email}&modelID=${model._id}`);
    expect(responseDelete.statusCode).toBe(200);
    const responseBodyDelete = JSON.parse(responseDelete.payload);
    expect(responseBodyDelete.models.length).toBe(0)

    await DataBase.deleteUser(email);
  });

  test('DELETE /models route returns error if model does not exist', async () => {
    app = new FastifyWrapper();
    const email = randomEmail({ domain: 'example.com' });
    const name = 'philip';
    const surname = 'fry';
    await DataBase.addUser(email, name, surname);

    const modelID = 1234;

    const response = await app.inject(
      'DELETE', 
      `/models?email=${email}&modelID=${modelID}`
    );

    expect(response.statusCode).toBe(404);
    const responseBody = JSON.parse(response.payload);
    expect(validateUserDoesntExist(responseBody)).toBeTruthy();
    expect(responseBody.code).toBe(errorCodes.MODEL_NOT_FOUND_FOR_USER);
  });

  afterAll(async () => {
    app.close();
    DataBase.close();
  });
});
