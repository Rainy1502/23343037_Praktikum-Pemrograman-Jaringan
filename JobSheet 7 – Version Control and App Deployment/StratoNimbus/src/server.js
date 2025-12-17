import app from './app.js';

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server berjalan pada port ${PORT}.`);
  console.log(`MEDIASTACK_KEY present: ${process.env.MEDIASTACK_KEY ? 'yes' : 'no'}`);
});
