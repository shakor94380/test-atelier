const { mockRequest, mockResponse } = require('../interceptor');
const statController = require('../../api/controllers/stat.controller');
const statService = require('../../services/stats.service');

describe('Test stat Controller', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    })

    const res = mockResponse();

    describe('getStats', () => {
        let req = mockRequest();

        test('should return a ratio, imc and a weight', () => {
            statService.getRatio = jest.fn(() => 'code');
            statService.getAverageIMC = jest.fn(() => 'imc');
            statService.getMedianeHeight = jest.fn(() => 'height');

            statController.getStats(req, res);

            expect(statService.getRatio).toHaveBeenCalledWith();
            expect(statService.getAverageIMC).toHaveBeenCalledWith();
            expect(statService.getMedianeHeight).toHaveBeenCalledWith();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                ratio: 'code',
                imc: 'imc',
                height: 'height'
            });
        })
    })
})