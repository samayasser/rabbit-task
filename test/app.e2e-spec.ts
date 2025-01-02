import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

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

  // Test for pagination in fetching products
  it('/product (GET) with pagination', () => {
    return request(app.getHttpServer())
      .get('/product')
      .query({ page: 2, pageSize: 5 })  // Example pagination params
      .expect(200)
      .then((response) => {
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBe(5); // Should return 5 products
      });
  });

  // Test for fetching top 10 ordered products in a specific area
  it('/product/top-ordered (GET) with area parameter', () => {
    return request(app.getHttpServer())
      .get('/product/top-ordered')
      .query({ area: 'Zayed' })  // Example query param for area
      .expect(200)
      .then((response) => {
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeLessThanOrEqual(10);  // Ensure we get at most 10 products
        expect(response.body[0]).toHaveProperty('id');
        expect(response.body[0]).toHaveProperty('name');
        expect(response.body[0]).toHaveProperty('totalOrders');
      });
  });

  // Test for handling invalid area in top 10 ordered products endpoint with missing area
  it('/product/top10 (GET) with missing area', () => {
    return request(app.getHttpServer())
      .get('/product/top10')
      .expect(500)  
      .then((response) => {
        expect(response.body.message).toBe('Internal server error');
      });
  });
});
