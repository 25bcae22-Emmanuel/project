const { Client } = require('pg');
const client = new Client({
  connectionString: 'postgresql://portfolio_db_q1uw_user:x4KfEpGsWXCt253gLqKoII17tFuDvjcY@dpg-d6vvl5f5r7bs73f29qg0-a.singapore-postgres.render.com/portfolio_db_q1uw',
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect()
  .then(() => {
    return client.query("SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'messages');");
  })
  .then(res => console.log('Table exists:', res.rows[0].exists))
  .catch(e => console.error('Connection error', e.stack))
  .finally(() => client.end());
