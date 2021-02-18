import { expect } from 'chai';
import app from '../index';
import 'mocha';


const request = require('supertest');

describe('Test Case 1', () => {
    it('should return response on call', async () => {
        await request(app).get('/report').then((data: any) => {
            expect(data.statusCode).to.equal(200);
            expect(data.body).not.to.be.empty;
            expect(data.body.error).equal(null)
        })

    });
});


