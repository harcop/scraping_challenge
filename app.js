const { createService } = require('./quote');

const app = createService();

app.listen(3000, () => {
    console.log('am here at 3000')
})