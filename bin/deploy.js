const { spawn } = require('child_process');
const args = process.argv
const target_env = args[args.length-1]

if(!['staging', 'production'].includes(target_env)) {
  console.log('\x1b[31m%s\x1b[0m', 'Target environment is required: staging | production');
  process.exit()
}

if(target_env == 'staging') {
  console.log('\x1b[36m%s\x1b[0m', 'Target environment not yet supported: staging');
  process.exit()
}

const bucket = target_env == 'staging'
                ? 's3://staging.saleorstorefront1'
                : 's3://saleorstorefront1'

// aws s3 sync build/ s3://saleorstorefront1
const deploy = spawn('aws', ['s3', 'sync', 'dist/', bucket])

deploy.stdout.on('data', (data) => {
  console.log(`${data}`);
});

deploy.stderr.on('data', (data) => {
  console.log(`${data}`);
});
