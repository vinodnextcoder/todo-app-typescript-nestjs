import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  const filePath = `./public/test.jpeg`;
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
  // generating  a random number
  const a = Math.random();
  let user=a+"yogeshs@gmail.com";
  let token=""
  it('/ (/api/v1/user)', () => {
    return request(app.getHttpServer())
      .post('/api/v1/user/signup')
      .send({
        fullname: "Yogesh patil",
        email: user,
        mobileNo: "8890197788",
        password: "123456",
        userType: "admin"
      })
      .expect(201)
  });
  it('/ (/api/v1/user/signin)',async  () => {
    const logi = await request(app.getHttpServer())
      .post('/api/v1/user/signin')
      .send({
        mobileNo: "8890197788",
        password: "123456",
      
      })
      expect(logi.body.status.code).toEqual(1000);
      token = logi.body.data.token;
  });
  it('/ (/api/v1/task)',async  () => {
    const logi = await request(app.getHttpServer())
      .post('/api/v1/task')
      .attach('file', filePath)
      .field('title', 'test')
      .field('description', 'test')
      .set({ 'authorization': "Bearer "+token })
      expect(logi.body.status.code).toEqual(1000);
  });
});
