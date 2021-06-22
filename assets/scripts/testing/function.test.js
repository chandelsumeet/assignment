//did testing with jest
const { fetchData } = require('./function');
const fetch = require("node-fetch");
test('testing fetch request', () => {
    return fetchData().then(
        (data) => {
            expect(data).toEqual({
                "userId": 1,
                "id": 1,
                "title": "delectus aut autem",
                "completed": false
            })
        }

    )
})