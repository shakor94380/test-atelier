const playerModel = jest.mock('../../models/player', () => {
    return {
        getAll: jest.fn(() => players)
    }
});
const players = [
    {
        "id": 1,
        "country": {
            "code": "AAA"
        },
        "data": {
            "rank": 2,
            "weight": 1,
            "height": 3,
            "last": [
                1,
                0,
                1,
                1,
                1
            ]
        }
    },
    {
        "id": 2,
        "country": {
            "code": "BBB"
        },
        "data": {
            "rank": 1,
            "weight": 2,
            "height": 4,
            "last": [
                1,
                0,
                0,
                0,
                1
            ]
        }
    }
];
const statsService = require('../../services/stats.service');

describe('Test stats Service', () => {
    let spy; 
    beforeEach(() => {
        playerModel.getAll = jest.fn(() => players);
        spy = jest.spyOn(playerModel, 'getAll');
    });

    afterEach(() => {
        jest.clearAllMocks();
    })

    describe('getRatio', () => {
        test('should return AAA', () => {
            playerModel.getAll = jest.fn(() => players);
            spy.mockReturnValue(() => players);

            const response = statsService.getRatio();

            expect(response).toEqual("AAA");
        });
    });

    describe('getAverageIMC', () => {
        test('should return the right IMC', () => {
            spy.mockReturnValue(() => players);
            playerModel.getAll = jest.fn(() => players);

            const response = statsService.getAverageIMC();

            expect(response).toEqual(1.1805555555555556);
        });
    });

    describe('getMedianeHeight', () => {
        test('should return the right mediane of 3', () => {
            spy.mockReturnValue(() => players);
            playerModel.getAll = jest.fn(() => players);

            const response = statsService.getMedianeHeight();

            expect(response).toEqual(3);
        });
    });

})