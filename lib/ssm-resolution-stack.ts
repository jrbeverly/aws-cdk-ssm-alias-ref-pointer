import * as cdk from 'aws-cdk-lib';
import * as ssm from 'aws-cdk-lib/aws-ssm';
import { Construct } from 'constructs';

export class SsmResolutionStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const suppliedSsmParameter = new cdk.CfnParameter(this, 'SuppliedSsmParameter', {
      type: 'AWS::SSM::Parameter::Value<String>',
      default: '/ssm-resolution-cases/source/direct',
    });

    new ssm.CfnParameter(this, 'CloudFormationParameterTypeResult', {
      name: '/ssm-resolution-cases/results/cloudformation-parameter-type',
      type: 'String',
      value: suppliedSsmParameter.valueAsString,
    });

    new ssm.CfnParameter(this, 'DynamicReferenceResult', {
      name: '/ssm-resolution-cases/results/dynamic-reference',
      type: 'String',
      value: '{{resolve:ssm:/ssm-resolution-cases/source/direct}}',
    });

    const version = new cdk.CfnParameter(this, 'Version', {
      type: 'String',
      default: 'v1',
    });

    new ssm.CfnParameter(this, 'PredictableNameResult', {
      name: '/ssm-resolution-cases/results/predictable-name',
      type: 'String',
      value: cdk.Fn.join('', [
        '{{resolve:ssm:/ssm-resolution-cases/source/versions/',
        version.valueAsString,
        '}}',
      ]),
    });

    const pointer = new cdk.CfnParameter(this, 'Pointer', {
      type: 'AWS::SSM::Parameter::Value<String>',
      default: '/ssm-resolution-cases/source/current',
    });

    new ssm.CfnParameter(this, 'PointerResult', {
      name: '/ssm-resolution-cases/results/pointer',
      type: 'String',
      value: cdk.Fn.join('', [
        '{{resolve:ssm:',
        pointer.valueAsString,
        '}}',
      ]),
    });
  }
}
