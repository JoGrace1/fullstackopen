# fullstackopen
https://github.com/fullstack-hy2020/fullstack-hy2020.github.io/


Vite build
npm create vite@latest

cd part1
npm install

npm run dev

Only Link: https://fullstackopen-2-x8lx.onrender.com/

node --watch index.js

ESlint
npx eslint index.js
npm run lint

Tests:
npm test -- --test-only
test.only('all notes are returned', async () => {
  const response = await api.get('/api/notes')

  assert.strictEqual(response.body.length, 2)
})
npm test -- tests/note_api.test.js

The --test-name-pattern option can be used for running tests with a specific name:

npm test -- --test-name-pattern="a specific note is within the returned notes"copy
The provided argument can refer to the name of the test or the describe block. It can also contain just a part of the name. The following command will run all of the tests that contain notes in their name:
npm run test -- --test-name-pattern="notes"
