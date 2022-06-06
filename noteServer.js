const express = require('express');
const BEroutes = require('./BEroutes');
const FEroutes = require('./FEroutes');
const app = express();
const BEroutes = require('./Dataroutes/BEroutes');
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', BEroutes);
app.use('/api', FEroutes);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
module.exports = app;
