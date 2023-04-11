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

    describe('getRatio', () => {
        test('should return AAA', () => {
            playerModel.getAll = jest.fn(() => players);

            const response = playerService.getRatio();

            expect(response).toEqual("AAA");
            expect(playerModel.getAll).toHaveBeenCalledWith();
        });
    });

    describe('getAverageIMC', () => {
        test('should return the right IMC', () => {
            playerModel.getAll = jest.fn(() => players);

            const response = playerService.getAverageIMC();

            expect(response).toEqual(1.1805555555555556);
            expect(playerModel.getAll).toHaveBeenCalledWith();
        });
    });

    describe('getMedianeHeight', () => {
        test('should return the right mediane of 3', () => {
            playerModel.getAll = jest.fn(() => players);

            const response = playerService.getMedianeHeight();

            expect(response).toEqual(3);
            expect(playerModel.getAll).toHaveBeenCalledWith();
        });
    });

    describe('checkPlayers', () => {
        test('should return a code 400', () => {
            playerModel.getAll = jest.fn(() => {});

            const response = playerService.checkPlayers();

            expect(response.code).toEqual(400);
            expect(playerModel.getAll).toHaveBeenCalledWith();
        });

        test('should return a code 422 for invalid rank', () => {
            const invalidPlayers = [{
                data: {
                    rank: 0
                }
            }];

            playerModel.getAll = jest.fn(() => invalidPlayers);

            const response = playerService.checkPlayers(['rank']);

            expect(response.code).toEqual(422);
            expect(response.error).toEqual('rank should be a number > 0');
            expect(playerModel.getAll).toHaveBeenCalledWith();
        });

        test('should return a code 422 for invalid weight', () => {
            const invalidPlayers = [{
                data: {
                    weight: 'weight'
                }
            }];

            playerModel.getAll = jest.fn(() => invalidPlayers);

            const response = playerService.checkPlayers(['weight']);

            expect(response.code).toEqual(422);
            expect(response.error).toEqual('weight should be a number > 0');
            expect(playerModel.getAll).toHaveBeenCalledWith();
        });

        test('should return a code 422 for invalid height', () => {
            const invalidPlayers = [{
                data: {
                    height: 'height'
                }
            }];

            playerModel.getAll = jest.fn(() => invalidPlayers);

            const response = playerService.checkPlayers(['height']);

            expect(response.code).toEqual(422);
            expect(response.error).toEqual('height should be a number > 0');
            expect(playerModel.getAll).toHaveBeenCalledWith();
        });

        test('should return a code 422 for invalid code', () => {
            const invalidPlayers = [{
                country: {
                    code: 'invalid_code'
                }
            }];

            playerModel.getAll = jest.fn(() => invalidPlayers);

            const response = playerService.checkPlayers(['code']);

            expect(response.code).toEqual(422);
            expect(response.error).toEqual('code should be a string with length = 3');
            expect(playerModel.getAll).toHaveBeenCalledWith();
        });

        test('should return a code 422 for invalid last format', () => {
            const invalidPlayers = [{
                data: {
                    last: 'last'
                }
            }];

            playerModel.getAll = jest.fn(() => invalidPlayers);

            const response = playerService.checkPlayers(['last']);

            expect(response.code).toEqual(422);
            expect(response.error).toEqual('last should be a Array<Number>');
            expect(playerModel.getAll).toHaveBeenCalledWith();
        });

        test('should return a code 422 for invalid last values', () => {
            const invalidPlayers = [{
                data: {
                    last: [0, 1, 2]
                }
            }];

            playerModel.getAll = jest.fn(() => invalidPlayers);

            const response = playerService.checkPlayers(['last']);

            expect(response.code).toEqual(422);
            expect(response.error).toEqual('last should contain only 0 or 1');
            expect(playerModel.getAll).toHaveBeenCalledWith();
        });

        test('should return a empty error', () => {
            playerModel.getAll = jest.fn(() => players);

            const response = playerService.checkPlayers(['last']);

            expect(response).toEqual()
            expect(playerModel.getAll).toHaveBeenCalledWith();
        });
    });
})