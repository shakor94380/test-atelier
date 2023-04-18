const playerModel = require('../../models/player');
const playerService = require('../../services/players.services');

describe('Test player Service', () => {
    beforeEach(() => {
        jest.clearAllMocks();
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

    describe('getSortPlayer', () => {

        test('should a list of players', () => {
            playerModel.getAll = jest.fn(() => players);

            const response = playerService.getSortPlayers();

            expect(response).toEqual(players);
            expect(response.length).toEqual(players.length);
            expect(playerModel.getAll).toHaveBeenCalledWith()
        });
    });

    describe('getSortPlayer', () => {
        test('should return a player', () => {
            const id = 1;
            const player = players.find((player => player.id === id));
            playerModel.get = jest.fn(() => player);

            const response = playerService.getInfosPlayer(id);

            expect(response).toEqual(player);
            expect(playerModel.get).toHaveBeenCalledWith(id);
        });

        test('should return nothing', () => {
            const id = 100;
            const player = players.find((player => player.id === id));
            playerModel.get = jest.fn(() => player);

            const response = playerService.getInfosPlayer(id);

            expect(response).toEqual();
            expect(playerModel.get).toHaveBeenCalledWith(id);
        });
    });

})