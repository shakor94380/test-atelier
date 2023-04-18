const { mockRequest, mockResponse } = require('../interceptor');
const playerController = require('../../api/controllers/player.controller');
const playerService = require('../../services/players.services');

describe('Test player Controller', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    })

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
        },
    ];
    const sortedPlayers = [
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
        },
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
        }
    ];
    const res = mockResponse();

    describe('getSortedPlayers', () => {
        let req = mockRequest();
        test('should return a list of players', () => {
            playerService.getSortPlayers = jest.fn(() => players);

            playerController.getSortedPlayers(req, res);

            expect(playerService.getSortPlayers).toHaveBeenCalledWith();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(sortedPlayers);
        })
    });

    describe('get', () => {
        let req = mockRequest();
        const id = 1
        req.params = { id: id };
        const player = players.find(player => player.id === req.params.id);

        test('should return a player', () => {
            playerService.getInfosPlayer = jest.fn(() => player);

            playerController.get(req, res);

            expect(playerService.getInfosPlayer).toHaveBeenCalledWith(id);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(player);
        });
    });
})