# CDK Info

The `cdk.json` file tells the CDK Toolkit how to execute your app. You can add default app context values under the `context` field in `cdk.json`.

## Useful commands

- `npm run build` compile typescript to js
- `npm run watch` watch for changes and compile
- `npm run test` perform the jest unit tests
- `cdk deploy` deploy this stack to your default AWS account/region
- `cdk diff` compare deployed stack with current state
- `cdk synth` emits the synthesized CloudFormation template

## Deployment

To deploy this project run:

```bash
npm run build
// compile typescript to js
```

```bash
npm run build:layer
// build lambda dependencies layer
```

```bash
cdk deploy
```

## Authors

- [@nikitapryymak](https://www.github.com/nikitapryymak)
