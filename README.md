# CloudFormation SSM resolution cases

> [!WARNING]
> **AI-authored:** This change was autonomously planned and implemented by an AI software factory from a human-authored specification, with possible subsequent human review or modification.

Four CDK examples compare a CloudFormation SSM parameter type with literal,
constructed, and pointer-based SSM dynamic references.

## Usage

```
aws ssm put-parameter --name /ssm-resolution-cases/source/direct --type String --value direct-value --overwrite
aws ssm put-parameter --name /ssm-resolution-cases/source/versions/v1 --type String --value version-value --overwrite
aws ssm put-parameter --name /ssm-resolution-cases/source/current --type String --value /ssm-resolution-cases/source/versions/v1 --overwrite
npm ci
npx cdk synth -o synth
npx cdk deploy
```

The deployed results are written below `/ssm-resolution-cases/results/`.

## Notes

- `SuppliedSsmParameter` accepts an SSM parameter name through the CloudFormation type `AWS::SSM::Parameter::Value<String>`; `Ref` yields its stored value.
- `DynamicReferenceResult` resolves a fixed `{{resolve:ssm:...}}` reference.
- `Version` is a plain `String`; CloudFormation joins it into a predictable SSM parameter name before resolving the dynamic reference.
- `Pointer` first resolves `/ssm-resolution-cases/source/current` through the CloudFormation parameter type, then joins that returned parameter name into the second dynamic reference.
- `{{resolve:ssm:...}}` is CloudFormation dynamic-reference syntax, despite sometimes being described as a macro.
