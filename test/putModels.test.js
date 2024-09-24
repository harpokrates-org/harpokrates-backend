require('dotenv').config();
const Ajv = require('ajv');
const DataBase = require('../src/dataBase/DataBase');

const FastifyWrapper = require('../src/fastify');
const schema = require('../src/schemas/putModels');

const ajv = new Ajv();
const validateSuccess = ajv.compile(schema.response[201]);
const validateUserDoesntExist = ajv.compile(schema.response[401]);
const { errorCodes } = require('../src/errors/UserManagerErrors');

describe('Put models tests', () => {
  let app;

  test('PUT /models route adds models to existing user', async () => {
    app = new FastifyWrapper();
    const email = 'otroDoe@mail.com';
    const name = 'philip';
    const surname = 'fry';
    await DataBase.addUser(email, name, surname);

    const response = await app.inject('PUT', '/models', {
      email,
      models: [
        {
          name: 'MobileNet-Stego',
          url: 'https://www.kaggle.com/models/user/mobilenet-stego/TfJs/default/1',
        },
        {
          name: 'EfficientNet-Stego',
          url: 'https://www.kaggle.com/models/user/efficientnet-stego/TfJs/default/1',
        },
      ],
    });

    expect(response.statusCode).toBe(201);
    const responseBody = JSON.parse(response.payload);
    expect(validateSuccess(responseBody)).toBeTruthy();

    await DataBase.deleteUser(email);
  });

  test('PUT /models route returns error if user doesnt exist', async () => {
    app = new FastifyWrapper();
    const email = 'nonexistinguser@mail.com';

    const response = await app.inject('PUT', '/models', {
      email,
      models: [
        {
          name: 'MobileNet-Stego',
          url: 'https://www.kaggle.com/models/user/mobilenet-stego/TfJs/default/1',
        },
        {
          name: 'EfficientNet-Stego',
          url: 'https://www.kaggle.com/models/user/efficientnet-stego/TfJs/default/1',
        },
      ],
    });

    expect(response.statusCode).toBe(401);
    const responseBody = JSON.parse(response.payload);
    expect(validateUserDoesntExist(responseBody)).toBeTruthy();
    expect(responseBody.code).toBe(errorCodes.USER_DOESNT_EXIST);
  });

  afterAll(async () => {
    app.close();
    DataBase.close();
  });
});
