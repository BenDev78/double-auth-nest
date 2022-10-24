import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';

describe('Auth Controller', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('user not found because username not match', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ username: 'not-found@test.com', password: 'test' })
      .expect(404);
  });

  it('bad request because password is invalid', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ username: 'test@test.com', password: 'bad-password' })
      .expect(400);
  });

  let jwtToken: string;

  it('return access token', async () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ username: 'test@test.com', password: 'Azerty2022' })
      .expect(201)
      .then((res) => {
        jwtToken = res.body.accessToken;

        expect(jwtToken).toMatch(
          /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/,
        );
      });
  });

  it("return current user information's", async () => {
    return request(app.getHttpServer())
      .get('/auth/me')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200)
      .then((res) => {
        const data = res.body;
        expect(Object.keys(data).length).toBe(4);
      });
  });
});
